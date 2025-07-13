import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, BookOpen } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Header() {
  const { state } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-orange-500 hover:text-orange-700 transition-colors">
            <BookOpen className="w-8 h-8" />
            <span>onlineBookShop</span>
          </Link>

          {/* Desktop Navigation */}
          {/* <nav className="hidden md:flex items-center space-x-8">
            <Link to="/books" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Menu
            </Link>
            <Link to="/books" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Pages
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
          </nav> */}

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search books, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border bg-[#F9F9F9] rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2 text-gray-700 hover:text-red-500 transition-colors"
            >
              <Heart className="w-6 h-6" />
              {state.wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-700 hover:text-[#EBA452] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {state.cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.cartCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="px-4 py-2 bg-[#E8E8E8] text-gray-900 rounded-lg hover:bg-orange-500 hover:text-white transition-colors font-medium">
                Login
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-white hover:border hover:border-orange-500 hover:text-orange-500 transition-colors font-medium">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="sm:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <Link 
              to="/books" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={toggleMenu}
            >
              Menu
            </Link>
            <Link 
              to="/books" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={toggleMenu}
            >
              Pages
            </Link>
            <Link 
              to="/about" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <div className="lg:hidden flex flex-col space-y-2 pt-4 border-t border-gray-100">
              <button className="text-left px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Login
              </button>
              <button className="text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}