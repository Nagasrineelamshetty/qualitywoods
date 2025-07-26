import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '../hooks/use-toast';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { products } from '../data/mockData';
import axios from '../api/axios';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [wood, setWood] = useState('Teak');
  const [finish, setFinish] = useState('Matte');
  const [dimensions, setDimensions] = useState('6x3');
  const [isPaying, setIsPaying] = useState(false);

  if (!product) return <div>Product not found</div>;

  const handleBuyNow = async () => {
    try {
      setIsPaying(true);

      // 1. Create Razorpay Order from backend
      const orderResponse = await axios.post('/orders/create-order', {
        amount: product.price * 100,
      });

      const orderData = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Quality Woods',
        description: product.name,
        // image: '/logo192.png',
        order_id: orderData.id,
        handler: async function (response: any) {
          toast({ title: 'Payment successful!' });

          await saveOrderToBackend({
            razorpayOrderId: orderData.id,
            paymentId: response.razorpay_payment_id
          });

          navigate('/track');
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: { color: '#D97706' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Payment Error:', err);
      toast({ title: 'Payment failed', variant: 'destructive' });
    } finally {
      setIsPaying(false);
    }
  };

  const saveOrderToBackend = async ({
    razorpayOrderId,
    paymentId
  }: {
    razorpayOrderId: string;
    paymentId: string;
  }) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

      await axios.post('/orders', {
        user: currentUser._id || currentUser.id,
        email: currentUser.email, // ✅ Add this line
        razorpayOrderId,
        items: [
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            customizations: { wood, finish, dimensions }
          }
        ],
        total: product.price,
        status: 'Received',
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    } catch (err) {
      console.error('Failed to save order:', err);
      toast({ title: 'Order saving failed', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-amber-900">{product.name}</h1>
          <p className="text-stone-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-800 mb-6">₹{product.price.toLocaleString()}</p>

          {/* Customization Options */}
          <div className="mb-4">
            <label className="block mb-1">Wood Type</label>
            <select value={wood} onChange={(e) => setWood(e.target.value)} className="w-full px-4 py-2 border rounded">
              <option value="Teak">Teak</option>
              <option value="Sheesham">Sheesham</option>
              <option value="Oak">Oak</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Finish</label>
            <select value={finish} onChange={(e) => setFinish(e.target.value)} className="w-full px-4 py-2 border rounded">
              <option value="Matte">Matte</option>
              <option value="Glossy">Glossy</option>
              <option value="Natural">Natural</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-1">Dimensions</label>
            <select value={dimensions} onChange={(e) => setDimensions(e.target.value)} className="w-full px-4 py-2 border rounded">
              <option value="6x3">6x3</option>
              <option value="5x2.5">5x2.5</option>
              <option value="4x2">4x2</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                  customizations: { wood, finish, dimensions }
                });
                toast({ title: 'Added to cart!' });
              }}
              className="bg-stone-700 hover:bg-stone-800"
            >
              Add to Cart
            </Button>

            <Button
              onClick={handleBuyNow}
              disabled={isPaying}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {isPaying ? 'Processing...' : 'Buy Now'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
