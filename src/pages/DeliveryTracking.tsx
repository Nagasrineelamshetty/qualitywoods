
import { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { orders } from '../data/mockData';
import { toast } from '../hooks/use-toast';

const DeliveryTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const statusSteps = [
    { key: 'Received', label: 'Order Received', icon: Package, description: 'Your order has been confirmed' },
    { key: 'In Production', label: 'In Production', icon: Clock, description: 'Our craftsmen are working on your furniture' },
    { key: 'Shipped', label: 'Shipped', icon: Truck, description: 'Your order is on the way' },
    { key: 'Delivered', label: 'Delivered', icon: CheckCircle, description: 'Order delivered successfully' }
  ];

  const handleTrackOrder = () => {
    if (!orderId.trim()) {
      toast({
        title: "Order ID Required",
        description: "Please enter your order ID to track your delivery.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const order = orders.find(o => o.id.toLowerCase() === orderId.toLowerCase());
      
      if (order) {
        setTrackingResult(order);
        toast({
          title: "Order Found",
          description: `Tracking information for order ${order.id} loaded successfully.`
        });
      } else {
        setTrackingResult(null);
        toast({
          title: "Order Not Found",
          description: "Please check your order ID and try again.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const getStepStatus = (stepIndex: number, currentIndex: number) => {
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Track Your Order</h1>
          <p className="text-xl text-stone-600">Enter your order ID to see real-time delivery updates</p>
        </div>

        {/* Search Section */}
        <Card className="p-6 mb-8 bg-white">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="orderId" className="block text-sm font-medium text-stone-700 mb-2">
                Order ID
              </label>
              <input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., FC2024001)"
                className="w-full px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
              />
            </div>
            <div className="sm:pt-7">
              <Button
                onClick={handleTrackOrder}
                disabled={isLoading}
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 px-8"
              >
                {isLoading ? (
                  'Searching...'
                ) : (
                  <>
                    <Search size={16} className="mr-2" />
                    Track Order
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <h3 className="font-medium text-amber-900 mb-2">Demo Order IDs:</h3>
            <div className="flex flex-wrap gap-2">
              {orders.map(order => (
                <button
                  key={order.id}
                  onClick={() => setOrderId(order.id)}
                  className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200 transition-colors"
                >
                  {order.id}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-6 bg-white">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-2">Order #{trackingResult.id}</h2>
                  <div className="space-y-1 text-stone-600">
                    <p><span className="font-medium">Customer:</span> {trackingResult.customerName}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date(trackingResult.orderDate).toLocaleDateString()}</p>
                    <p><span className="font-medium">Expected Delivery:</span> {new Date(trackingResult.estimatedDelivery).toLocaleDateString()}</p>
                    <p><span className="font-medium">Total Amount:</span> ₹{trackingResult.total.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    trackingResult.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    trackingResult.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    trackingResult.status === 'In Production' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-stone-100 text-stone-800'
                  }`}>
                    {trackingResult.status}
                  </div>
                </div>
              </div>
            </Card>

            {/* Items Ordered */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Items Ordered</h3>
              <div className="space-y-2">
                {trackingResult.items.map((item: string, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-stone-100 last:border-0">
                    <span className="text-stone-700">{item}</span>
                    <span className="text-sm text-stone-500">Qty: 1</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tracking Timeline */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-amber-900 mb-6">Delivery Progress</h3>
              
              <div className="relative">
                {statusSteps.map((step, index) => {
                  const currentStepIndex = getCurrentStepIndex(trackingResult.status);
                  const stepStatus = getStepStatus(index, currentStepIndex);
                  const StepIcon = step.icon;
                  
                  return (
                    <div key={step.key} className="relative flex items-start mb-8 last:mb-0">
                      {/* Connector Line */}
                      {index < statusSteps.length - 1 && (
                        <div 
                          className={`absolute left-6 top-12 w-0.5 h-16 ${
                            stepStatus === 'completed' ? 'bg-green-500' : 'bg-stone-200'
                          }`}
                        />
                      )}
                      
                      {/* Step Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        stepStatus === 'completed' ? 'bg-green-500 text-white' :
                        stepStatus === 'current' ? 'bg-amber-500 text-white' :
                        'bg-stone-200 text-stone-400'
                      }`}>
                        <StepIcon size={20} />
                      </div>
                      
                      {/* Step Content */}
                      <div className="ml-4 flex-1">
                        <h4 className={`text-lg font-semibold ${
                          stepStatus === 'completed' ? 'text-green-700' :
                          stepStatus === 'current' ? 'text-amber-700' :
                          'text-stone-400'
                        }`}>
                          {step.label}
                        </h4>
                        <p className={`text-sm ${
                          stepStatus === 'completed' ? 'text-green-600' :
                          stepStatus === 'current' ? 'text-amber-600' :
                          'text-stone-400'
                        }`}>
                          {step.description}
                        </p>
                        
                        {stepStatus === 'current' && (
                          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Current Status
                          </div>
                        )}
                        
                        {stepStatus === 'completed' && (
                          <div className="mt-1 text-xs text-green-600">
                            ✓ Completed
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-6 bg-amber-50 border-amber-200">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-amber-800 mb-2">Contact Support</h4>
                  <p className="text-sm text-amber-700 mb-2">📞 +91 98765 43210</p>
                  <p className="text-sm text-amber-700">📧 support@furniturecraft.com</p>
                </div>
                <div>
                  <h4 className="font-medium text-amber-800 mb-2">Delivery Information</h4>
                  <p className="text-sm text-amber-700 mb-1">• Professional installation included</p>
                  <p className="text-sm text-amber-700 mb-1">• Delivery between 9 AM - 6 PM</p>
                  <p className="text-sm text-amber-700">• We'll call 1 hour before delivery</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* FAQ Section */}
        <Card className="mt-8 p-6 bg-white">
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-amber-800 mb-1">How long does delivery take?</h4>
              <p className="text-sm text-stone-600">Standard items: 3-4 weeks. Custom pieces: 4-6 weeks.</p>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Is installation included?</h4>
              <p className="text-sm text-stone-600">Yes, professional installation is included with all orders.</p>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Can I reschedule delivery?</h4>
              <p className="text-sm text-stone-600">Yes, call us at least 24 hours in advance to reschedule.</p>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 mb-1">What if I'm not satisfied?</h4>
              <p className="text-sm text-stone-600">We offer a 30-day satisfaction guarantee with easy returns.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryTracking;
