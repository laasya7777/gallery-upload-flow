
import React from 'react';
import { Home, LogIn, UserPlus, Upload, User, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  cartItems: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, isLoggedIn, onLogout, cartItems }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => onViewChange('home')}>
              ArtVault
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => onViewChange('home')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>

              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => onViewChange('login')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'login'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </button>
                  <button
                    onClick={() => onViewChange('register')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'register'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onViewChange('upload')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'upload'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Art
                  </button>
                  <button
                    onClick={() => onViewChange('profile')}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentView === 'profile'
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </button>
                  <button
                    onClick={() => onViewChange('cart')}
                    className="relative flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart
                    {cartItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
