import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Spaghetti", price: 12.99, quantity: 2 },
    { id: 2, name: "Burger", price: 9.99, quantity: 1 },
    { id: 3, name: "Salad", price: 7.99, quantity: 3 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = () => {
    // Reset cart or navigate away
    navigate('/order-confirmation');
    setCartItems([]);
    setIsModalOpen(false);
  };

  const handleCancelOrder = () => {
    setIsModalOpen(false);
  };

  const handleEmptyCart = () => {
    setCartItems([]); // Clear the cart items
  };

  const handleIncrease = (id: any) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: any) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-lg flex items-center mb-4">
        <ArrowLeft
          onClick={() => navigate("/")}
          className="cursor-pointer text-2xl text-gray-800 mr-2"
        />
        <h1 className="text-2xl font-semibold">Cart</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-2">Personal Details</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mt-4">
        <h2 className="text-xl font-semibold mb-2">Order Details</h2>
        <div className="divide-y divide-gray-200">
          {cartItems.length === 0 ? (
            <div className="py-2 text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="py-2 flex justify-between items-center"
              >
                <span className="w-1/3">{item.name}</span>{" "}
                {/* Fixed width for item name */}
                <div className="flex items-center w-1/3 justify-center">
                  {" "}
                  {/* Fixed width for buttons */}
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="p-1 border border-gray-400 rounded-l-lg hover:bg-gray-200 transition duration-150 ease-in-out"
                  >
                    <Minus className="w-4 h-4 text-black" />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="p-1 border border-gray-400 rounded-r-lg hover:bg-gray-200 transition duration-150 ease-in-out"
                  >
                    <Plus className="w-4 h-4 text-black" />
                  </button>
                </div>
                <span className="w-1/3 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>{" "}
                {/* Fixed width for total price */}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mt-4">
        <h2 className="text-xl font-semibold mb-2">Total Cost</h2>
        <div className="flex justify-between">
          <span>Total</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-lg mt-4">
        <button
          onClick={handleEmptyCart}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
        >
          Empty Cart
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#597445] text-white py-2 px-4 rounded-lg hover:bg-[#4f6737] transition duration-300 ease-in-out shadow-md"
        >
          Place Order
        </button>
      </div>

      {/* Modal for Order Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 sm:mx-0">
            <h2 className="text-lg font-semibold mb-4">Confirm Your Order</h2>
            <p className="mb-4">Are you sure you want to place this order?</p>
            <div className="flex justify-between">
              <button
                onClick={handleCancelOrder}
                className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-[#597445] text-white py-2 px-4 rounded-lg hover:bg-[#4f6737] transition duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
