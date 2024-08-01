import useGetHistory from "@/hooks/useGetHistory";
import { Phone, StepBack, CheckCircle, MoveLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

const History = () => {
  const uid = localStorage.getItem("user"); // Adjust this to match how you store uid
  const { data, isLoading, error } = useGetHistory(uid);

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-5 text-red-500">
        Error loading order history
      </div>
    );

  if (!data?.user?.orders?.length) {
    return <div className="text-center mt-5">No Order Found</div>;
  }

  const getStatusClass = (status, currentStatus) => {
    const statusOrder = ["PLACED", "ACCEPTED", "DELIVERED"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    if (statusIndex <= currentIndex) {
      switch (status) {
        case "PLACED":
          return "bg-[#131842] border-[#131842] text-white"; // Random color for "PLACED"
        case "ACCEPTED":
          return "bg-[#596FB7] border-[#596FB7] text-white"; // Custom color for "ACCEPTED"
        case "DELIVERED":
          return "bg-[#ADD899] border-[#597445] text-white"; // Custom color for "DELIVERED"
        default:
          return "bg-gray-300 border-gray-300 text-gray-300";
      }
    }
    return "bg-gray-300 border-gray-300 text-gray-300";
  };

  const getLineClass = (status, currentStatus) => {
    const statusOrder = ["PLACED", "ACCEPTED", "DELIVERED"];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    if (statusIndex <= currentIndex) {
      return "bg-gray-500";
    }
    return "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8 bg-white shadow">
        <NavLink to={"/"}>
          <MoveLeft />
        </NavLink>
        <h1 className="text-xl font-semibold">Order History</h1>
      </header>
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.user.orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:shadow-xl hover:scale-105"
            >
              <h2 className="text-lg font-bold mb-2 border-b pb-2">
                Order ID: {order._id}
              </h2>
              <p className="mb-1 text-gray-700">
                Customer Name: {order.customerName}
              </p>
              <p className="mb-1 text-gray-700">
                Phone No: {order.customerPhoneNo}
              </p>
              <p className="mb-1 text-gray-700">
                Address: {order.customerAddress}
              </p>
              <p className="mb-1 text-gray-700">
                Total Amount: {order.totalAmount}
              </p>

              {order?.status === "CANCELLED" ? (
                <p className="mb-1 font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full mt-2">
                  Status: {order.status}
                </p>
              ) : (
                <>
                  <div className="flex items-center space-x-2 mt-4">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusClass(
                        "PLACED",
                        order.status
                      )}`}
                    >
                      {order.status !== "PLACED" && <CheckCircle size={20} />}
                    </div>
                    <div
                      className={`flex-grow h-1 rounded-2xl ${getLineClass(
                        "ACCEPTED",
                        order.status
                      )}`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusClass(
                        "ACCEPTED",
                        order.status
                      )}`}
                    >
                      {order.status !== "PLACED" && <CheckCircle size={20} />}
                    </div>
                    <div
                      className={`flex-grow h-1 rounded-2xl ${getLineClass(
                        "DELIVERED",
                        order.status
                      )}`}
                    ></div>
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getStatusClass(
                        "DELIVERED",
                        order.status
                      )}`}
                    >
                      {order.status === "DELIVERED" && (
                        <CheckCircle size={20} />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>Placed</span>
                    <span>Accepted</span>
                    <span>Delivered</span>
                  </div>
                </>
              )}

              <h3 className="text-md font-semibold mt-4">Items:</h3>
              <ul className="list-none space-y-4 mt-2">
                {order.items.map((item) => (
                  <li key={item._id} className="flex items-center">
                    <img
                      src={item.foodItem.image}
                      alt={item.foodItem.name}
                      className="w-16 h-16 rounded-lg mr-4 border border-gray-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.foodItem.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{item.foodItem.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-center gap-2 md:gap-3 items-center">
          <p className="text-sm text-center md:text-left mb-0 md:mb-0">
            Get your own app and website like this.
          </p>
          <a
            href="tel:+918595257175"
            className="bg-blue-600 text-white text-sm font-semibold flex gap-2 py-2 px-4 items-center justify-center rounded-full hover:bg-blue-500 transition duration-300"
          >
            <div>Call Now</div>
            <Phone size={15} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default History;
