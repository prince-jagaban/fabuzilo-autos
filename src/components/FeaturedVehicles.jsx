"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FeaturedVehicles() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const snapshot = await getDocs(collection(db, "cars"));
      const carData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCars(carData.slice(0, 3));
    };

    fetchCars();
  }, []);

  const formatNaira = (price) => `₦${Number(price).toLocaleString()}`;

  return (
    <section className="px-4 sm:px-6 md:px-20 py-12 bg-gradient-to-b from-white to-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
        Featured Vehicles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={car.image}
              alt={car.title}
              className="h-44 w-full object-cover"
            />

            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-700">{car.title}</h3>
                <p className="text-red-600 font-bold">{formatNaira(car.price)}</p>
                <p className="text-sm text-gray-600 mt-2 leading-snug">
                  <strong>Year:</strong> {car.year} &nbsp;•&nbsp;
                  <strong>Fuel:</strong> {car.fuel} &nbsp;•&nbsp;
                  <strong>Transmission:</strong> {car.transmission}
                </p>
              </div>

              <Link
                href={`/listing/${car.id}`}
                className="mt-4 inline-block text-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/listing"
          className="inline-block text-sm bg-gray-800 text-white px-6 py-3 rounded hover:bg-black transition"
        >
          Show All Vehicles
        </Link>
      </div>
    </section>
  );
}
