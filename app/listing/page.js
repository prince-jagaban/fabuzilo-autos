'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import ClientLayout from '@/components/ClientLayout';
import Image from 'next/image';

export default function ListingPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [search, setSearch] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [transmissionFilter, setTransmissionFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  const [fuelOptions, setFuelOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [transmissionOptions, setTransmissionOptions] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const snapshot = await getDocs(collection(db, 'cars'));
      const carData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCars(carData);
      setFilteredCars(carData);

      setFuelOptions([...new Set(carData.map((c) => c.fuel).filter(Boolean))]);
      setYearOptions([...new Set(carData.map((c) => c.year).filter(Boolean))].sort((a, b) => b - a));
      setTransmissionOptions([...new Set(carData.map((c) => c.transmission).filter(Boolean))]);
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let result = [...cars];

    result = result.filter((car) => {
      const matchesSearch =
        car.title?.toLowerCase().includes(search.toLowerCase()) ||
        car.description?.toLowerCase().includes(search.toLowerCase()) ||
        car.price?.toString().includes(search);

      const matchesFuel = fuelFilter ? car.fuel === fuelFilter : true;
      const matchesYear = yearFilter ? car.year?.toString() === yearFilter : true;
      const matchesTransmission = transmissionFilter ? car.transmission === transmissionFilter : true;

      return matchesSearch && matchesFuel && matchesYear && matchesTransmission;
    });

    if (sortOption === 'priceAsc') {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOption === 'priceDesc') {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortOption === 'yearDesc') {
      result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else if (sortOption === 'yearAsc') {
      result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    }

    setFilteredCars(result);
  }, [search, fuelFilter, yearFilter, transmissionFilter, sortOption, cars]);

  const resetFilters = () => {
    setSearch('');
    setFuelFilter('');
    setYearFilter('');
    setTransmissionFilter('');
    setSortOption('');
  };

  return (
    <ClientLayout>
      <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Explore Our Cars
          </h1>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <input
              type="text"
              placeholder="Search cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            />

            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">All Fuel Types</option>
              {fuelOptions.map((fuel) => (
                <option key={fuel} value={fuel}>{fuel}</option>
              ))}
            </select>

            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">All Years</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={transmissionFilter}
              onChange={(e) => setTransmissionFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">All Transmissions</option>
              {transmissionOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Sort By</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="yearDesc">Year: Newest First</option>
              <option value="yearAsc">Year: Oldest First</option>
            </select>

            <button
              onClick={resetFilters}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
            >
              Reset Filters
            </button>
          </div>

          {/* Listings */}
          {filteredCars.length === 0 ? (
            <p className="text-center text-gray-500">No cars match your filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* ✅ Fixed Image Rendering */}
                  <div className="relative w-full h-48">
                    <Image
                      src={car.image}
                      alt={car.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{car.title}</h3>
                    <p className="text-red-600 font-bold">
                      ₦{Number(car.price).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {car.fuel} • {car.year} • {car.transmission}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {car.description?.slice(0, 80)}...
                    </p>
                    <a
                      href={`/listing/${car.id}`}
                      className="inline-block mt-3 text-sm bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      View Details
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}
