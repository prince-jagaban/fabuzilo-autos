'use client';

import { motion } from 'framer-motion';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';

export default function BlogComingSoon() {
  return (
    <ClientLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-gradient-to-b from-white to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">🚧 Blog Coming Soon</h1>
          <p className="text-lg text-gray-600 mb-6">
            We&apos;re working hard to bring you expert insights, car reviews, auto maintenance tips,
            and the latest trends in the automotive world.
          </p>
          <Link
            href="/"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </ClientLayout>
  );
}
