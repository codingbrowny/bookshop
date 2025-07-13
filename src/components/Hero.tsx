import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

export default function Hero() {
  return (
    // <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-8 pb-16">
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 text-[#4B5966] text-sm font-medium mb-6 ">
              <span>BACK TO SCHOOL</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#131045] leading-tight mb-6">
              Special{' '}
              <span className="text-orange-500">60% Off</span>{' '}
              for our student community
            </h1>
            
            <p className="text-md text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover thousands of books at unbeatable prices. From textbooks to novels, 
              we've got everything you need to fuel your academic journey and personal growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/books"
                className="inline-flex items-center justify-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
              >
                <span>Learn More</span>
              </Link>
              
              <button className="inline-flex items-center justify-center space-x-2 border border-[#848d96] text-[#848d96] px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:border-0 hover:text-white transition-colors">
                <span>What They Say</span>
              </button>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              {/* <img
                src="public/hero.webp"
                alt="Happy student with books"
                className="w-auto h-auto"
              /> */}
            </div>
            
            {/* Decorative Elements */}
            {/* <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div> */}
          </div>
        </div>
      </div>
      
      {/* Trusted By Section */}
      {/* <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium mb-8">
            TRUSTED BY LEADING ORGANIZATIONS
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
            {['Highlow', 'Boostst', 'emajine', 'manhall', 'GlowUP'].map((brand) => (
              <div
                key={brand}
                className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}