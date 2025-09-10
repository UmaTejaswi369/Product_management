import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Package } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement global search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">Product Manager</h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name..."
                className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent focus:bg-white transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md"
              />
            </form>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/'
                  ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm hover:shadow-md'
              }`}
            >
              Products
            </Link>
            <Link
              to="/add-product"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/add-product' || location.pathname.includes('/edit-product')
                  ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 shadow-sm hover:shadow-md'
              }`}
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;