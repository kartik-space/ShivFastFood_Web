import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import OrderConfirmation from "./pages/OrderConfirmation";
import History from "./pages/History";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order-history" element={<History />} />
        </Routes>
      )}
    </>
  );
}

export default App;
