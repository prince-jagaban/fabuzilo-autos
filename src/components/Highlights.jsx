"use client";

import { motion } from "framer-motion";
import {
  FaBitcoin,
  FaShippingFast,
  FaSmile,
  FaWrench,
  FaHandshake,
  FaBolt,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const highlights = [
  { icon: <FaBitcoin />, title: "Crypto Payments Accepted" },
  { icon: <FaShippingFast />, title: "Nationwide Delivery" },
  { icon: <FaSmile />, title: "100% Customer Satisfaction" },
  { icon: <FaWrench />, title: "Free Maintenance for 6 Months" },
  { icon: <FaHandshake />, title: "Flexible Financing Options" },
  { icon: <FaBolt />, title: "Fast Document Processing" },
  { icon: <FaShieldAlt />, title: "Verified Vehicles Only" },
  { icon: <FaClock />, title: "24/7 Online Support" },
];

export default function Highlights() {
  return (
    <div
      className="relative py-20 px-6 md:px-20 text-white"
      style={{
        backgroundImage: "url('/assets/background5.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      <div className="relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-[Inter] mb-3">
            Why <span className="text-red-500">FABUZILO</span>?
          </h2>
          <p className="text-gray-200 text-lg max-w-xl mx-auto font-[Playfair_Display]">
            We go beyond just selling cars — we deliver trust, innovation, and peace of mind.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-center shadow-xl border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-3xl text-red-400 mb-4">{item.icon}</div>
              <p className="font-semibold text-white text-lg">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
