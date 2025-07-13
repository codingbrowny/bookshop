import React from 'react';
import { Users, BookOpen, MapPin, PenTool } from 'lucide-react';

export default function Statistics() {
  const stats = [
    {
      icon: Users,
      number: '125,663',
      label: 'Happy Customers',
      color: 'text-blue-600'
    },
    {
      icon: BookOpen,
      number: '50,672+',
      label: 'Book Collections',
      color: 'text-green-600'
    },
    {
      icon: MapPin,
      number: '1,562',
      label: 'Our Stores',
      color: 'text-purple-600'
    },
    {
      icon: PenTool,
      number: '457',
      label: 'Famous Writers',
      color: 'text-orange-600'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-[#131045] font-bold mb-4 text-">
            Book by the Numbers
          </h2>
          <p className="text-lg text-gray-500">
            See why thousands trust us for their reading needs
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 group-hover:bg-white/20 transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}