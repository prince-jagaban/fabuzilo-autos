"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SearchFilter() {
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [years, setYears] = useState([]);

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      const snapshot = await getDocs(collection(db, "cars"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCars(data);

      setMakes([...new Set(data.map((car) => car.title))]);
      setYears([...new Set(data.map((car) => car.year))]);
    };

    fetchCars();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedMake) params.append("make", selectedMake);
    if (selectedYear) params.append("year", selectedYear);
    if (selectedFuel) params.append("fuel", selectedFuel);

    router.push(`/listing?${params.toString()}`);
  };

  return (
    <div className="bg-white shadow-md -mt-12 z-20 relative mx-4 sm:mx-6 md:mx-20 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Make */}
      <select
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-black w-full"
      >
        <option value="">Select Make</option>
        {makes.map((make, i) => (
          <option key={i} value={make} className="text-black">
            {make}
          </option>
        ))}
      </select>

      {/* Year */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-black w-full"
      >
        <option value="">Select Year</option>
        {years.map((year, i) => (
          <option key={i} value={year} className="text-black">
            {year}
          </option>
        ))}
      </select>

      {/* Fuel Type */}
      <select
        value={selectedFuel}
        onChange={(e) => setSelectedFuel(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-black w-full"
      >
        <option value="">Fuel Type</option>
        <option value="Petrol" className="text-black">Petrol</option>
        <option value="Diesel" className="text-black">Diesel</option>
        <option value="Electric" className="text-black">Electric</option>
      </select>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 text-sm w-full"
      >
        Search
      </button>
    </div>
  );
}
