
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Package, TrendingUp, Users, Calendar, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { orders, products } from '../data/mockData';
import { toast } from '../hooks/use-toast';

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orderList, setOrderList] = useState(orders);
  const [productList, setProductList] = useState(products);

  if (!user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const stats = {
    totalOrders: orderList.length,
    totalRevenue: orderList.reduce((sum, order) => sum + order.total, 0),
    totalProducts: productList.length,
    pendingOrders: orderList.filter(order => order.status !== 'Delivered').length
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrderList(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({
      title: "Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProductList(prev => prev.filter(product => product.id !== productId));
    toast({
      title: "Product Deleted",
      description: "Product has been removed from the catalog"
    });
  };

  const toggleProductStock = (productId: string) => {
    setProductList(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, inStock: !product.inStock }
          : product
      )
    );
    const product = productList.find(p => p.id === productId);
    toast({
      title: "Stock Updated",
      description: `${product?.name} is now ${product?.inStock ? 'out of stock' : 'in stock'}`
    });
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-stone-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900">Admin Dashboard</h1>
          <p className="text-stone-600 mt-1">Welcome back, {user.name}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'orders', label: 'Orders' },
            { id: 'products', label: 'Products' },
            { id: 'analytics', label: 'Analytics' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={Package}
                color="text-blue-600"
              />
              <StatCard
                title="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString()}`}
                icon={TrendingUp}
                color="text-green-600"
              />
              <StatCard
                title="Total Products"
                value={stats.totalProducts}
                icon={Package}
                color="text-purple-600"
              />
              <StatCard
                title="Pending Orders"
                value={stats.pendingOrders}
                icon={Calendar}
                color="text-orange-600"
              />
            </div>

            {/* Recent Orders */}
            <Card className="p-6 bg-white">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">Recent Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-b border-stone-100">
                        <td className="py-3 px-4 font-medium text-amber-600">{order.id}</td>
                        <td className="py-3 px-4 text-stone-700">{order.customerName}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'In Production' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-stone-100 text-stone-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-stone-900">₹{order.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-amber-900">Order Management</h2>
            </div>

            <Card className="p-6 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Items</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-stone-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderList.map(order => (
                      <tr key={order.id} className="border-b border-stone-100">
                        <td className="py-3 px-4 font-medium text-amber-600">{order.id}</td>
                        <td className="py-3 px-4 text-stone-700">{order.customerName}</td>
                        <td className="py-3 px-4 text-stone-600">
                          {order.items.join(', ')}
                        </td>
                        <td className="py-3 px-4">
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value)}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Received">Received</SelectItem>
                              <SelectItem value="In Production">In Production</SelectItem>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Delivered">Delivered</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 font-medium text-stone-900">₹{order.total.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <Edit size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-amber-900">Product Management</h2>
              <Button className="bg-amber-600 hover:bg-amber-700">
                <Plus size={16} className="mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map(product => (
                <Card key={product.id} className="overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-amber-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <p className="text-stone-600 text-sm mb-2">{product.category}</p>
                    <p className="text-amber-600 font-bold mb-4">₹{product.price.toLocaleString()}</p>
                    
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleProductStock(product.id)}
                        className="flex-1"
                      >
                        {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-amber-900">Analytics Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Order Status Distribution</h3>
                <div className="space-y-3">
                  {['Received', 'In Production', 'Shipped', 'Delivered'].map(status => {
                    const count = orderList.filter(order => order.status === status).length;
                    const percentage = (count / orderList.length) * 100;
                    
                    return (
                      <div key={status}>
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-700">{status}</span>
                          <span className="font-medium">{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-stone-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-amber-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Product Categories</h3>
                <div className="space-y-3">
                  {Array.from(new Set(productList.map(p => p.category))).map(category => {
                    const count = productList.filter(product => product.category === category).length;
                    const percentage = (count / productList.length) * 100;
                    
                    return (
                      <div key={category}>
                        <div className="flex justify-between text-sm">
                          <span className="text-stone-700">{category}</span>
                          <span className="font-medium">{count} products ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-stone-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-amber-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Revenue Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">₹{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-stone-600">Total Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">₹{Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString()}</p>
                  <p className="text-stone-600">Average Order Value</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{stats.totalOrders}</p>
                  <p className="text-stone-600">Total Orders</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
