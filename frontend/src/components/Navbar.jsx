import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-md text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/cars" className="text-2xl font-bold flex items-center">
          <span className="mr-2">🚗</span>
          <span>Car Rental App</span>
        </Link>
        
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/cars" 
                className="hover:bg-blue-600 px-3 py-2 rounded transition-colors duration-300 flex items-center"
              >
                <span className="mr-1">🚘</span> Cars
              </Link>
              
              <Link 
                to="/profile" 
                className="hover:bg-blue-600 px-3 py-2 rounded transition-colors duration-300 flex items-center"
              >
                <span className="mr-1">👤</span> Profile
              </Link>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors duration-300 flex items-center"
              >
                <span className="mr-1">🚪</span> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="hover:bg-blue-600 px-3 py-2 rounded transition-colors duration-300"
              >
                Login
              </Link>
              
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors duration-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
