import React, { useEffect, useState } from 'react';
import { useViewContext } from '../Context/Context_view';
import FoodData from '../FoodData';

const OurFood = () => {
  const {handleAdd,Recipe,fetchSearch,handleData,close,UserName}=useViewContext();
  const [searchFood,setsearchFood]=useState('');
  const handleSearch = (e) => {
    setsearchFood(e.target.value);
    // fetchSearch(e.target.value); // Fetch recipes based on search query
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      localStorage.setItem("setQuery",searchFood);
      fetchSearch(searchFood);  // Trigger search when Enter is pressed
    }
  };
  useEffect(() => {
    const savedQuery = localStorage.getItem('setQuery');
    if (savedQuery) {
      setsearchFood(savedQuery); // Set the search term in the state
      fetchSearch(savedQuery); // Trigger search for the saved query
    }
  }, []);

if (Recipe.length === 0) {
    return (
      <>
       <div className='flex justify-between w-[90%] mx-auto mt-20'>
          <h2 className='text-center text-green-700 text-3xl font-bold py-5'>Our Recipe</h2>
          <input
           type="text"
           value={searchFood}
           name="searchFood"
           className='block text-lg font-bold text-gray-700 mb-4 w-[30%] mt-4 rounded-3xl text-center border-blue-500 border-2 focus:ring-yellow-500 focus:outline-none focus:border-yellow-500 focus:border-2'
           placeholder='Search recipe'
           onChange={handleSearch}
           onKeyDown={handleKeyDown}
           />
        </div>
      <p className='w-[90%] mx-auto mt-44 mb-48 text-center text-3xl'>No recipes found.</p>
    </>
    )
  }

  return (
    <>
      <div className='w-[90%] m-auto mt-20'>
        <div className='flex justify-between'>
          <h2 className='text-center text-green-700 text-3xl font-bold py-5'>Our Recipe</h2>
          <input
           type="text"
           value={searchFood}
           name="searchFood"
           className='block text-lg font-bold text-gray-700 mb-4 w-[30%] mt-4 rounded-3xl text-center border-blue-500 border-2 focus:ring-yellow-500 focus:outline-none focus:border-yellow-500 focus:border-2'
           placeholder='Search recipe'
           onChange={handleSearch}
           onKeyDown={handleKeyDown}
           />
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Recipe.map((item) => (
            <div key={item.id} className='justify-center group'>
              <img src={item.image_url} alt={item.name} className='w-[90%] h-48 rounded-lg image-resize mx-auto transform transition-transform duration-300 group-hover:scale-110' />
              <div className='flex justify-center py-2 px-4 flex-col items-center'>
                <p className='text-[20px] line-clamp-1'>{item.name}</p>
                <p className='text-blue-500 mt-2' >{item.prep_time}in</p>                  
                <div className='flex'>
                  {UserName?<button className='bg-black w-[100px] text-white rounded-md my-6 mr-4 py-[10px] text-[15px] hover:text-yellow-500 ' onClick={()=>handleAdd(item.id)}>
                    CookBook
                  </button>:null}
                <button className='bg-black w-[100px] text-white rounded-md my-6 ml-4 py-[10px] text-[15px] hover:text-yellow-500' onClick={()=>handleData(item.id)}>
                    More
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {close && <FoodData/>}
      </div>
    </>
  );
};

export default OurFood;
