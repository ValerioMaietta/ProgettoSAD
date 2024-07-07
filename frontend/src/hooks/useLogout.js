import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import config from '../config'; // Importa il file di configurazione degli endpoint

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${config.authServiceUrl}/api/auth/logout`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
