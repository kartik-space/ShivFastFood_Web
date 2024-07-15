import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

// Define the prop types for the MenuCard component
type Item = {
  name: string;
  price: number;
  image: string;
  nonVeg: boolean;
  availability: boolean; // Ensure this is defined
};

type MenuCardProps = {
  item: Item;
  onAddToCart: (item: Item, quantity: number) => void;
  onRemoveFromCart: (item: Item) => void;
};

const MenuCard = ({ item, onAddToCart, onRemoveFromCart }: MenuCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    onAddToCart(item, quantity || 1);
  };

  const {
    name = '',
    price = 0,
    image = '',
    nonVeg = false,
    availability = false,
  } = item;

  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden h-full transition-transform transform hover:scale-105 ${!availability ? 'bg-gray-300' : 'bg-white'}`}>
      <div className="flex items-center justify-center">
        <img className="w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-110" src={image} alt={name || 'Menu Item'} />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-4">
              <span className={`h-4 w-4 rounded-full ${nonVeg ? 'bg-red-500' : 'bg-green-500'}`} />
              <span className="ml-2 text-sm text-gray-800">{nonVeg ? 'Non-Veg' : 'Veg'}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
            <p className="text-lg font-bold text-gray-800">${price.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center mt-4">
          {!addedToCart ? (
            <button
              onClick={handleAddToCart}
              className={`w-full ${!availability ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#597445] hover:bg-[#4f6737]'} text-white py-2 rounded-lg transition duration-300 ease-in-out shadow-md`}
              disabled={!availability}
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center w-full">
              <button className="transition-all duration-300 ease-in-out bg-[#597445] text-white py-2 rounded-lg hover:bg-[#4f6737] shadow-md w-3/4">
                Added
              </button>
              <div className="flex items-center ml-4">
                <button
                  onClick={handleDecrease}
                  className="p-2 border border-gray-400 rounded-l-lg hover:bg-gray-200 transition duration-150 ease-in-out"
                >
                  <MinusIcon className="w-4 h-4 text-black" />
                </button>
                <span className="text-lg px-2">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="p-2 border border-gray-400 rounded-r-lg hover:bg-gray-200 transition duration-150 ease-in-out"
                >
                  <PlusIcon className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
