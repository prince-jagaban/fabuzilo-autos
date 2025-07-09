'use client';

import { motion } from 'framer-motion';
import ClientLayout from '@/components/ClientLayout';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <ClientLayout>
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
          style={{ backgroundImage: 'url(/assets/car1.jpg)' }} // ✅ replace with your hero image
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white"
          >
            About Us
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-20 py-16 bg-white"
      >
        {/* Who We Are */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            FABUZILO is a trusted auto dealership offering a diverse selection of
            brand-new, luxury, electric, and premium vehicles. We focus on providing quality,
            value, and customer satisfaction — driven by innovation and excellence.
          </p>
        </section>

        {/* Mission / Vision / Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center mb-20">
          {[
            {
              title: 'Our Mission',
              text: 'To deliver premium vehicles with unmatched customer experience while promoting smart mobility and sustainability.',
            },
            {
              title: 'Our Vision',
              text: 'To become Africa’s leading auto dealership known for quality, trust, and innovation.',
            },
            {
              title: 'Our Core Values',
              text: 'Integrity, Excellence, Innovation, Customer-Centricity, and Reliability.',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-100 p-6 rounded-lg shadow"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </section>

        {/* Why Choose Us */}
        <section className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose FABUZILO?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              'Wide range of luxury & electric vehicles',
              'Affordable & flexible pricing',
              'Nationwide delivery available',
              'Expert customer support',
              'Trusted by hundreds of buyers',
              'Real-time car listing updates',
            ].map((reason, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 text-left bg-white border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <CheckCircle className="text-red-600 mt-1" />
                <p className="text-sm text-gray-700">{reason}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </ClientLayout>
  );
}
