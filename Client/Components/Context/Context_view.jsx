import React, { createContext, useContext, useState,useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
// Create context
const viewContext = createContext();

// Custom hook to use the context
const useViewContext = () => useContext(viewContext);

const ViewProvider = ({ children }) => {
  
  const [count, setCount] = useState(0);
  const [Recipe,setRecipe]=useState([]); // for all recipe to show in or recipe
  const [Favourite,setFavourite]=useState([]);//for all liked recipe
  const [userProfile,setUserProfile]=useState([]);//for userprofile detail
  const [userDate,setUserDate]=useState(null);//for userprofile date
  const [userTime,setUserTime]=useState(null);//for userprofile Time
  const [item,setItem] =useState(0);//number of recipe in favourite
  const [searchUrl,setsearchUrl] =useState('http://localhost:3081/api/recipes');
  const [foodDetail,setFooddetail]=useState({});
  const [close, setClose] = useState(false);
  const [UserName,setUserName]=useState('');
  const [UserPhone,setUserPhone]=useState('');
   const fetchSearch=(query)=>{
    console.log(UserPhone)
      if(UserPhone){
        // console.log(UserPhone)
        if(query){
          console.log("happy1")
          setsearchUrl(`http://localhost:3081/api/recipes/UserSearch/${query}?UserPhone=${UserPhone}`)
         }
         else{
          console.log("happy2")
          setsearchUrl(`http://localhost:3081/api/recipes/UserSearch/?UserPhone=${UserPhone}`)
         }
      }else{
        if(query){
          console.log("happy3")
          setsearchUrl(`http://localhost:3081/api/recipes/search/${query}`)
         }
         else{
          console.log("happy4")
          setsearchUrl('http://localhost:3081/api/recipes')
         }
      }
         
         setCount(prevCount => prevCount + 1);
    }

  //to show all the recipe in ourrecipe
  useEffect(() => {
  // Create an array to hold the promises
  console.log("calling first api for food data");
  const promises = [
    // Fetch all unliked recipes  
    axios.get(searchUrl)
  ];

  // Conditionally add the liked recipes request if UserPhone exists
  if (UserPhone) {
    console.log("calling first api for viewrecipe");
    promises.push(axios.get(`http://localhost:3081/api/recipes/liked?UserPhone=${UserPhone}`));
  }

  // Execute all promises using Promise.all
  Promise.all(promises)
    .then(([response_first, response_second]) => {
      // Set recipes from the first response
      setRecipe(response_first.data);
      console.log(response_first.data);
      
      // Handle the second response (liked recipes) if it exists
      if (response_second) {
        const { count: number_item, data: recipe_data } = response_second.data;
        setItem(number_item); // Update the count of liked recipes
        setFavourite(recipe_data); // Update the liked recipes
      }
    })
    .catch((error) => {
      console.error('Error fetching recipes:', error);
    });
}, [UserPhone,count]);

//function for to find detail of user
const handleprofile = async (UserPhone) => {
  console.log(UserPhone);

  // Ensure UserPhone has a valid value
  if (!UserPhone) {
    console.error('UserPhone is required');
    return;
  }

  try {
    // Make the function asynchronous and await the axios call
    const response = await axios.get('http://localhost:3081/api/userprofile', {
      params: { UserPhone: UserPhone },
    });

    console.log('Response:', response.data);

    // Check if response data is in the expected format
    if (response.data) {
      setUserProfile(response.data); // Update the state
      // console.log('Updated UserProfile:', response.data);
      const createdAt = new Date(response.data.created_at);
      if (isNaN(createdAt.getTime())) {
      console.error("Invalid date:", userProfile.created_at);
      // return <div>Error: Invalid date</div>;
      }
     const formattedDate = format(createdAt, 'dd-MM-yyyy');
     setUserDate(formattedDate)
     const formattedTime = format(createdAt, 'HH:mm');
     setUserTime(formattedTime)
     console.log("date and time : ",createdAt.getTime())
     console.log("formatteddate : ",formattedDate)
     console.log("formatteddate : ",formattedTime)
     } else {
       console.error('Invalid response format');
     }
  } catch (error) {
    // Handle errors
    console.error('Error fetching user profile:', error.response?.data || error.message);
  }
};


  // Function to handle adding items to the cart
const handleAdd = (id) => {
  if (!UserPhone) {
    console.error('UserPhone is required');
    return;
  }
  console.log(UserPhone+id)
  axios
    .post('http://localhost:3081/api/recipes/addlike', {
      id: id,
      UserPhone: UserPhone, // Ensure UserPhone has a valid value
    })
    .then((response) => {
      console.log('Response:', response.data);
      setCount((prevCount) => prevCount + 1); // Update count only on success
    })
    .catch((error) => {
      console.error('Error:', error.response?.data || error.message);
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
  axios
    .delete(`http://localhost:3081/api/recipes/unlike/${id}/${UserPhone}`)
    .then(response => {
      console.log('Recipe unsaved : ', response.data);
      setCount(prevCount => prevCount - 1);
    })
    .catch(error => {
      console.error('Error unsaved : ', error);
    });
};

const handleLogout = () => {
  setUserName('');
  // navigate('/')
}

  const allValue = { 
  fetchSearch, 
  Favourite, 
  Recipe, 
  item, 
  handleAdd, 
  handleRemove, 
  handleData, 
  foodDetail, 
  onClose,
  close,
  UserName,
  setUserName,
  UserPhone,
  setUserPhone,
  handleprofile,
  userProfile,
  userDate,
  userTime,
  handleLogout};

  return (
    <viewContext.Provider value={allValue}>
      {children}
    </viewContext.Provider>
  );
};

export { ViewProvider, viewContext, useViewContext };
