import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const CarList = ({ cars, setCars, setEditingCar }) => {
  const { user } = useAuth();

  // Ensure cars is an array, if not use empty array
  const carsArray = Array.isArray(cars) ? cars : [];

  const handleDelete = async (carId) => {
    try {
      await axiosInstance.delete(`/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCars(carsArray.filter((car) => car._id !== carId));
    } catch (error) {
      alert('Failed to delete car.');
    }
  };

  if (!Array.isArray(cars)) {
    return <div className="my-6 p-6 bg-gray-50 rounded-lg shadow text-center text-gray-500">No cars available.</div>;
  }

  if (carsArray.length === 0) {
    return <div className="my-6 p-6 bg-gray-50 rounded-lg shadow text-center text-gray-500">No cars available. Add a car using the form above.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Available Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carsArray.map((car) => (
          <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
              <h2 className="font-bold text-lg">{car.make} {car.model}</h2>
              <span className="text-sm bg-blue-700 px-2 py-1 rounded">{car.year}</span>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray-700">{car.description || "No description available"}</p>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg text-blue-700">${car.price}</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  car.availability === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : car.availability === 'Rented' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {car.availability}
                </span>
              </div>
              
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setEditingCar(car)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex-1 mr-2 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(car._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex-1 ml-2 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
