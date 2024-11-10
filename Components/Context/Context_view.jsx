import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
// Create context
const viewContext = createContext();

// Custom hook to use the context
const useViewContext = () => useContext(viewContext);

const ViewProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const [Recipe,setRecipe]=useState([]); // for all recipe to show in or recipe
  const [Favourite,setFavourite]=useState([]);//for all liked recipe
  const [item,setItem] =useState(0);//number of recipe in favourite
  const [searchUrl,setsearchUrl] =useState('http://localhost:3081/api/recipes');
  const [foodDetail,setFooddetail]=useState({});
  const [close, setClose] = useState(false);

   const fetchSearch=(query)=>{
         if(query){
          setsearchUrl(`http://localhost:3081/api/recipes/search/${query}`)
         }
         else{
          setsearchUrl('http://localhost:3081/api/recipes')
         }
         setCount(prevCount => prevCount + 1);
    }

  //to show all the recipe in ourrecipe
  useEffect(() => {
    Promise.all([
      //for all unliked recipe
      axios.get(searchUrl),
      //for all liked recipe
      axios.get('http://localhost:3081/api/recipes/liked'),
    ])
      .then(([response_first,response_second]) => {
        setRecipe(response_first.data);
        const {count:number_item, data:recipe_data}=response_second.data;
        setItem(number_item);
        setFavourite(recipe_data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [count]);

  // Function to handle adding items to the cart
  const handleAdd = (id) => {
   axios.put(`http://localhost:3081/api/recipes/addlike/${id}`)
          .then(response => {
            console.log('Item liked status set to 1:', response.data);
            setCount(prevCount => prevCount + 1);
          })
          .catch(error => {
            console.error('Error updating liked status:', error);
          });
};

//to search the full data about recipe
const handleData = (id) => {
   axios.get(`http://localhost:3081/api/recipes/search/detail/${id}`)
          .then(response => {
            console.log(response.data)
            setFooddetail(response.data);
            setClose(true)
          })
          .catch(error => {
            console.error('Error in searching:', error);
          });
};

//in fooddata close button works as 
const onClose = () => {
    setFooddetail({});
    setClose(false);
  };

const handleRemove = (id) => {
  axios.put(`http://localhost:3081/api/recipes/unlike/${id}`)
          .then(response => {
            console.log('Item liked status set to 0:', response.data);
            setCount(prevCount => prevCount + 1);
          })
          .catch(error => {
            console.error('Error updating liked status:', error);
          });
};

  const allValue = { fetchSearch, Favourite, Recipe, item, handleAdd, handleRemove, handleData, foodDetail, onClose,close};

  return (
    <viewContext.Provider value={allValue}>
      {children}
    </viewContext.Provider>
  );
};

export { ViewProvider, viewContext, useViewContext };
