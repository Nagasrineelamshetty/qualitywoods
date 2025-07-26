import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import axios from '../api/axios';

const statusSteps = [
  { key: 'Received', label: 'Order Received', icon: Package, description: 'Your order has been confirmed' },
  { key: 'In Production', label: 'In Production', icon: Clock, description: 'Our craftsmen are working on your furniture' },
  { key: 'Shipped', label: 'Shipped', icon: Truck, description: 'Your order is on the way' },
  { key: 'Delivered', label: 'Delivered', icon: CheckCircle, description: 'Order delivered successfully' },
];

const DeliveryTracking = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user._id) {
          toast({ title: 'Login required', description: 'Please login to view your orders.', variant: 'destructive' });
          return;
        }

        const res = await axios.get(`/orders/user/${user._id}`);
        setOrders(res.data);
      } catch (error) {
        toast({ title: 'Failed to fetch orders', variant: 'destructive' });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Your Orders</h1>

        {loading ? (
          <p className="text-center text-stone-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-stone-500">You have no orders yet.</p>
        ) : (
          orders.map((order, index) => {
            const currentStepIndex = getCurrentStepIndex(order.status);

            return (
              <Card key={index} className="mb-8 p-6 bg-white shadow">
                <div className="mb-4">
                  <h2 className="text-2xl font-semibold text-amber-900">Order #{order.razorpayOrderId}</h2>
                  <p className="text-stone-600">Total: ₹{order.total.toLocaleString()} • Placed on: {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>

                {/* Items Ordered */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-stone-700 mb-2">Items:</h3>
                  <ul className="list-disc list-inside text-stone-600">
                    {order.items.map((item: any, idx: number) => (
                      <li key={idx}>
                        {item.name} (Qty: {item.quantity}) – {item.customizations?.wood}, {item.customizations?.finish}, {item.customizations?.dimensions}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status Tracker */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-amber-900 mb-4">Delivery Status</h3>
                  <div className="relative">
                    {statusSteps.map((step, stepIndex) => {
                      const stepStatus = getStepStatus(stepIndex, currentStepIndex);
                      const StepIcon = step.icon;

                      return (
                        <div key={step.key} className="relative flex items-start mb-8 last:mb-0">
                          {/* Connector line */}
                          {stepIndex < statusSteps.length - 1 && (
                            <div className={`absolute left-6 top-12 w-0.5 h-16 ${stepStatus === 'completed' ? 'bg-green-500' : 'bg-stone-200'}`} />
                          )}

                          {/* Step Icon */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
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
                            }`}>{step.label}</h4>
                            <p className={`text-sm ${
                              stepStatus === 'completed' ? 'text-green-600' :
                              stepStatus === 'current' ? 'text-amber-600' :
                              'text-stone-400'
                            }`}>{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DeliveryTracking;
