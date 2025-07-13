import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function Cart() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const subtotal = state.cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);
  const shipping = subtotal > 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Link
            to="/books"
            className="inline-flex items-center space-x-2 bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Cart Items ({state.cartCount})
                </h2>

                <div className="space-y-6">
                  {state.cart.map((item) => (
                    <div key={item.book.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-100 last:border-b-0">
                      {/* Book Image */}
                      <Link to={`/books/${item.book.id}`} className="flex-shrink-0">
                        <img
                          src={item.book.image}
                          alt={item.book.title}
                          className="w-24 h-32 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Book Details */}
                      <div className="flex-1">
                        <Link
                          to={`/books/${item.book.id}`}
                          className="block hover:text-orange-600 transition-colors"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.book.title}
                          </h3>
                          <p className="text-gray-600 mb-2">by {item.book.author}</p>
                          <p className="text-sm text-orange-600 mb-4">{item.book.genre}</p>
                        </Link>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-700">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 text-sm font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900">
                                ${(item.book.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                ${item.book.price} each
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.book.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-orange-700">
                    Add ${(25 - subtotal).toFixed(2)} more to qualify for free shipping!
                  </p>
                </div>
              )}

              <Link
                to="/checkout"
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/books"
                className="block text-center text-orange-600 hover:text-orange-700 mt-4 transition-colors"
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