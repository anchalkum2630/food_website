import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
// Create context
const viewContext = createContext();

// Custom hook to use the context
const useViewContext = () => useContext(viewContext);

const ViewProvider = ({ children }) => {
  const navigate=useNavigate();
  const [Recipe,setRecipe]=useState([]); // for all recipe to show in or recipe
  const [Favourite,setFavourite]=useState([]);//for all liked recipe
  // const [userProfile,setUserProfile]=useState([]);//for userprofile detail
  // const [userDate,setUserDate]=useState(null);//for userprofile date
  // const [userTime,setUserTime]=useState(null);//for userprofile Time
  // // const [item,setItem] =useState(0);//number of recipe in favourite
  const [foodDetail,setFooddetail]=useState({});
  // const [close, setClose] = useState(false);
  const [logged,setLogged]=useState(false);
  // const [UserName,setUserName]=useState('');
// let UserName;
// let item;
//   if(!localStorage.getItem("UserName")){
//     UserName=null;
//     item=localStorage.setItem("saved_item",0);
//   }else{
//     UserName=localStorage.getItem("UserName");
//     item=localStorage.getItem("saved_item");
//   }



//   const fetchSearch = async (query) => {
//   const token = localStorage.getItem("accessToken");
//   let url;
//   let searchQuery;
//   // Get query from localStorage or the passed parameter
//   if (!localStorage.getItem("setQuery")) {
//     console.log("local not have");
//     searchQuery = query && typeof query === "string" ? query.trim() : "";
//     localStorage.setItem("setQuery", searchQuery); // Save to localStorage for future use
//   } else {
//     console.log("local have");
//     searchQuery = localStorage.getItem("setQuery");
//     console.log("Stored Query:", searchQuery);
//   }

//   // Determine the URL based on token and searchQuery
//   if (token) {
//     if (searchQuery) {
//       console.log("happy1");
//       url = `http://localhost:3081/api/recipes/UserSearch/${searchQuery}`;
//     } else {
//       console.log("happy2");
//       url = `http://localhost:3081/api/recipes/UserSearch`;
//     }
//   } else {
//     if (searchQuery) {
//       console.log("happy3", searchQuery);
//       url = `http://localhost:3081/api/recipes/search/${searchQuery}`;
//     } else {
//       console.log("happy4");
//       url = "http://localhost:3081/api/recipes/search";
//     }
//   }

//   // Fetch recipes using the URL
//   console.log("Fetching URL:", url);
//   await fetchUrlSearch(url);
// };

// const fetchUrlSearch = async (url) => {
//   const token = localStorage.getItem("accessToken");
//   try {
//     if(token){
//     const response = await axios.get(url, {
//   headers: { Authorization: `Bearer ${token}` },
// });
//     console.log("Fetched Recipes:", response.data);
//     setRecipe(response.data); // Update recipe state
//     }else{
//         const response = await axios.get(url);
//         console.log("Fetched Recipes:", response.data);
//         setRecipe(response.data); // Update recipe state
//     }
//   } catch (error) {
//     if (error.response.status === 403) {
//      console.log("403 refreshtoken should work")
//       await refreshToken();
//       await fetchUrlSearch(url); // Retry the request
//      }else{
//       console.log(error.response.status);
//     console.error('Error fetching all recipe: ', error.response?.data || error.message);

//      }
//   }
// };







// //for refresh token

// const refreshToken = async () => {
//   try {
//     const response = await axios.post("http://localhost:3081/token", {}, {
//       withCredentials: true, // Include refresh token cookie
//     });

//     if (response.status === 200) {
//       console.log("refresh token in client side : "+response.data.token)
//       const accessToken = response.data.token;
//       localStorage.setItem("accessToken", accessToken);
//     } else {
//       console.log("Session expired. Please log in again.");
//       handleLogout();
//       // You can redirect the user to the login page if needed:
//       // window.location.href = "/login";
//     }
//   } catch (error) {
//     console.error("Error refreshing token:", error.response?.data || error.message);
//     // Optionally, handle any errors here (like logging out the user)
//     // window.location.href = "/login"; // Redirect to login page
//   }
// };

// //for userprofile | complete
// const handleprofile = async () => {
//    const token = localStorage.getItem("accessToken");
//    console.log("handle profile token : "+token);
//   try {
//     // Make the function asynchronous and await the axios call
//     const response = await axios.get('http://localhost:3081/api/userprofile', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     // Check if response data is in the expected format
//     if (response.data) {
//       setUserProfile(response.data); // Update the state
//       // console.log('Updated UserProfile:', response.data);
//       const createdAt = new Date(response.data.created_at);
//       if (isNaN(createdAt.getTime())) {
//       console.error("Invalid date:", userProfile.created_at);
//       }
//      const formattedDate = format(createdAt, 'dd-MM-yyyy');
//      setUserDate(formattedDate)
//      const formattedTime = format(createdAt, 'HH:mm');
//      setUserTime(formattedTime)
//      } else {
//        console.error('Invalid response format');
//      }
//   } catch (error) {
//     // Handle errors
//     if (error.response.status === 403) {
//      console.log("403 refreshtoken should work")
//       await refreshToken();
//       await handleprofile(); // Retry the request
//      }else{
//       console.log(error.response.status);
//     console.error('Error fetching user profile:', error.response?.data || error.message);

//      }
//   }
// };

// //to see the saved recipe |complete
// const FetchSavedRecipe = async ()=>{
//   const token = localStorage.getItem("accessToken");
//   try{
//       const response = await axios.get('http://localhost:3081/api/recipes/liked', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.data) {
//         const { count: number_item, data: recipe_data } = response.data;
//         localStorage.setItem("saved_item",number_item); // Update the count of liked recipes
//         setFavourite(recipe_data); // Update the liked recipes
//       }

//   }
//   catch(error){
//     if (error.response.status === 403) {
//      console.log("403 refreshtoken should work")
//      console.log("before : "+token)
//       await refreshToken();
//       console.log("after : "+token)
//       await FetchSavedRecipe(); // Retry the request
//      }else{
//       console.log(error.response.status);
//       console.error('Error fetching user saved recipe : ', error.response?.data || error.message);

//      }

//   }
// }

//   // Function to handle adding items to the cart| complete
// const handleAdd = async (recipe_id) => {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const Query=localStorage.getItem("setQuery");
//     console.log(token+"   "+recipe_id);
//     // Sending a POST request
//     const response = await axios.post('http://localhost:3081/api/recipes/addlike', 
//   { id: recipe_id }, // id is sent in the request body
//   { headers: { Authorization: `Bearer ${token}` } } // token is sent in headers
// );


//     console.log('Response:', response.data);
//     console.log(" query : "+Query)
//     fetchSearch();
//     FetchSavedRecipe(Query); // Ensure the function is awaited if needed
//   } catch (error) {
//     console.log(error.response.status);
//    if (error.response.status === 403) {
//      console.log("403 refreshtoken should work")
//       await refreshToken();
//       await handleAdd(recipe_id); // Retry the request
//      }else{
//       console.error('Error fetching user saved recipe : ', error.response?.data || error.message);

//      }
//   }
// };

// //to search the full data about recipe | complete
// const handleData = (id) => {
//   if(localStorage.getItem("accessToken")){
//    axios.get(`http://localhost:3081/api/recipes/search/detail/${id}`)
//           .then(response => {
//             console.log(response.data)
//             setFooddetail(response.data);
//             setClose(true)
//           })
//           .catch(error => {
//             console.error('Error in searching:', error);
//           });
//         }else{
//               navigate('/SignIn')
//           }
// };

// //in fooddata close button works as | complete
// const onClose = () => {
//     setFooddetail({});
//     setClose(false);
//   };

// //to delete the saved recipe |complete 
// const handleRemove = async (recipe_id) => {
//   try {
//     const token = localStorage.getItem("accessToken");
//     const Query=localStorage.getItem("setQuery");
//     // Sending a DELETE request with data passed in the config
//     const response = await axios.delete('http://localhost:3081/api/recipes/unlike', {
//       headers: { Authorization: `Bearer ${token}` },
//       data: { id: recipe_id }, // Pass data for DELETE
//     });

//     console.log('Response:', response.data);
//     console.log('dele query: ',Query);

//     // Update state and fetch updated 
//     await FetchSavedRecipe();
//     await fetchSearch(Query);
//   } catch (error) {
//     if (error.response?.status === 403) {
//       console.log("403 detected; attempting to refresh token...");
//       await refreshToken();
//       await handleRemove(recipe_id); // Retry with refreshed token
//     } else {
//       console.error('Error while removing recipe:', error.response?.data || error.message);
//     }
//   }
// };


const handleLogout = () => {
    // setUserName(''); // Clear user name (or other user data)
    localStorage.clear();
    setLogged(false);
    navigate('/', { replace: true });
    window.location.reload();
  };


  const allValue = { 
//   fetchSearch, 
//   Favourite,
//   FetchSavedRecipe, 
//   Recipe, 
//   item, 
//   handleAdd, 
//   handleRemove, 
//   handleData, 
//   foodDetail, 
//   onClose,
//   close,
//   UserName,
//   handleprofile,
//   userProfile,
//   userDate,
//   userTime,
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
