"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

export default function FeaturedVehicles() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const snapshot = await getDocs(collection(db, "cars"));
      const carData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCars(carData.slice(0, 3)); // Show only top 3 cars
    };

    fetchCars();
  }, []);

  const formatNaira = (price) => `₦${Number(price).toLocaleString()}`;

  return (
    <div className="px-6 md:px-20 py-12 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Vehicles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <img
              src={car.image}
              alt={car.title}
              className="rounded mb-4 h-40 w-full object-cover"
            />
            <h3 className="font-semibold text-lg text-gray-700">{car.title}</h3>
            <p className="text-red-600 font-bold">{formatNaira(car.price)}</p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Year:</strong> {car.year} &nbsp;•&nbsp;
              <strong>Fuel:</strong> {car.fuel} &nbsp;•&nbsp;
              <strong>Transmission:</strong> {car.transmission}
            </p>

            <a
              href={`/listing/${car.id}`}
              className="mt-3 inline-block text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              View Details
            </a>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/listing"
          className="text-sm bg-gray-800 text-white px-6 py-3 rounded hover:bg-black transition"
        >
          Show All Vehicles
        </a>
      </div>
    </div>
  );
}
