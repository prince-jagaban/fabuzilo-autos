'use client';

import { motion } from 'framer-motion';
import ClientLayout from '@/components/ClientLayout';

export default function ContactPage() {
  return (
    <ClientLayout>
      {/* Top Hero Section with Blur */}
      <div className="relative h-64 w-full">
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
          style={{ backgroundImage: 'url(/assets/contact-hero.jpg)' }} // ✅ Replace with your image
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white"
          >
            Contact Us
          </motion.h1>
        </div>
      </div>

      {/* Main Contact Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gray-50 px-6 md:px-20 py-16"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Get in Touch with FABUZILO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const message = e.target.message.value;

              const text = `Hello FABUZILO,%0AMy name is ${name}.%0AEmail: ${email}%0AMessage: ${message}`;
              const phoneNumber = '2348127355827';

              window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
            }}
            className="bg-white shadow-lg rounded-lg p-6 space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring focus:border-red-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring focus:border-red-300"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600">Message</label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring focus:border-red-300"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Send via WhatsApp
            </button>
          </form>

          {/* Map and Info */}
          <div className="space-y-6">
            <div className="rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.944680507599!2d7.495572674727287!3d9.054355688959353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e754d308c8eb5%3A0xe887252489cbe29f!2sAbuja!5e0!3m2!1sen!2sng!4v1719990000000"
                width="100%"
                height="300"
                allowFullScreen=""
                loading="lazy"
                className="w-full h-[300px] border-0"
              ></iframe>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <strong>📍 Address:</strong> Abuja, Nigeria
              </p>
              <p>
                <strong>📞 Phone:</strong> +234 902 408 4975
              </p>
              <p>
                <strong>✉️ Email:</strong> info@fabuzilo.com
              </p>
              <p>
                <strong>⏰ Hours:</strong> Mon - Sat | 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </ClientLayout>
  );
}
