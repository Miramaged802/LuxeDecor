import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-800 py-12 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Furniture Haven</h3>
            <p className="text-gray-600 text-sm">Crafting quality furniture since 2020. Elevate your home with timeless designs.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/collections" className="hover:text-blue-600 transition">Collections</Link></li>
              <li><Link to="#featured" className="hover:text-blue-600 transition">Featured Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="#" className="hover:text-blue-600 transition">FAQ</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition">Shipping & Returns</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-600 hover:text-blue-600 transition">Facebook</Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 transition">Instagram</Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600 transition">Pinterest</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Furniture Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
