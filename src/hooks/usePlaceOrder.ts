import { placeOrder } from '@/service/Shiv';
import { useState } from 'react';

interface ErrorType {
  message: string;
}

const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null); // Define the error type
  const [data, setData] = useState(null);

  const submitOrder = async (orderData: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await placeOrder(orderData);
      setData(result);
    } catch (err) {
      setError(err as ErrorType); // Cast to ErrorType
    } finally {
      setLoading(false);
    }
  };

  return { submitOrder, loading, error, data };
};

export default usePlaceOrder;
