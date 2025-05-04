import React, { createContext, useContext, useState,useEffect } from 'react';
import instance from '../utils/axios';
import axios from 'axios';
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
  const [profilepic,setProfilepic] = useState(null);
  const token = localStorage.getItem('accessToken');


    const handleData = async (id) => {
      if(!logged){
        navigate('/SignIn')
      }
    else{
      try {
      const res = await axios.get(`http://localhost:5000/api/recipe/details?recipeId=${id}`,{
  headers: {
    Authorization: `Bearer ${token}`
  }
});
      setFoodDetail(res.data.data); // assuming { success: true, data: {...recipe} }
      console.log(res.data.data)
      setClose(true);
    } catch (err) {
      console.error('Error fetching recipe details:', err);
    }
    }
  };
 

 const handleAdd = async (id) => {
  try {
    const res = await axios.post('http://localhost:5000/api/recipe/private/saved', { recipeId: id },{
  headers: {
    Authorization: `Bearer ${token}`
  }
});
    console.log('Recipe added successfully:', res.data);
    // Optional: Show success message, update UI, etc.
  } catch (err) {
    console.error('Error adding recipe:', err);
  }
};




const handleLogout = () => {
    // setUserName(''); // Clear user name (or other user data)
    localStorage.clear();
    setProfilepic(null);
    setLogged(false);
    navigate('/', { replace: true });
    window.location.reload();
  };

  const onClose = () => {
    setFoodDetail({});
    setClose(false);
  };



  const allValue = { 
  handleAdd, 
  handleData, 
  foodDetail, 
  onClose,
  close,
  favourites, 
  setFavourites,
  token,
  profilepic,
  setProfilepic,
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
