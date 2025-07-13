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
            {[
              { href: '/', label: 'Home' },
              { href: '/listing', label: 'Car Listings' },
              { href: '/about', label: 'About' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-red-500 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
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
            {[
              { href: 'https://facebook.com', icon: <FaFacebook />, color: '#1877F2' },
              { href: 'https://www.instagram.com/fabuziloautos?igsh=em9zc2N1Z3ZvYmFw', icon: <FaInstagram />, color: '#E4405F' },
              { href: 'https://twitter.com', icon: <FaTwitter />, color: '#1DA1F2' },
              { href: 'https://wa.me/2348127355827', icon: <FaWhatsapp />, color: '#25D366' },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, color: item.color }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FABUZILO. All rights reserved.
      </div>
    </motion.footer>
  );
}
