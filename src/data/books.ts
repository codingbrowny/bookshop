import { Book } from '../contexts/AppContext';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 12.99,
    originalPrice: 19.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Classic Literature',
    rating: 4.2,
    reviews: 1248,
    description: 'Set in the Jazz Age on prosperous Long Island and in New York City, The Great Gatsby provides a critical social history of America during the Roaring Twenties within its fictional narrative.',
    availability: 'in-stock',
    isbn: '978-0-7432-7356-5',
    pages: 180,
    publisher: 'Scribner',
    publishDate: '1925-04-10'
  },
  {
    id: '2',
    title: 'Thunder Blunt',
    author: 'Marcus Thunder',
    price: 15.99,
    originalPrice: 24.99,
    image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Thriller',
    rating: 4.6,
    reviews: 892,
    description: 'A gripping psychological thriller that will keep you on the edge of your seat until the very last page.',
    availability: 'in-stock',
    isbn: '978-1-4234-5678-9',
    pages: 320,
    publisher: 'Thunder Press',
    publishDate: '2023-03-15'
  },
  {
    id: '3',
    title: 'A Heavy Lift',
    author: 'Sarah Mitchell',
    price: 18.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Non-Fiction',
    rating: 4.8,
    reviews: 2156,
    description: 'An inspiring memoir about overcoming life\'s greatest challenges and finding strength in adversity. This powerful story resonates with readers facing their own struggles.',
    availability: 'in-stock',
    isbn: '978-0-5432-1234-8',
    pages: 280,
    publisher: 'Inspire Books',
    publishDate: '2023-06-20'
  },
  {
    id: '4',
    title: 'Digital Horizons',
    author: 'Tech Analytics Team',
    price: 22.99,
    originalPrice: 34.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Technology',
    rating: 4.4,
    reviews: 567,
    description: 'Explore the future of technology and its impact on society in this comprehensive analysis.',
    availability: 'in-stock',
    isbn: '978-1-2345-6789-0',
    pages: 450,
    publisher: 'Tech Publishers',
    publishDate: '2023-08-10'
  },
  {
    id: '5',
    title: 'Mystery in the Shadows',
    author: 'Detective Mills',
    price: 14.99,
    originalPrice: 21.99,
    image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Mystery',
    rating: 4.1,
    reviews: 1034,
    description: 'A detective story that unfolds in the dark corners of the city.',
    availability: 'limited',
    isbn: '978-0-9876-5432-1',
    pages: 295,
    publisher: 'Mystery House',
    publishDate: '2023-05-08'
  },
  {
    id: '6',
    title: 'Quantum Physics Simplified',
    author: 'Dr. Einstein Jr.',
    price: 28.99,
    originalPrice: 39.99,
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Science',
    rating: 4.7,
    reviews: 823,
    description: 'Making complex quantum physics concepts accessible to everyone.',
    availability: 'in-stock',
    isbn: '978-1-1111-2222-3',
    pages: 380,
    publisher: 'Science Press',
    publishDate: '2023-04-22'
  },
  {
    id: '7',
    title: 'Love in Paris',
    author: 'Romance Author',
    price: 11.99,
    originalPrice: 16.99,
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Romance',
    rating: 4.3,
    reviews: 1876,
    description: 'A heartwarming love story set in the romantic city of Paris.',
    availability: 'in-stock',
    isbn: '978-2-3456-7890-1',
    pages: 240,
    publisher: 'Romance Books',
    publishDate: '2023-02-14'
  },
  {
    id: '8',
    title: 'Space Adventure',
    author: 'Sci-Fi Master',
    price: 19.99,
    originalPrice: 27.99,
    image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    genre: 'Science Fiction',
    rating: 4.5,
    reviews: 1245,
    description: 'An epic journey through space and time.',
    availability: 'in-stock',
    isbn: '978-3-4567-8901-2',
    pages: 420,
    publisher: 'Sci-Fi Universe',
    publishDate: '2023-07-03'
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Emma Johnson',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'BookKind has an amazing collection and the delivery is super fast. I love shopping here!'
  },
  {
    id: '2',
    name: 'Michael Chen',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'Great prices and excellent customer service. Highly recommended for book lovers.'
  },
  {
    id: '3',
    name: 'Sarah Davis',
    image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 4,
    text: 'The student discount is fantastic! I saved so much money on my textbooks.'
  }
];

export const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Books Every Student Should Read',
    excerpt: 'Discover the essential books that will expand your mind and enhance your academic journey.',
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2023-09-15'
  },
  {
    id: '2',
    title: 'How to Build a Personal Library on a Budget',
    excerpt: 'Smart tips and tricks for building an impressive book collection without breaking the bank.',
    image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2023-09-12'
  },
  {
    id: '3',
    title: 'The Digital vs Physical Books Debate',
    excerpt: 'Exploring the pros and cons of digital and physical books in the modern age.',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: '2023-09-10'
  }
];