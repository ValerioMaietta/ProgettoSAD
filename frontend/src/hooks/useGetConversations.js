import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import config from '../config';
import axios from 'axios';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${config.userServiceUrl}/api/users`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Questo sostituisce 'credentials: include' di fetch
        });
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setConversations(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
