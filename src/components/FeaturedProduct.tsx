import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';



export default function FeaturedProduct() {
  const { dispatch } = useApp();
  
  const featuredBook = {
    id: '3',
    title: 'A Heavy Lift',
    author: 'Sarah Mitchell',
    price: 18.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviews: 2156,
    description: 'An inspiring memoir about overcoming life\'s greatest challenges and finding strength in adversity. This powerful story resonates with readers facing their own struggles and provides practical wisdom for navigating difficult times.',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=500',
    availability: 'in-stock'
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: featuredBook });
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={featuredBook.image}
                alt={featuredBook.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badge */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              Featured Product
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {featuredBook.title}
              </h2>
              <p className="text-xl text-gray-600">
                by {featuredBook.author}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-1">
                {renderStars(featuredBook.rating)}
              </div>
              <span className="text-gray-600 ml-3">
                {featuredBook.rating} ({featuredBook.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {featuredBook.description}
            </p>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl font-bold text-gray-900">
                ${featuredBook.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${featuredBook.originalPrice}
              </span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                {Math.round(((featuredBook.originalPrice - featuredBook.price) / featuredBook.originalPrice) * 100)}% OFF
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Buy Now</span>
              </button>
              
              <Link
                to={`/books/${featuredBook.id}`}
                className="flex-1 border-2 border-orange-600 text-orange-600 py-4 px-8 rounded-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <Eye className="w-5 h-5" />
                <span>View Details</span>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Availability:</span>
                <span className="ml-2 text-green-600 font-medium">In Stock</span>
              </div>
              <div>
                <span className="font-medium">Shipping:</span>
                <span className="ml-2">Free shipping on orders over $25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}