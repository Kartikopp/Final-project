import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight, Award, Clock, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmYTJjIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzQ3NTU2OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

function ProductDetailPage({ onCartClick }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      const availableQuantity = selectedVariant.inventory_quantity;
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast({
          title: "Added to Cart! 🛒",
          description: `${quantity} x ${product.title} has been added.`,
        });
        // Optionally open cart here
        onCartClick();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Couldn't add to cart",
          description: error.message,
        });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast, onCartClick]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    }
  }, [product?.images?.length]);

  const handleNextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  }, [product?.images?.length]);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);
    if (variant.image_url && product?.images?.length > 0) {
      const imageIndex = product.images.findIndex(image => image.url === variant.image_url);
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [product?.images]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);

        try {
          const quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [fetchedProduct.id]
          });

          const variantQuantityMap = new Map();
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });

          const productWithQuantities = {
            ...fetchedProduct,
            variants: fetchedProduct.variants.map(variant => ({
              ...variant,
              inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
            }))
          };

          setProduct(productWithQuantities);

          if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
            setSelectedVariant(productWithQuantities.variants[0]);
          }
        } catch (quantityError) {
          throw quantityError;
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onCartClick={onCartClick} />
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header onCartClick={onCartClick} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button onClick={() => navigate('/')} variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <div className="text-center text-red-500 p-8 bg-red-50 rounded-2xl">
            <XCircle className="mx-auto h-16 w-16 mb-4" />
            <p className="mb-6">Error loading course: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  const price = selectedVariant?.sale_price_formatted ?? selectedVariant?.price_formatted;
  const originalPrice = selectedVariant?.price_formatted;
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;

  const currentImage = product.images[currentImageIndex];
  const hasMultipleImages = product.images.length > 1;

  return (
    <>
      <Helmet>
        <title>{product.title} | Exam Success Academy</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.title} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <Header onCartClick={onCartClick} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white aspect-[4/3]">
                <img
                  src={!currentImage?.url ? placeholderImage : currentImage.url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                {hasMultipleImages && (
                  <>
                    <button onClick={handlePrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full transition-all shadow-lg" aria-label="Previous image">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full transition-all shadow-lg" aria-label="Next image">
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {product.ribbon_text && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-slate-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                    {product.ribbon_text}
                  </div>
                )}
              </div>

              {hasMultipleImages && (
                <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={!image.url ? placeholderImage : image.url}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.title}</h1>
              <p className="text-lg text-slate-600 mb-6">{product.subtitle}</p>

              <div className="flex items-center gap-6 mb-8 border-y border-slate-200 py-6">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Flexible Timing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>Popular Choice</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span>Certified</span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-600 mb-8" dangerouslySetInnerHTML={{ __html: product.description }} />

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-bold text-blue-600">{price}</span>
                    {selectedVariant?.sale_price_in_cents && (
                        <span className="text-xl text-slate-400 line-through">{originalPrice}</span>
                    )}
                </div>

                {product.variants.length > 1 && (
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">Select Option</h3>
                    <div className="flex flex-wrap gap-3">
                    {product.variants.map(variant => (
                        <button
                        key={variant.id}
                        onClick={() => handleVariantSelect(variant)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                            selectedVariant?.id === variant.id 
                            ? 'border-blue-600 bg-blue-50 text-blue-700' 
                            : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        >
                        {variant.title}
                        </button>
                    ))}
                    </div>
                </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center border-2 border-slate-200 rounded-lg">
                        <button onClick={() => handleQuantityChange(-1)} className="p-3 hover:bg-slate-50 text-slate-600 rounded-l-lg transition-colors">
                            <Minus size={20} />
                        </button>
                        <span className="w-12 text-center font-bold text-lg text-slate-900">{quantity}</span>
                        <button onClick={() => handleQuantityChange(1)} className="p-3 hover:bg-slate-50 text-slate-600 rounded-r-lg transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex-1">
                        {isStockManaged && canAddToCart && product.purchasable && (
                            <p className="text-sm text-green-600 font-medium flex items-center gap-1 mb-1">
                            <CheckCircle size={14} /> In Stock ({availableStock} available)
                            </p>
                        )}
                         {isStockManaged && !canAddToCart && product.purchasable && (
                             <p className="text-sm text-red-600 font-medium flex items-center gap-1 mb-1">
                             <XCircle size={14} /> Out of Stock
                             </p>
                        )}
                    </div>
                </div>

                <Button 
                    onClick={handleAddToCart} 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-6 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    disabled={!canAddToCart || !product.purchasable}
                >
                    <ShoppingCart className="mr-2 h-6 w-6" /> 
                    {product.purchasable ? 'Add to Cart' : 'Unavailable'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ProductDetailPage;