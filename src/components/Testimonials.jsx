'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Tunde F.',
    role: 'Buyer',
    message:
      'FABUZILO helped me find my dream car at the best price. Smooth transaction and top-tier service!',
  },
  {
    name: 'Ada M.',
    role: 'Customer',
    message:
      'I wasn’t sure what car to go for, but their team was very helpful. I’m now driving a sleek SUV I love!',
  },
  {
    name: 'Chinedu A.',
    role: 'Returning Client',
    message:
      'Great selection, fantastic after-sales support. FABUZILO truly understands premium auto service.',
  },
  {
    name: 'Fatima S.',
    role: 'Car Owner',
    message:
      'From enquiry to delivery, everything was seamless. I highly recommend FABUZILO for car purchases.',
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative text-white py-20 px-6 md:px-24 bg-cover bg-center min-h-[500px]"
      style={{ backgroundImage: "url('/assets/background5.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/80 z-0" />

      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold font-[Inter]">
          WHAT OUR CLIENTS SAY
        </h2>
        <p className="italic text-yellow-400 mt-2 font-[Playfair_Display] text-lg">
          Trusted feedback from satisfied customers
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Testimonial Box */}
        <div className="bg-gradient-to-l from-[#222] to-black p-8 rounded-lg shadow-xl max-w-xl w-full relative">
          <FaQuoteLeft className="text-3xl text-red-500 mb-4" />
          <AnimatePresence mode="wait">
            <motion.p
              key={testimonials[index].message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-lg leading-relaxed"
            >
              {testimonials[index].message}
            </motion.p>
          </AnimatePresence>
          <div className="mt-6">
            <p className="font-bold">{testimonials[index].name}</p>
            <p className="text-sm text-gray-400">{testimonials[index].role}</p>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block">
          <img
            src="/assets/testimonial-car.jpg"
            alt="Happy client with new car"
            className="rounded-lg w-[450px] object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="relative z-10 flex justify-center mt-8 gap-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === index ? 'bg-yellow-500 scale-110' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
