import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
  Home,
} from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left Section - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold text-blue-600">
                LuxeDecor
              </span>
            </Link>
          </div>

          {/* Middle Section - Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/collections"
              className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition duration-300"
            >
              Collections
            </Link>
            <Link
              to="/why-us"
              className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition duration-300"
            >
              Why Us
            </Link>
            {isAuthenticated && (
              <Link
                to="/shop"
                className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition duration-300"
              >
                Shop
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/design"
                className="text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition duration-300"
              >
                Design
              </Link>
            )}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-blue-600 transition duration-300 relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/profile?tab=wishlist"
                  className="text-gray-600 hover:text-blue-600 transition duration-300 relative"
                >
                  <Heart className="h-6 w-6" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition duration-300"
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                    <span className="hidden md:inline font-medium">
                      {user?.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600 transition duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Link>
          <Link
            to="/collections"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            Collections
          </Link>
          <Link
            to="/why-us"
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            Why Us
          </Link>
          {isAuthenticated && (
            <Link
              to="/shop"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Shop
            </Link>
          )}
          {isAuthenticated && (
            <Link
              to="/design"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Design
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
