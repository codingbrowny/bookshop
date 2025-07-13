import React from 'react';
import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import ServiceHighlights from '../components/ServiceHighlights';
import Recommendations from '../components/Recommendations';
import SpecialOffers from '../components/SpecialOffers';
import FeaturedProduct from '../components/FeaturedProduct';
import LatestNews from '../components/LatestNews';
import Testimonials from '../components/Testimonials';
import Statistics from '../components/Statistics';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedBooks />
      <ServiceHighlights />
      <Recommendations />
      <SpecialOffers />
      <FeaturedProduct />
      <LatestNews />
      {/* <Testimonials /> */}
      <Statistics />
      <Newsletter />
    </div>
  );
}