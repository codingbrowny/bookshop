import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { books } from '../data/books';
import BookOfTheDayCard from './BookOfTheDayCard';
import BookOnSaleCard from './BookOnSaleCard';

export default function FeaturedBooks() {
  const bookOfTheDay = books[0];
  const smallerBooks = books.slice(1, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#131045] mb-4">
            Books on Sale
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover our curated selection of books at amazing discounted prices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Book of the Day Section */}
          {bookOfTheDay && (
            <div className="lg:col-span-2 h-full">
              <BookOfTheDayCard book={bookOfTheDay} className="h-full" />
            </div>
          )}

          {/* Smaller Book Cards Section */}
          <div className="lg:col-span-1 grid grid-cols-1 gap-6 h-full">
            {smallerBooks.map((book) => (
              <BookOnSaleCard key={book.id} book={book} className="h-full" />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/books"
            className="inline-flex items-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            <span>View All Books</span>
            {/* <ArrowRight className="w-5 h-5" /> */}
          </Link>
        </div>
      </div>
    </section>
  );
}