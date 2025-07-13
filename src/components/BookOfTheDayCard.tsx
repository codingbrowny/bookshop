import React from 'react';
import { Book, useApp } from '../contexts/AppContext';
import { ShoppingCart } from 'lucide-react';

interface BookOfTheDayCardProps {
  book: Book;
  showAddToCart?: boolean;
  showAddToWishlist?: boolean;
    className?: string;
}

export default function BookOfTheDayCard({
    book,
    showAddToCart = true,
    className = ''
    }: BookOfTheDayCardProps
) {
      const { state, dispatch } = useApp();
    
      const isInCart = state.cart.some(item => item.book.id === book.id);
    
      const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'ADD_TO_CART', payload: book });
      };
  return (
    <div className={`relative bg-[#131045] rounded-lg p-8 flex flex-col md:flex-row items-center overflow-hidden ${className}`}>
      {/* Background image for the large card */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${book.image})` }}
      ></div>

      <div className="relative z-10 flex flex-col md:w-2/3 text-white">
        <h3 className="text-3xl font-bold mb-2">{book.title}</h3>
        <p className="text-gray-300 text-sm mb-4">By {book.author}</p>
        <p className="text-gray-300 text-sm mb-6 max-w-md">
          {book.description}
        </p>
        <div className="flex items-baseline mb-6">
          <span className="text-3xl font-bold text-white mr-2">${book.price}</span>
          {book.originalPrice && (
            <span className="text-lg text-gray-500 line-through">${book.originalPrice}</span>
          )}
        </div>
            {showAddToCart && (
              <button
                onClick={handleAddToCart}
                disabled={book.availability === 'out-of-stock'}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg font-medium transition-colors ${
                  book.availability === 'out-of-stock'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isInCart
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-orange-500 text-white hover:bg-[#eba4528e] hover:border hover:border-orange-500 hover:text-white transition-colors'
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
            )}
      </div>

      {/* Image on the right side of the large card */}
      <div className="relative z-10 md:w-1/3 mt-6 md:mt-0 flex justify-center items-center">
        <img
          src={book.image} // Assuming a separate prop for this specific image
          alt={book.title}
          className="max-h-64 object-contain rounded-lg"
        />
        {/* Overlay text on the image */}
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded">
          {book.title.toUpperCase()}
        </span>
      </div>
    </div>
  );
}