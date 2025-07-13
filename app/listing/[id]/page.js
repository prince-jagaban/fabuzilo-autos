'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ClientLayout from '@/components/ClientLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";

export default function CarDetailsPage() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      const docRef = doc(db, 'cars', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setCar({ id: docSnap.id, ...docSnap.data() });
    };
    fetchCar();
  }, [id]);

  const formatNaira = (price) => `₦${Number(price).toLocaleString()}`;

  if (!car)
    return (
      <ClientLayout>
        <div className="p-10 text-center text-gray-600">Loading car details...</div>
      </ClientLayout>
    );

  return (
    <ClientLayout>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-5xl mx-auto px-4 sm:px-6 py-10 rounded-xl shadow"

      >
        {/* Back Link */}
        <Link
          href="/listing"
          className="inline-block text-sm text-red-600 hover:text-red-700 mb-6"
        >
          ← Back to Listings
        </Link>

        {/* ✅ Responsive Car Image */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow mb-6">
          <Image
            src={car.image}
            alt={car.title || "Car Image"}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
          />
        </div>

        {/* Car Info */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{car.title}</h1>
          <p className="text-xl text-red-600 font-semibold">{formatNaira(car.price)}</p>
          <p className="text-sm text-gray-600">
            <strong>Fuel:</strong> {car.fuel} • <strong>Year:</strong> {car.year} •{' '}
            <strong>Transmission:</strong> {car.transmission}
          </p>

          <p className="text-gray-800 text-sm sm:text-base whitespace-pre-line leading-relaxed">
            {car.description}
          </p>

          <a
            href={`https://wa.me/2348127355827?text=Hello%20FABUZILO%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(
              car.title
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow transition"
          >
            Contact via WhatsApp
          </a>
        </div>
      </motion.div>
    </ClientLayout>
  );
}
