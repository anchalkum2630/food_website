import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../utils/axios';
import { useViewContext } from '../Context/Context_view.jsx';
import { FaWhatsapp } from 'react-icons/fa'; // Import the WhatsApp icon
import FoodData from '../FoodData';

const ViewReceipe = () => {
  const { close, handleData, logged, addedRecipes, setAddedRecipes, favourites, setFavourites } = useViewContext();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!logged) {
      navigate('/');
    }
  }, [logged, navigate]);

  // Fetch saved recipes
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await instance.get(`/api/recipe/private/saved`);
        setFavourites(res.data.data);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    };

    if (logged) {
      fetchFavourites();
    }
  }, [logged]);

  // Remove recipe
  const handleRemove = async (id) => {
    try {
      const res = await instance.delete('/api/recipe/private/saved', {
        data: { recipeId: id },
        withCredentials: true
      });
      console.log(res.data);

      // Update favourites
      setFavourites(prev => prev.filter(item => item.id !== id));

      // Also update addedRecipe from context
      setAddedRecipes(prev => prev.filter(recipeId => recipeId !== id));
    } catch (err) {
      console.error('Error removing recipe:', err);
    }
  };

  if (!favourites || favourites.length === 0) {
    return (
      <p className='w-[90%] mx-auto mt-44 mb-48 text-center text-3xl'>
        No recipes found.
      </p>
    );
  }

  const shareRecipeViaWhatsApp = (recipe) => {
    // const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : 'Ingredients not available';

    const message = `Check out this recipe!\n\n
    Name: ${recipe.name}\n
    Course: ${recipe.course}\n
    Cuisine: ${recipe.cuisine}\n
    Description: ${recipe.description}\n
    Ingredients: ${recipe.ingredients}\n
    Prep Time: ${recipe.prepTime}\n
    Diet: ${recipe.diet}\n\n
    Instructions: ${recipe.instruction}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className='w-[90%] mx-auto mt-24 mb-24'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-12'>
        {favourites.map((item) => (
          <div key={item.id} className='justify-center group'>
            <img
              src={item.imageUrl}
              alt={item.name}
              className='w-full h-48 rounded-lg image-resize transform transition-transform duration-300 group-hover:scale-110'
            />
            <div className='flex justify-center py-2 px-4 flex-col items-center'>
              <p className='text-[20px] line-clamp-1'>{item.name}</p>
              <p className='text-blue-500'>{item.prepTime}in</p>
              <div className='flex'>
                <button
                  className='bg-black w-[100px] text-white rounded-md my-6 py-[10px] text-[15px] hover:text-yellow-500'
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
                <button
                  className='bg-black w-[100px] text-white rounded-md my-6 ml-4 py-[10px] text-[15px] hover:text-yellow-500'
                  onClick={() => handleData(item.id)}
                >
                  More
                </button>
                <button
                  onClick={() => shareRecipeViaWhatsApp(item)}
                  className="bg-green-600 w-[100px] text-white rounded-md my-6 ml-4 py-[10px] text-[15px] flex items-center justify-center hover:text-yellow-500"
                >
                  <FaWhatsapp className="mr-2 text-xl" /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {close && <FoodData />}
    </div>
  );
};

export default ViewReceipe;
