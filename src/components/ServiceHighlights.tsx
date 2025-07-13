import React from 'react';
import { Truck, Shield, Award, RotateCcw } from 'lucide-react';

export default function ServiceHighlights() {
  const services = [
    {
      icon: Truck,
      title: 'Great Delivery',
      description: 'Fast and reliable shipping to your doorstep'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your payment information is always protected'
    },
    {
      icon: Award,
      title: 'Best Quality',
      description: 'Carefully curated books in excellent condition'
    },
    {
      icon: RotateCcw,
      title: 'Return Available',
      description: 'Easy returns within 30 days of purchase'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="text-center p-6 transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#eba45231] text-orange-500 rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}