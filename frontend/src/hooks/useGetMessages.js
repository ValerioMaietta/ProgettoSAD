import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import axios from 'axios';
import config from '../config';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${config.messageServiceUrl}/api/messages/${selectedConversation._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Include i cookie nelle richieste
          }
        );
        if (res.data.error) throw new Error(res.data.error);
        setMessages(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
