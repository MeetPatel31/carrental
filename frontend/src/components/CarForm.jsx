import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const CarForm = ({ cars, setCars, editingCar, setEditingCar }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ 
    make: '', 
    model: '', 
    year: '', 
    description: '', 
    price: '',
    availability: 'Available'
  });

  useEffect(() => {
    if (editingCar) {
      setFormData({
        make: editingCar.make,
        model: editingCar.model,
        year: editingCar.year,
        description: editingCar.description,
        price: editingCar.price,
        availability: editingCar.availability
      });
    } else {
      setFormData({ 
        make: '', 
        model: '', 
        year: '', 
        description: '', 
        price: '',
        availability: 'Available'
      });
    }
  }, [editingCar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCar) {
        const response = await axiosInstance.put(`/api/cars/${editingCar._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCars(cars.map((car) => (car._id === response.data._id ? response.data : car)));
      } else {
        const response = await axiosInstance.post('/api/cars', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCars([...cars, response.data]);
      }
      setEditingCar(null);
      setFormData({ 
        make: '', 
        model: '', 
        year: '', 
        description: '', 
        price: '',
        availability: 'Available'
      });
    } catch (error) {
      alert('Failed to save car.');
    }
  };

  const handleCancel = () => {
    setEditingCar(null);
    setFormData({ 
      make: '', 
      model: '', 
      year: '', 
      description: '', 
      price: '',
      availability: 'Available'
    });
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 border-b pb-2">
        {editingCar ? 'Edit Car Details' : 'Add New Car'}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="make">
              Make
            </label>
            <input
              id="make"
              type="text"
              placeholder="e.g. Toyota"
              value={formData.make}
              onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
              Model
            </label>
            <input
              id="model"
              type="text"
              placeholder="e.g. Camry"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year
            </label>
            <input
              id="year"
              type="number"
              placeholder="e.g. 2023"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price ($ per day)
            </label>
            <input
              id="price"
              type="number"
              placeholder="e.g. 50"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter car details..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availability">
            Availability Status
          </label>
          <select
            id="availability"
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </div>
        
        <div className="flex justify-between">
          {editingCar && (
            <button 
              type="button" 
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-300"
            >
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className={`${editingCar ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 ${!editingCar && 'w-full'}`}
          >
            {editingCar ? 'Update Car' : 'Add Car'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;
