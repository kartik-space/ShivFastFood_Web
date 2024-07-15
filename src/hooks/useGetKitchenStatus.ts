import { fetchKitchenStatus } from '@/service/Shiv';
import { useEffect, useState } from 'react';

const useGetKitchenStatus = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await fetchKitchenStatus();
        setIsAvailable(data.open); 
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  return { isAvailable, error, isLoading };
};

export default useGetKitchenStatus;
