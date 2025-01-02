import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { useAuth } from './AuthContext';
import Swal from 'sweetalert2';

const useApiInterceptor = () => {
  const navigate = useNavigate();
  const {logout}=useAuth();
  axios.interceptors.response.use(
    response => response,
    error => {
      console.log(error);
      if (error.response && error.response.status === 401 && error.response.data.error == "Authentication failed") {
        // Token expired, redirect to login page
        localStorage.removeItem('token');
        localStorage.clear();
        Swal.fire("Session Expired","Login again","error")
        logout();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );
};

export default useApiInterceptor;
