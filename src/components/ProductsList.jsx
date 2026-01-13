import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2, Eye } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmYTJjIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzQ3NTU2OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayVariant = useMemo(() => product.variants[0], [product]);
  const hasSale = useMemo(() => displayVariant && displayVariant.sale_price_in_cents !== null, [displayVariant]);
  const displayPrice = useMemo(() => hasSale ? displayVariant.sale_price_formatted : displayVariant.price_formatted, [displayVariant, hasSale]);
  const originalPrice = useMemo(() => hasSale ? displayVariant.price_formatted : null, [displayVariant, hasSale]);

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.variants.length > 1) {
      navigate(`/product/${product.id}`);
      return;
    }

    const defaultVariant = product.variants[0];

    try {
      await addToCart(product, defaultVariant, 1, defaultVariant.inventory_quantity);
      toast({
        title: "Added to Cart",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error adding to cart",
        description: error.message,
      });
    }
  }, [product, addToCart, toast, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden bg-slate-100">
        <img
          src={product.image || placeholderImage}
          alt={product.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.ribbon_text && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full font-bold text-xs shadow-md">
            {product.ribbon_text}
          </div>
        )}
        {hasSale && (
           <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">
             Sale
           </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.title}
        </h3>
        
        <p className="text-slate-600 mb-4 line-clamp-2 text-sm h-10">
          {product.subtitle || product.description.replace(/<[^>]*>?/gm, '')}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              {displayPrice}
            </span>
            {originalPrice && (
              <span className="text-sm line-through text-slate-400 ml-2">
                {originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            onClick={(e) => {
                e.stopPropagation();
                navigate(`/product/${product.id}`);
            }}
            variant="outline"
            className="hover:bg-slate-100"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts();

        if (productsResponse.products.length === 0) {
          setProducts([]);
          return;
        }

        const productIds = productsResponse.products.map(product => product.id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach(variant => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productsWithQuantities = productsResponse.products.map(product => ({
          ...product,
          variants: product.variants.map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        }));

        setProducts(productsWithQuantities);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8 bg-red-50 rounded-xl">
        <p>Error loading products: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-slate-500 p-8">
        <p>No courses available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductsList;