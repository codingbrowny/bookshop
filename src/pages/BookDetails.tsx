import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { books } from '../data/books';
import { useApp } from '../contexts/AppContext';
import BookCard from '../components/BookCard';

export default function BookDetails() {
  const { id } = useParams();
  const { state, dispatch } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const book = books.find(b => b.id === id);
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
          <Link to="/books" className="text-orange-600 hover:text-orange-700">
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  const isInWishlist = state.wishlist.some(item => item.id === book.id);
  const cartItem = state.cart.find(item => item.book.id === book.id);
  const relatedBooks = books.filter(b => b.id !== book.id && b.genre === book.genre).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: book });
    }
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: book.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: book });
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // Mock additional images
  const bookImages = [
    book.image,
    'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link to="/books" className="hover:text-orange-600">Books</Link>
          <span>/</span>
          <span className="text-gray-900">{book.title}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/books"
          className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Books</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg mb-4">
              <img
                src={bookImages[selectedImage]}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {bookImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-orange-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${book.title} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Book Details */}
          <div>
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                by {book.author}
              </p>
              <p className="text-orange-600 font-medium">
                {book.genre}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-gray-600 ml-3">
                {book.rating} ({book.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${book.price}
              </span>
              {book.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${book.originalPrice}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                    {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">Availability:</span>
                <span className={`font-medium ${
                  book.availability === 'in-stock' ? 'text-green-600' :
                  book.availability === 'limited' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {book.availability === 'in-stock' ? 'In Stock' :
                   book.availability === 'limited' ? 'Limited Stock' :
                   'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Details */}
            <div className="mb-8 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">ISBN:</span>
                <span className="ml-2 text-gray-600">{book.isbn}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Pages:</span>
                <span className="ml-2 text-gray-600">{book.pages}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Publisher:</span>
                <span className="ml-2 text-gray-600">{book.publisher}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Published:</span>
                <span className="ml-2 text-gray-600">
                  {new Date(book.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={book.availability === 'out-of-stock'}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold transition-colors ${
                  book.availability === 'out-of-stock'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {book.availability === 'out-of-stock' 
                    ? 'Out of Stock' 
                    : cartItem 
                    ? `Add More (${cartItem.quantity} in cart)` 
                    : 'Add to Cart'
                  }
                </span>
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`px-6 py-4 rounded-lg font-semibold transition-colors border-2 ${
                  isInWishlist
                    ? 'border-red-500 text-red-600 bg-red-50 hover:bg-red-100'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 mx-auto ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-2 hover:text-orange-600">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-orange-600">
                <Bookmark className="w-4 h-4" />
                <span>Save for Later</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              More Books in {book.genre}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <BookCard key={relatedBook.id} book={relatedBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}