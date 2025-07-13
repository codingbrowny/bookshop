import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Book } from '../contexts/AppContext';
import { useApp } from '../contexts/AppContext';

interface BookCardProps {
  book: Book;
  showAddToCart?: boolean;
  showAddToWishlist?: boolean;
  className?: string;
  viewMode?: 'grid' | 'list';
}

export default function BookCard({
  book,
  showAddToCart = true,
  showAddToWishlist = true,
  className = '',
  viewMode = 'grid'
}: BookCardProps) {
  const { state, dispatch } = useApp();

  const isInWishlist = state.wishlist.some(item => item.id === book.id);
  const isInCart = state.cart.some(item => item.book.id === book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: book });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: book.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: book });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex gap-4 p-4 ${className}`}
      >
        <Link to={`/books/${book.id}`} className="flex-shrink-0">
          <img
            src={book.image}
            alt={book.title}
            className="w-28 h-40 object-cover rounded-lg"
          />
        </Link>

        <div className="flex flex-col justify-between flex-1">
          <Link to={`/books/${book.id}`}>
            <div>
              <p className="text-xs text-orange-600 font-medium">{book.genre}</p>
              <h3 className="text-lg font-bold text-gray-900 hover:text-orange-500">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {book.description || 'No description provided.'}
              </p>

              <div className="flex items-center mt-2 gap-2">
                <div className="flex">{renderStars(book.rating)}</div>
                <span className="text-sm text-gray-500">({book.reviews})</span>
              </div>
            </div>
          </Link>

          <div className="mt-4 flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">${book.price}</span>
              {book.originalPrice && (
                <>
                  <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {showAddToCart && (
                <button
                  onClick={handleAddToCart}
                  disabled={book.availability === 'out-of-stock'}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm rounded-lg font-semibold transition-colors ${
                    book.availability === 'out-of-stock'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : isInCart
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {book.availability === 'out-of-stock'
                      ? 'Out of Stock'
                      : isInCart
                      ? 'In Cart'
                      : 'Add to Cart'}
                  </span>
                </button>
              )}

              {showAddToWishlist && (
                <button
                  onClick={handleToggleWishlist}
                  className={`p-2 rounded-lg transition-colors ${
                    isInWishlist
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group ${className}`}
    >
      <Link to={`/books/${book.id}`} className="block">
        <div className="aspect-[5/3] overflow-hidden rounded-t-lg">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-[#EBA452] transition-colors line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{book.author}</p>
            <p className="text-xs text-orange-700 font-medium mt-1">{book.genre}</p>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex items-center space-x-1">{renderStars(book.rating)}</div>
            <span className="text-sm text-gray-500 ml-2">({book.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">${book.price}</span>
              {book.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
              )}
            </div>
            {book.originalPrice && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>

      {(showAddToCart || showAddToWishlist) && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-2">
            {showAddToCart && (
              <button
                onClick={handleAddToCart}
                disabled={book.availability === 'out-of-stock'}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg font-medium transition-colors ${
                  book.availability === 'out-of-stock'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isInCart
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-orange-500 text-white hover:bg-[#eba4528e] hover:border hover:border-orange-500 hover:text-orange-700 transition-colors'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {book.availability === 'out-of-stock'
                    ? 'Out of Stock'
                    : isInCart
                    ? 'In Cart'
                    : 'Add to Cart'}
                </span>
              </button>
            )}

            {showAddToWishlist && (
              <button
                onClick={handleToggleWishlist}
                className={`p-2 rounded-lg transition-colors ${
                  isInWishlist
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
