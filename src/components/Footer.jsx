'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white px-6 py-12 md:px-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {/* Logo and Description */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <Image
            src="/assets/fabuzilo-logo.png"
            alt="FABUZILO Logo"
            width={140}
            height={40}
            className="mb-4"
          />
          <p className="text-sm text-gray-300 leading-relaxed">
            FABUZILO is your go-to dealership for reliable, luxurious, and electric vehicles. Driven by excellence.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-red-500 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/listing" className="hover:text-red-500 hover:underline">
                Car Listings
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-red-500 hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-red-500 hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-red-500 hover:underline">
                Admin Login
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-red-500 hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>📍 Off Ahmadu Bello Way, After Abia House, Wuse 2 Abuja, Nigeria</li>
            <li>📞 +234 812 735 5827</li>
            <li>✉️ info@fabuzilo.com</li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex flex-wrap gap-4 text-xl text-gray-300">
            <motion.a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: '#1877F2' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/fabuziloautos?igsh=em9zc2N1Z3ZvYmFw"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: '#E4405F' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: '#1DA1F2' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://wa.me/2348127355827"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: '#25D366' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FABUZILO. All rights reserved.
      </div>
    </motion.footer>
  );
}
