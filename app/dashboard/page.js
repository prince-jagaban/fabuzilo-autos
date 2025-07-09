'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {
  addDoc, collection, getDocs, deleteDoc, doc, updateDoc,
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import { app, db } from '@/lib/firebase';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const formRef = useRef(null);
  const carListRef = useRef(null);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [cars, setCars] = useState([]);
  const [editingCarId, setEditingCarId] = useState(null);
  const [filterFuel, setFilterFuel] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [car, setCar] = useState({
    title: '', price: '', fuel: '', year: '', transmission: '', description: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/login');
      else {
        setUser(currentUser);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'cars'));
        const carsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCars(carsData);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    if (user) fetchCars();
  }, [user]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateCar = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');
    try {
      let imageUrl = '';
      if (file) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `cars/${file.name}-${Date.now()}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      if (editingCarId) {
        const carRef = doc(db, 'cars', editingCarId);
        await updateDoc(carRef, { ...car, ...(imageUrl && { image: imageUrl }) });
        setCars((prev) =>
          prev.map((c) => (c.id === editingCarId ? { ...c, ...car, image: imageUrl || c.image } : c))
        );
        setMessage('✅ Car updated successfully!');
      } else {
        const docRef = await addDoc(collection(db, 'cars'), { ...car, image: imageUrl });
        setCars((prev) => [...prev, { ...car, id: docRef.id, image: imageUrl }]);
        setMessage('✅ Car added successfully!');
      }

      clearForm();
    } catch (err) {
      console.error('Error submitting car:', err);
      setMessage('❌ Failed to submit car.');
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setCar({ title: '', price: '', fuel: '', year: '', transmission: '', description: '' });
    setFile(null);
    setPreview(null);
    setEditingCarId(null);
    setMessage('');
  };

  const handleDelete = async (carId) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    try {
      await deleteDoc(doc(db, 'cars', carId));
      setCars((prev) => prev.filter((car) => car.id !== carId));
      alert('✅ Car deleted.');
    } catch (err) {
      console.error('Error deleting car:', err);
      alert('❌ Failed to delete car.');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleSearch = () => {
    setCurrentPage(1);
    carListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredCars = cars.filter(
    (car) =>
      (!filterFuel || car.fuel === filterFuel) &&
      (!filterYear || car.year === filterYear)
  );

  const searchedCars = filteredCars.filter((car) =>
    car.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const carsPerPage = 8;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = searchedCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(searchedCars.length / carsPerPage);

  const exportToCSV = () => {
    const header = 'Title,Price,Fuel,Year,Transmission,Description\n';
    const rows = cars.map(
      (c) =>
        `${c.title},${c.price},${c.fuel},${c.year},${c.transmission},${c.description?.replace(/\n/g, ' ')}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'fabuzilo_cars.csv');
  };

  const formatNaira = (price) => `₦${Number(price).toLocaleString()}`;

  if (authLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search cars by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-72"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <p className="text-gray-600 font-medium">🚗 Total Cars: {cars.length}</p>
        <div className="flex gap-4 items-center">
          <select value={filterFuel} onChange={(e) => setFilterFuel(e.target.value)} className="border px-3 py-2 rounded text-sm">
            <option value="">All Fuels</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          <input
            type="number"
            placeholder="Filter Year"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          />
          <button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
            Export CSV
          </button>
        </div>
      </div>

      {/* FORM SECTION */}
      <form
        ref={formRef}
        onSubmit={handleAddOrUpdateCar}
        className="bg-white shadow p-6 rounded max-w-2xl mx-auto mb-12"
      >
        <h2 className="text-xl font-semibold mb-4">{editingCarId ? 'Edit Car' : 'Add New Car'}</h2>
        {message && <div className="mb-4 text-sm text-blue-700 font-medium">{message}</div>}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={car.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Price (₦)</label>
          <input
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Fuel</label>
          <select
            name="fuel"
            value={car.fuel}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Transmission</label>
          <select
            name="transmission"
            value={car.transmission}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="CVT">CVT</option>
            <option value="Dual-Clutch">Dual-Clutch</option>
            <option value="Tiptronic">Tiptronic</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Year</label>
          <input
            type="number"
            name="year"
            value={car.year}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={car.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            className="w-full px-4 py-2 border rounded"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />
          )}
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            {uploading ? 'Uploading...' : editingCarId ? 'Update Car' : 'Add Car'}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </form>

      {/* CAR LIST */}
      <div ref={carListRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentCars.map((car, index) => (
          <motion.div
            key={car.id}
            className="bg-white p-4 rounded shadow flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img src={car.image} alt={car.title} className="rounded mb-3 w-full h-40 object-cover" />
            <div>
              <h3 className="text-lg font-bold text-gray-800">{car.title}</h3>
              <p className="text-red-600 font-semibold">{formatNaira(car.price)}</p>
              <p className="text-sm text-gray-600">
                Year: {car.year} • Fuel: {car.fuel} • Transmission: {car.transmission}
              </p>
              <p className="text-sm text-gray-500 mt-2">{car.description?.slice(0, 80)}...</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  setCar({
                    title: car.title,
                    price: car.price,
                    fuel: car.fuel,
                    year: car.year,
                    transmission: car.transmission,
                    description: car.description,
                  });
                  setPreview(car.image || null);
                  setEditingCarId(car.id);
                  formRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(car.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
