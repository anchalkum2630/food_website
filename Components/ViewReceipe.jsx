import React from 'react'
import { useViewContext } from './Context/Context_view';

const ViewReceipe = () => {
  const {handleRemove,Favourite}=useViewContext();
  if (!Favourite || Favourite.length === 0) {
    return <p className='w-[90%] mx-auto mt-44 mb-48 text-center text-3xl'>No recipes found.</p>;
  }
  return (
    <div className='w-[90%] mx-auto mt-20 mb-24'>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {Favourite.map((item) => (
            <div key={item.id} className='justify-center'>
              <img src={item.image_url} alt={item.name} className='w-full h-48 rounded-lg object-contain' />
              <div className='flex justify-center py-2 px-4 flex-col items-center'>
                <p className='text-[20px] line-clamp-2'>{item.name}</p>
                <p>{item.prep_time}</p>
                <button className='bg-black w-[100px] text-white rounded-md my-6 py-[10px] text-[15px] hover:text-yellow-500' onClick={()=>handleRemove(item.id)}>
                    Remove
                </button>
              </div>
            </div>
          ))}
    </div>
    </div>
  )
}

export default ViewReceipe
