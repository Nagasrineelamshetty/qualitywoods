
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { products } from '../data/mockData';

const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Our Products</h1>
          <p className="text-xl text-stone-600">Discover our complete range of handcrafted furniture</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-64"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mb-4">
          <p className="text-stone-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group bg-white">
                <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm text-amber-600 font-medium">{product.category}</span>
                    {product.inStock && (
                      <span className="text-sm text-green-600 font-medium">In Stock</span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{product.name}</h3>
                  <p className="text-stone-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                    <Link to={`/products/${product.id}`}>
                      <Button className="bg-amber-600 hover:bg-amber-700" disabled={!product.inStock}>
                        {product.inStock ? 'Buy Now' : 'Notify Me'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-amber-600 font-medium">{product.category}</span>
                        <div className="flex gap-2">
                          {product.inStock ? (
                            <span className="text-sm text-green-600 font-medium">In Stock</span>
                          ) : (
                            <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold text-amber-900 mb-2">{product.name}</h3>
                      <p className="text-stone-600 mb-4">{product.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 text-sm">
                        <div><strong>Material:</strong> {product.specifications.material}</div>
                        <div><strong>Dimensions:</strong> {product.specifications.dimensions}</div>
                        <div><strong>Warranty:</strong> {product.specifications.warranty}</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-amber-600">₹{product.price.toLocaleString()}</span>
                      <Link to={`/products/${product.id}`}>
                        <Button size="lg" className="bg-amber-600 hover:bg-amber-700" disabled={!product.inStock}>
                          {product.inStock ? 'Customize & Order' : 'Notify When Available'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-stone-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-stone-600 mb-2">No products found</h3>
            <p className="text-stone-500">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
