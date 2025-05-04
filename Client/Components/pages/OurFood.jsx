import React, { useEffect, useState, useRef, useCallback } from 'react';
import instance from '../utils/axios';
import axios from 'axios';
import { useViewContext } from '../Context/Context_view';
import FoodData from '../FoodData';

const OurFood = () => {
  const {
    handleAdd,
    handleData,
    close,
    addedRecipes,
    setAddedRecipes,
    logged,
    token
  } = useViewContext();

  const [recipes, setRecipes] = useState([]);
  const [searchFood, setSearchFood] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const LIMIT = 8;
  const observer = useRef();

  const lastRecipeRef = useCallback(
    node => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchRecipes = async (pageNum = 1, search = '') => {
    setLoading(true);
    try {
      const endpoint = logged
        ? `http://localhost:5000/api/recipe/private?page=${pageNum}&search=${search}&limit=${LIMIT}`
        : `http://localhost:5000/api/recipe/public?page=${pageNum}&search=${search}&limit=${LIMIT}`;

      const res = await axios.get(endpoint, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

      const data = res.data.data || [];

      if (pageNum === 1) {
        setRecipes(data);
      } else {
        setRecipes(prev => [...prev, ...data]);
      }

      setHasMore(data.length === LIMIT);
    } catch (err) {
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('setQuery') || '';
    setSearchFood(savedQuery);
    setPage(1);
    setHasMore(true);
    fetchRecipes(1, savedQuery);
  }, [logged]);

  useEffect(() => {
    if (page > 1) {
      fetchRecipes(page, searchFood);
    }
  }, [page]);

  const handleSearchChange = e => setSearchFood(e.target.value);

  const handleSearchKeyDown = e => {
    if (e.key === 'Enter') {
      localStorage.setItem('setQuery', searchFood);
      setPage(1);
      setRecipes([]);
      setHasMore(true);
      fetchRecipes(1, searchFood);
    }
  };

  return (
    <div className='relative w-[90%] mx-auto'>
      {/* Search Bar */}
      <div className='fixed top-0 left-0 right-0 bg-[rgb(251,246,246)] z-50 p-6 mt-16'>
        <div className='flex justify-center items-center'>
          <input
            type='text'
            value={searchFood}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder='Search recipe'
            className='text-lg font-bold text-gray-700 w-[30%] rounded-3xl text-center border-blue-500 border-2 focus:ring-yellow-500 focus:outline-none focus:border-yellow-500'
          />
        </div>
      </div>

      {/* Recipe Grid */}
      <div className='pt-40 grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {!loading && recipes.length === 0 && (
          <p className='text-center col-span-full text-2xl'>No recipes found.</p>
        )}

        {recipes.map((item, index) => {
          const isLastItem = index === recipes.length - 1;
          const isAdded = addedRecipes.includes(item.id);

          return (
            <div
              key={`${item.id}-${index}`}
              ref={isLastItem ? lastRecipeRef : null}
              className='group'
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className='w-[90%] h-48 mx-auto rounded-lg transform transition-transform duration-300 group-hover:scale-110'
              />
              <div className='flex flex-col items-center py-2 px-4'>
                <p className='text-[20px] line-clamp-1'>{item.name}</p>
                <p className='text-blue-500 mt-2'>{item.prepTime}min</p>

                <div className='flex'>
                  {logged && (
                    <button
                      className={`bg-black w-[100px] rounded-md my-6 mr-4 py-[10px] text-[15px] ${
                        isAdded ? 'text-green-500' : 'text-white hover:text-yellow-500'
                      }`}
                      onClick={() => {
                        handleAdd(item.id);
                        if (!isAdded) {
                          setAddedRecipes(prev => [...prev, item.id]);
                        }
                      }}
                      disabled={isAdded}
                    >
                      {isAdded ? 'Added' : 'CookBook'}
                    </button>
                  )}

                  <button
                    className='bg-black w-[100px] text-white rounded-md my-6 ml-4 py-[10px] text-[15px] hover:text-yellow-500'
                    onClick={() => handleData(item.id)}
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <p className='text-center text-lg mt-10'>Loading...</p>}

      {close && <FoodData />}
    </div>
  );
};

export default OurFood;
