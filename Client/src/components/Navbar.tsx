import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-amber-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-amber-1000">QUALITY WOODS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-amber-900 hover:text-amber-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-amber-900 hover:text-amber-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
              About Us
            </Link>
            <Link to="/products" className="text-amber-900 hover:text-amber-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
              Products
            </Link>
            <Link to="/track" className="text-amber-900 hover:text-amber-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
              Track Order
            </Link>
            <Link to="/cart" className="relative text-amber-900 hover:text-amber-900 p-2 rounded-md transition-colors">
              <ShoppingCart size={22} />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-amber-900 text-base">Hi, {user.name}</span>
                {user.isAdmin && (
                  <Link to="/admin" className="text-amber-700 hover:text-amber-900 px-3 py-2 rounded-md text-base font-medium transition-colors">
                    Admin
                  </Link>
                )}
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="sm"
                  className="text-amber-700 hover:text-amber-900 text-base"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-900 text-base">
                    <User size={18} className="mr-1" />
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white text-base">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-700 hover:text-amber-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-amber-50 border-t border-amber-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
              Home
            </Link>
            <Link to="/about" className="block px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
              About Us
            </Link>
            <Link to="/products" className="block px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
              Products
            </Link>
            <Link to="/track" className="block px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
              Track Order
            </Link>
            <Link to="/cart" className="flex items-center px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
              <ShoppingCart size={16} className="mr-2" />
              Cart ({state.items.length})
            </Link>

            {user ? (
              <div className="border-t border-amber-200 pt-2 mt-2">
                <div className="px-3 py-2 text-amber-700 text-base">Hi, {user.name}</div>
                {user.isAdmin && (
                  <Link to="/admin" className="block px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-amber-200 pt-2 mt-2 space-y-1">
                <Link to="/login" className="block px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
                  Login
                </Link>
                <Link to="/signup" className="block px-3 py-2 text-base text-amber-700 hover:text-amber-900 hover:bg-amber-100 rounded-md">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
