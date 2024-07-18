import MenuCard from "@/components/MenuCard";
import useGetItems from "@/hooks/useGetItems";
import useGetKitchenStatus from "@/hooks/useGetKitchenStatus";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import waiter from "../assets/waiter.jpg";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import logo from "../assets/logo.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

interface Item {
  _id: string; // Add _id to the Item interface
  name: string;
  price: number;
  image: string;
  nonVeg: boolean;
  availability: boolean;
  quantity?: number; 
}

interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Restaurant is Closed</h2>
        <img src={waiter} alt="Closed" className="mb-4" />
        <p>We're currently closed. Please come back later.</p>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const { data: items, error, isLoading } = useGetItems();
  const { isAvailable } = useGetKitchenStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(!isAvailable); 
  }, [isAvailable]);

  // Load cart count from localStorage on mount
  useEffect(() => {
    const storedCart: Item[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = storedCart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    setCartCount(totalItems);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleAddToCart = (item: Item, quantity: number) => {
    const storedCart: Item[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = storedCart.find(cartItem => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 0) + quantity; // Use nullish coalescing to ensure quantity is defined
    } else {
      storedCart.push({ ...item, quantity }); // Add new item with quantity
    }

    localStorage.setItem('cart', JSON.stringify(storedCart));
    
    // Update cart count
    const totalItems = storedCart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    setCartCount(totalItems); // Update cart count
  };

  const handleRemoveFromCart = (item: Item) => {
    const storedCart: Item[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = storedCart.filter(cartItem => cartItem._id !== item._id);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update cart count
    const totalItems = updatedCart.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    setCartCount(totalItems);
  };

  const filteredItems =
    items?.filter((item: Item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8 bg-white shadow">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Shiv Dhaba" className="h-10 w-auto" />
          <span className="ml-2 text-xl font-semibold">Shiv Restaurant</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative flex items-center">
            <ShoppingCartIcon className="w-6 h-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <Modal isOpen={isModalOpen} />

      <div className="flex justify-center mt-4 px-8">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Search food you like..."
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full p-4 pl-10 text-sm border border-black rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={handleClear}
            >
              <XIcon className="w-5 h-5 text-muted-foreground" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
          {searchTerm && filteredItems.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1">
              {filteredItems.map((item: Item, index: number) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div> 

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading items: {error.message}</p>
          ) : (
            items?.map((item: Item) => (
              <MenuCard
                key={item._id} // Use _id as key
                item={item}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart} // Pass the onRemove function
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
