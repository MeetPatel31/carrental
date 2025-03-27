import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import CarForm from '../components/CarForm';
import CarList from '../components/CarList';
import { useAuth } from '../context/AuthContext';

const Cars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/cars', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // Ensure we only set data if it's an array
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setCars([]);
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        alert('Failed to fetch cars.');
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-6">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Car Rental Management</h1>
          <p className="text-gray-600">Manage your rental car inventory</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <CarForm
                cars={cars}
                setCars={setCars}
                editingCar={editingCar}
                setEditingCar={setEditingCar}
              />
            </div>
            <div className="lg:col-span-2">
              <CarList cars={cars} setCars={setCars} setEditingCar={setEditingCar} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars; 