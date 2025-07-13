import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Wishlist() {
  const { state, dispatch } = useApp();

  const removeFromWishlist = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const moveToCart = (id: string) => {
    dispatch({ type: 'MOVE_TO_CART', payload: id });
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">
            Start browsing and add your favorite books to your wishlist.
          </p>
          <Link
            to="/books"
            className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            <span>Browse Books</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Wishlist ({state.wishlistCount})
          </h1>
          <Link
            to="/books"
            className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.wishlist.map((book) => {
            const isInCart = state.cart.some(item => item.book.id === book.id);
            
            return (
              <div key={book.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <Link to={`/books/${book.id}`} className="block">
                  <div className="aspect-[5/3] overflow-hidden rounded-t-lg">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link
                    to={`/books/${book.id}`}
                    className="block hover:text-orange-600 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                    <p className="text-xs text-orange-600 font-medium mb-3">{book.genre}</p>
                  </Link>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ${book.price}
                      </span>
                      {book.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${book.originalPrice}
                        </span>
                      )}
                    </div>
                    {book.originalPrice && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                        {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => moveToCart(book.id)}
                      disabled={book.availability === 'out-of-stock'}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg font-medium transition-colors ${
                        book.availability === 'out-of-stock'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isInCart
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-orange-600 text-white hover:bg-orange-700'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="text-sm">
                        {book.availability === 'out-of-stock' 
                          ? 'Out of Stock' 
                          : isInCart 
                          ? 'In Cart' 
                          : 'Add to Cart'
                        }
                      </span>
                    </button>

                    <button
                      onClick={() => removeFromWishlist(book.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to purchase?
              </h2>
              <p className="text-gray-600">
                Move all items to your cart or continue browsing for more books.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  state.wishlist.forEach(book => {
                    if (book.availability !== 'out-of-stock') {
                      dispatch({ type: 'MOVE_TO_CART', payload: book.id });
                    }
                  });
                }}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                Move All to Cart
              </button>
              
              <Link
                to="/books"
                className="border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}