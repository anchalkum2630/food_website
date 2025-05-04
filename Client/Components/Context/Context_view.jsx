import React, { createContext, useContext, useState,useEffect } from 'react';
import instance from '../utils/axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
// Create context
const viewContext = createContext();

// Custom hook to use the context
const useViewContext = () => useContext(viewContext);

const ViewProvider = ({ children }) => {
  const navigate=useNavigate();
  const [logged,setLogged]=useState(false);
  const [foodDetail,setFoodDetail]=useState([]);
  const [close,setClose]=useState(false);
  const [addedRecipes, setAddedRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);



    const handleData = async (id) => {
    try {
      const res = await instance.get(`/api/recipe/details?recipeId=${id}`);
      setFoodDetail(res.data.data); // assuming { success: true, data: {...recipe} }
      console.log(res.data.data)
      setClose(true);
    } catch (err) {
      console.error('Error fetching recipe details:', err);
    }
  };
 

 const handleAdd = async (id) => {
  try {
    const res = await instance.post('/api/recipe/private/saved', { recipeId: id });
    console.log('Recipe added successfully:', res.data);
    // Optional: Show success message, update UI, etc.
  } catch (err) {
    console.error('Error adding recipe:', err);
  }
};




const handleLogout = () => {
    // setUserName(''); // Clear user name (or other user data)
    localStorage.clear();
    setLogged(false);
    navigate('/', { replace: true });
    window.location.reload();
  };

  const onClose = () => {
    setFoodDetail({});
    setClose(false);
  };




  const allValue = { 
//   fetchSearch, 
//   Favourite,
//   FetchSavedRecipe, 
//   Recipe, 
//   item,
  handleAdd, 
//   handleRemove, 
  handleData, 
  foodDetail, 
  onClose,
  close,
  favourites, 
  setFavourites,
//   UserName,
//   handleprofile,
//   userProfile,
//   userDate,
//   userTime,
addedRecipes,
setAddedRecipes,
  logged,
  setLogged,
  handleLogout};

  return (
    <viewContext.Provider value={allValue}>
      {children}
    </viewContext.Provider>
  );
};

export { ViewProvider, viewContext, useViewContext };
