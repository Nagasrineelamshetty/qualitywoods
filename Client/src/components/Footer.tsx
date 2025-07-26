
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Quality Woods</h3>
            <p className="text-amber-100 mb-4">
              Crafting comfort and delivering elegance since 1995. We're a family-run business 
              dedicated to creating custom furniture that transforms your house into a home.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-amber-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-amber-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-amber-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-amber-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="text-amber-200 hover:text-white transition-colors">Products</a></li>
              <li><a href="/tracking" className="text-amber-200 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="/cart" className="text-amber-200 hover:text-white transition-colors">Cart</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-amber-100">+91 9182658199, +91 9963699249</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-amber-200" />
                <span className="text-amber-100">info@qualitywoods.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-amber-200" />
                <span className="text-amber-100">
                  123 Craft Street, Woodwork City,<br />
                  Hyderabad 500036, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-amber-200">
            © 2024 QualityWoods. All rights reserved. | Crafted with ❤️ for your home.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
