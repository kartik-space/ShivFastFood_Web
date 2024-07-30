import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import tick from "../assets/tick.png";
import waiter from "../assets/waiter.jpg";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to home page after 3 seconds
    }, 4000);
    
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <img src={tick} alt="Order Confirmed" className="mb-4 w-16 h-16 md:w-24 md:h-24" />
      <h1 className="text-xl md:text-2xl font-bold text-center">Thanks For Ordering!</h1>
      <p className="mt-2 text-center text-sm md:text-base">
        We have received your order. It will be delivered soon.
      </p>
      <img src={waiter} alt="Delivery" className="mt-4 w-full max-w-xs md:max-w-md" />
    </div>
  );
};

export default OrderConfirmation;
