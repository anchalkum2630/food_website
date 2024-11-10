import React from 'react'
import { useViewContext } from './Context/Context_view';
import FoodData from './FoodData';

const ViewReceipe = () => {
  const {handleRemove,Favourite,close,handleData}=useViewContext();
  if (!Favourite || Favourite.length === 0) {
    return <p className='w-[90%] mx-auto mt-44 mb-48 text-center text-3xl'>No recipes found.</p>;
  }
  return (
    <div className='w-[90%] mx-auto mt-24 mb-24'>
    <center><h1 className='text-[24px] text-yellow-500 font-bold mb-8'><u>CookBook</u></h1></center>
      <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
      {Favourite.map((item) => (
            <div key={item.id} className='justify-center group'>
              <img src={item.image_url} alt={item.name} className='w-full h-48 rounded-lg image-resize transform transition-transform duration-300 group-hover:scale-110' onClick={()=>handleData(item.id)} />
              <div className='flex justify-center py-2 px-4 flex-col items-center'>
                <p className='text-[20px] line-clamp-1'>{item.name}</p>
                <p className='text-blue-500'>{item.prep_time}in</p>
                <button className='bg-black w-[100px] text-white rounded-md my-6 py-[10px] text-[15px] hover:text-yellow-500' onClick={()=>handleRemove(item.id)}>
                    Remove
                </button>
              </div>
            </div>
          ))}
    </div>
    {close && <FoodData/>}
    </div>
  )
}

export default ViewReceipe
