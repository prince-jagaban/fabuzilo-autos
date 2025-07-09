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

      // Get unique values
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
    <div className="bg-white shadow-md -mt-12 z-20 relative mx-6 md:mx-20 rounded-lg p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <select
        value={selectedMake}
        onChange={(e) => setSelectedMake(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">Select Make</option>
        {makes.map((make, i) => (
          <option key={i} value={make}>
            {make}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">Select Year</option>
        {years.map((year, i) => (
          <option key={i} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={selectedFuel}
        onChange={(e) => setSelectedFuel(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm"
      >
        <option value="">Fuel Type</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
      </select>

      <button
        onClick={handleSearch}
        className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 text-sm"
      >
        Search
      </button>
    </div>
  );
}
