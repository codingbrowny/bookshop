import React from "react";
import { Book, useApp } from "../contexts/AppContext";
import { ShoppingCart } from "lucide-react";

interface RecommendedCardProps {
  book: Book;
  showAddToCart?: boolean;
  isCentral?: boolean;
}

export default function RecommendedCard({
  book,
  isCentral = false,
  showAddToCart = true,
}: RecommendedCardProps) {
  const { state, dispatch } = useApp();

  const isInCart = state.cart.some((item) => item.book.id === book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "ADD_TO_CART", payload: book });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        isCentral ? "scale-125" : "scale-90 opacity-75"
      }`}
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-40 h-60 object-cover rounded-lg shadow-lg"
      />

      {/* Title & Button only when active/central */}
      {isCentral && (
        <>
          <div className="mt-2 text-white text-sm font-semibold text-center">
            {book.title}
          </div>

          {showAddToCart && (
            <div className="p-2 w-full">
              <button
                onClick={handleAddToCart}
                disabled={book.availability === "out-of-stock"}
                className={`w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-lg font-medium transition-colors ${
                  book.availability === "out-of-stock"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : isInCart
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-orange-500 text-white hover:bg-[#eba4528e] hover:border hover:border-[#EBA452] hover:text-white"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">
                  {book.availability === "out-of-stock"
                    ? "Out of Stock"
                    : isInCart
                    ? "In Cart"
                    : "Add to Cart"}
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
