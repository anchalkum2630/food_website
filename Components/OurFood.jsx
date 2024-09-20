import React from 'react';
import { Food } from '../Data/Data';
import { useViewContext } from './Context/Context_view';

const OurFood = () => {
  const {handleAdd,isInCart}=useViewContext();
  
  return (
    <>
      <div className='w-[90%] mx-auto mt-20'>
        <div className='flex justify-between'>
          <h2 className='text-center text-yellow-500 text-3xl font-bold py-5'>Our Recipe</h2>
          <input
           type="text"
           id="searchFood"
           name="searchFood"
           className='block text-lg font-bold text-gray-700 mb-4 w-[30%] mt-4 rounded-3xl text-center border-blue-500 border-2 focus:ring-yellow-500 focus:outline-none focus:border-yellow-500 focus:border-2'
           placeholder='Search'

           />
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Food.map((item) => (
            <div key={item.id} className='justify-center'>
              <img src={item.image} alt={item.name} className='w-[100%] rounded object-cover' />
              <div className='flex justify-center py-2 px-4 flex-col items-center'>
                <p className='text-[20px]'>{item.name}</p>
                <p>${item.calories.replace('kcal','')}</p>
                <button className='bg-black w-[100px] text-white rounded-md my-6 py-[10px] text-[15px] hover:text-yellow-500' onClick={()=>handleAdd(item.id)}>
                    {isInCart(item.id) ? 'Added' : 'Add to cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurFood;
