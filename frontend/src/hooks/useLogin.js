import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import config from '../config'; // Importa il file di configurazione degli endpoint

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.authServiceUrl}/api/auth/login`,
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      localStorage.setItem('chat-user', JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  return true;
}
