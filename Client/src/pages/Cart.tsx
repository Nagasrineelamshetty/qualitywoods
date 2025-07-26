import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/use-toast';

const Cart = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  
  const { user } = useAuth();
  const isAuthenticated = !!user;
  
  const [collaborativeSession, setCollaborativeSession] = useState<string | null>(null);

  // Recover session on reload
  useEffect(() => {
    const savedSession = localStorage.getItem("collaborativeSession");
    if (savedSession) setCollaborativeSession(savedSession);
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`
    });
  };

  const startCollaborativeSession = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to start collaborative shopping."
      });
      return;
    }

    const sessionId = `cart-${Date.now()}`;
    setCollaborativeSession(sessionId);
    localStorage.setItem("collaborativeSession", sessionId);

    const shareLink = `${window.location.origin}/collaborative-cart/${sessionId}`;

    if (navigator.share) {
      navigator.share({
        title: 'Let\'s shop together!',
        text: 'Join my furniture shopping cart to vote and comment on items',
        url: shareLink
      });
    } else {
      navigator.clipboard.writeText(shareLink);
      toast({
        title: "Collaborative Shopping Started!",
        description: "Share link copied to clipboard. Send it to family members to shop together!"
      });
    }
  };

  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const shipping = subtotal > 50000 ? 0 : 2000;
  const total = subtotal + tax + shipping;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-stone-300 mb-6" />
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Your cart is empty</h2>
            <p className="text-stone-500 mb-8">Discover our beautiful furniture collection and add items to your cart.</p>
            <Link to="/products">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-amber-900">Shopping Cart</h1>
          <div className="flex space-x-4">
            <Button
              onClick={startCollaborativeSession}
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
            >
              <Users size={16} className="mr-2" />
              Shop Together
            </Button>
            <Button
              onClick={clearCart}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id} className="p-6 bg-white">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={`${item.name} - ${item.id}`}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-amber-900">{item.name}</h3>
                      <div className="text-sm text-stone-600 mt-2 space-y-1">
                        {item.customizations.wood && (
                          <p><span className="font-medium">Wood:</span> {item.customizations.wood}</p>
                        )}
                        {item.customizations.finish && (
                          <p><span className="font-medium">Finish:</span> {item.customizations.finish}</p>
                        )}
                        {item.customizations.dimensions && (
                          <p><span className="font-medium">Size:</span> {item.customizations.dimensions}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="text-lg font-medium w-12 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end space-x-4">
                        <span className="text-xl font-bold text-amber-600">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white sticky top-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal ({state.items.length} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-600">GST (18%)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `₹${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>

                {shipping === 0 && (
                  <p className="text-sm text-green-600">✓ Free shipping on orders above ₹50,000</p>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-amber-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {isAuthenticated ? (
                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      Proceed to Checkout
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login" className="block">
                    <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      Login to Checkout
                    </Button>
                  </Link>
                )}

                <Link to="/products">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-stone-200">
                <div className="text-center space-y-2 text-sm text-stone-600">
                  <p>✓ Secure checkout with SSL encryption</p>
                  <p>✓ Free installation & setup</p>
                  <p>✓ 30-day return policy</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {collaborativeSession && (
          <Card className="mt-8 p-6 bg-amber-50 border-amber-200">
            <div className="text-center">
              <Users className="mx-auto mb-4 text-amber-600" size={32} />
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Collaborative Shopping Active!</h3>
              <p className="text-amber-700 mb-4">
                Session ID: <code className="bg-amber-100 px-2 py-1 rounded">{collaborativeSession}</code>
              </p>
              <p className="text-sm text-amber-600">
                Share the link with family members so they can vote and comment on your furniture choices!
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cart;
