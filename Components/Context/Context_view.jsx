import React, { createContext, useContext, useState } from 'react';
import { Food } from '../../Data/Data';

// Create context
const viewContext = createContext();

// Custom hook to use the context
const useViewContext = () => useContext(viewContext);

const ViewProvider = ({ children }) => {
  const [count, SetCount] = useState(0);
  const [item, AddItem] = useState([]);

  // Function to handle adding items to the cart
  const handleAdd = (id) => {
  

  // Find the item by its id
  const cartItem = Food.find((elem) => elem.id === id);

  if (cartItem) {
    // Check if the item is already in the cart
    AddItem((prevItems) => {
      const isItemInCart = prevItems.some(item => item.id === id);
      if (!isItemInCart) {
        SetCount(count + 1);
        return [...prevItems, cartItem];
      }
      return prevItems;
    });
  }
};

const handleRemove = (id) => {
  // Remove the item by its id
  SetCount(count-1);
  AddItem((prevItems) => prevItems.filter(item => item.id !== id));
};

const isInCart = (id) => {
    return item.some(cartItem => cartItem.id === id);
  };

  const allValue = { count, SetCount, handleAdd, item, AddItem,handleRemove,isInCart};

  return (
    <viewContext.Provider value={allValue}>
      {children}
    </viewContext.Provider>
  );
};

export { ViewProvider, viewContext, useViewContext };
