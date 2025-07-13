import React from 'react';
import { Book, useApp } from '../contexts/AppContext';
import { ShoppingCart } from 'lucide-react';

interface BookOnSaleCardProps {
  book: Book;
  showAddToCart?: boolean;
  className?: string;
}

export default function BookOnSaleCard({
    book,
    showAddToCart = true,
    className = '' 
    }: BookOnSaleCardProps
) {
          const { state, dispatch } = useApp();
        
          const isInCart = state.cart.some(item => item.book.id === book.id);
        
          const handleAddToCart = (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({ type: 'ADD_TO_CART', payload: book });
          };
  return (
    <div className={`bg-[#131045] bg-opacity-90 rounded-lg p-4 flex items-center space-x-4 ${className}`}>
      <img
        src={book.image}
        alt={book.title}
        className="w-20 h-28 object-cover rounded-md"
      />
      <div className="flex-1 text-white">
        <h4 className="text-lg font-bold mb-1">{book.title}</h4>
        <p className="text-gray-400 text-sm mb-2">By {book.author}</p>
        <p className="text-gray-300 text-xs mb-3 line-clamp-2">
          {book.description} {/* Use a shorter description for small cards */}
        </p>
        <div className='flex gap-4'>
                    <div className="flex items-baseline mb-3">
          <span className="text-xl font-bold text-white mr-1">${book.price}</span>
          {book.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${book.originalPrice}</span>
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
      </div>
    </div>
  );
}