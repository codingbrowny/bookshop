import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard from './BookCard';
import { books } from '../data/books';
import RecommendedCard from './RecommendedCard';

export default function Recommendations() {
  const [currentIndex, setCurrentIndex] = useState(3); // Start in middle
  const cardWidth = 192; // w-48 (Tailwind) in px
  const gap = 16; // Tailwind gap-4 ~ 1rem
  const totalWidth = cardWidth + gap;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, books.length - 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 bg-[#0D0C2B] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Recommended For You</h2>
        <p className="text-sm text-gray-400 mb-10 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Arrows */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute left-0 z-10 bg-white text-black p-2 rounded-full shadow-lg disabled:opacity-40"
          >
            <ChevronLeft />
          </button>

          {/* Book Carousel */}
          <div className="w-full overflow-hidden py-12">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(calc(50% - ${currentIndex * totalWidth}px - ${cardWidth / 2}px))`,
              }}
            >
              {books.map((book, index) => {
                const isActive = index === currentIndex;
                return (
                  <div
                    key={book.id}
                    className={`w-48 flex-shrink-0 mx-2 transform transition-all duration-300`}
                  >
                      <RecommendedCard
    key={book.id}
    book={book}
    isCentral={index === currentIndex}
    showAddToCart={true}
  />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex === books.length - 1}
            className="absolute right-0 z-10 bg-white text-black p-2 rounded-full shadow-lg disabled:opacity-40"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
