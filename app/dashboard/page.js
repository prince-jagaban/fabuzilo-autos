'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  addDoc, collection, getDocs, deleteDoc, doc, updateDoc,
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { app, db } from '@/lib/firebase';
import { saveAs } from 'file-saver';
import Image from 'next/image';

export default function DashboardPage() {
  const auth = getAuth(app);
  const router = useRouter();
  const formRef = useRef(null);
  const carListRef = useRef(null);

  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({ title: '', price: '', fuel: '', year: '', transmission: '', description: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFuel, setFilterFuel] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/login');
      else {
        setUser(user);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      const snapshot = await getDocs(collection(db, 'cars'));
      const carData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carData);
    };
    if (user) fetchCars();
  }, [user]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateCar = async (e) => {
    e.preventDefault();
    setUploading(true);
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
        setCars(prev => prev.map(c => c.id === editingCarId ? { ...c, ...car, image: imageUrl || c.image } : c));
        setMessage('✅ Car updated!');
      } else {
        const docRef = await addDoc(collection(db, 'cars'), { ...car, image: imageUrl });
        setCars(prev => [...prev, { ...car, id: docRef.id, image: imageUrl }]);
        setMessage('✅ Car added!');
      }

      clearForm();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit.');
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
    if (!confirm('Delete this car?')) return;
    await deleteDoc(doc(db, 'cars', carId));
    setCars(prev => prev.filter(car => car.id !== carId));
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleSearch = () => {
    setCurrentPage(1);
    carListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredCars = cars
    .filter(car => (!filterFuel || car.fuel === filterFuel) && (!filterYear || car.year === filterYear))
    .filter(car => car.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const carsPerPage = 8;
  const paginatedCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const exportToCSV = () => {
    const headers = 'Title,Price,Fuel,Year,Transmission,Description\n';
    const rows = cars.map(car => `${car.title},${car.price},${car.fuel},${car.year},${car.transmission},"${car.description?.replace(/\n/g, ' ')}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'fabuzilo_cars.csv');
  };

  const formatNaira = (price) => `₦${Number(price).toLocaleString()}`;

  if (authLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FABUZILO Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-full sm:w-64 text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <select value={filterFuel} onChange={(e) => setFilterFuel(e.target.value)} className="px-3 py-2 border rounded text-black">
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
            className="px-3 py-2 border rounded text-black"
          />
          {/*<button onClick={exportToCSV} className="bg-green-600 text-white px-4 py-2 rounded">
            Export CSV
          </button>*/}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleAddOrUpdateCar} ref={formRef} className="bg-white p-6 rounded shadow max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-bold mb-4">{editingCarId ? 'Edit Car' : 'Add New Car'}</h2>
        {message && <p className="mb-4 text-blue-600">{message}</p>}

        {['title', 'price', 'year', 'description'].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block text-sm mb-1 capitalize">{field}</label>
            {field !== 'description' ? (
              <input
                type={field === 'price' || field === 'year' ? 'number' : 'text'}
                name={field}
                value={car[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded text-black"
              />
            ) : (
              <textarea
                name="description"
                value={car.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded text-black"
              />
            )}
          </div>
        ))}

        {['fuel', 'transmission'].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label className="block text-sm mb-1 capitalize">{field}</label>
            <select
              name={field}
              value={car[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded text-black"
            >
              <option value="">Select {field}</option>
              {(field === 'fuel'
                ? ['Petrol', 'Diesel', 'Electric', 'Hybrid']
                : ['Automatic', 'Manual', 'CVT', 'Dual-Clutch', 'Tiptronic']
              ).map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="mb-6">
  <label className="block text-sm text-gray-700 dark:text-black-200 mb-1">Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const f = e.target.files[0];
      setFile(f);
      setPreview(f ? URL.createObjectURL(f) : null);
    }}
    className="w-full px-3 py-2 border border-gray-300 rounded text-black dark:text-white bg-white dark:bg-gray-800"
  />
  {preview && (
    <img
      src={preview}
      alt="Preview"
      className="mt-3 h-65 w-full object-cover rounded border border-gray-300"
    />
  )}
</div>


        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded"
          >
            {uploading ? 'Uploading...' : editingCarId ? 'Update' : 'Add'}
          </button>
          <button type="button" onClick={clearForm} className="w-full bg-gray-300 py-2 rounded">
            Clear
          </button>
        </div>
      </form>

      {/* CAR LIST */}
      <div ref={carListRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {paginatedCars.map((car, idx) => (
          <div key={car.id} className="bg-white p-4 rounded shadow">
            <img src={car.image} className="w-full h-40 object-cover rounded mb-3" alt={car.title} />
            <h3 className="font-semibold">{car.title}</h3>
            <p className="text-red-600 font-bold">{formatNaira(car.price)}</p>
            <p className="text-sm text-gray-600">{car.fuel} • {car.transmission} • {car.year}</p>
            <p className="text-sm text-gray-500 mt-2">{car.description?.slice(0, 80)}...</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => {
                  setCar({ ...car });
                  setPreview(car.image);
                  setEditingCarId(car.id);
                  formRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(car.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
