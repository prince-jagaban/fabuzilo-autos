'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const backgroundImages = [
  '/assets/hero1.jpg',
  '/assets/hero2.jpg',
  '/assets/hero3.jpg',
  '/assets/background5.jpg',
  '/assets/hero4.jpg',
  '/assets/hero5.jpg',
]; // Add more if you like

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] md:h-[600px] overflow-hidden">
      {/* Sliding Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={backgroundImages[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages[index]})` }}
        />
      </AnimatePresence>

            {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50"></div>

      

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Discover Your Dream Car
          </h1>
          <p className="text-sm sm:text-lg mb-6">
            Premium vehicles, electrifying drives, and reliable power — all at FABUZILO.
          </p>
          <Link
            href="/listing"
            className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-sm sm:text-base transition"
          >
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
