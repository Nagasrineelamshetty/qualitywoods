
import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Heart, ShoppingCart, Share2, ArrowLeft, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { products } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWood, setSelectedWood] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const handleAddToCart = () => {
    if (!selectedWood || !selectedFinish || !selectedDimension) {
      toast({
        title: "Customization Required",
        description: "Please select wood type, finish, and dimensions before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    const cartItem = {
      id: `${product.id}-${selectedWood}-${selectedFinish}-${selectedDimension}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      customizations: {
        wood: selectedWood,
        finish: selectedFinish,
        dimensions: selectedDimension
      }
    };

    addItem(cartItem);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart with custom specifications.`
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted 
        ? `${product.name} removed from your wishlist.`
        : `${product.name} added to your wishlist.`
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard!"
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="p-0 mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-amber-500 ring-2 ring-amber-200' 
                        : 'border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-amber-600 font-medium">{product.category}</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleWishlist}>
                    <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400'} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 size={18} className="text-stone-400" />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-amber-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-stone-600 ml-2">(4.8/5 from 127 reviews)</span>
                </div>
              </div>

              <p className="text-stone-700 leading-relaxed mb-6">{product.description}</p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    In Stock - Ready to Customize
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Currently Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Specifications */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-stone-700">Material:</span>
                  <span className="ml-2 text-stone-600">{product.specifications.material}</span>
                </div>
                <div>
                  <span className="font-medium text-stone-700">Dimensions:</span>
                  <span className="ml-2 text-stone-600">{product.specifications.dimensions}</span>
                </div>
                <div>
                  <span className="font-medium text-stone-700">Warranty:</span>
                  <span className="ml-2 text-stone-600">{product.specifications.warranty}</span>
                </div>
              </div>
            </Card>

            {/* Customization Options */}
            {product.inStock && (
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Customize Your {product.name}</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Wood Type</label>
                    <Select value={selectedWood} onValueChange={setSelectedWood}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select wood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.customizations.wood.map(wood => (
                          <SelectItem key={wood} value={wood}>{wood}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Finish</label>
                    <Select value={selectedFinish} onValueChange={setSelectedFinish}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select finish" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.customizations.finish.map(finish => (
                          <SelectItem key={finish} value={finish}>{finish}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Dimensions</label>
                    <Select value={selectedDimension} onValueChange={setSelectedDimension}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select dimensions" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.customizations.dimensions.map(dimension => (
                          <SelectItem key={dimension} value={dimension}>{dimension}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Quantity</label>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3"
                    size="lg"
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                  >
                    Buy Now
                  </Button>
                </div>
              </Card>
            )}

            {/* Delivery Information */}
            <Card className="p-6 bg-amber-50 border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Delivery & Installation</h3>
              <ul className="space-y-2 text-stone-700">
                <li>• Free delivery within 50km radius</li>
                <li>• Professional installation included</li>
                <li>• Estimated delivery: 3-4 weeks for standard items</li>
                <li>• Custom pieces may take 4-6 weeks</li>
                <li>• Assembly and setup at your location</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-amber-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow group bg-white">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-amber-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-amber-600 font-bold">₹{relatedProduct.price.toLocaleString()}</p>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
