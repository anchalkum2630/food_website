import React from 'react'
import { useViewContext } from './Context/Context_view';

const ViewReceipe = () => {
  const {item,handleRemove}=useViewContext();
  if (!item || item.length === 0) {
    return <p className='w-[90%] mx-auto mt-44 mb-48 text-center text-3xl'>No recipes found.</p>;
  }
  return (
    <div className='w-[90%] mx-auto mt-20 mb-24'>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {
        item.map((elem) => (
          <div key={elem.id} className='justify-center'>
            <img src={elem.image} alt={elem.name} className='w-[100%] rounded object-cover' />
            <div className='flex justify-center py-2 px-4 flex-col items-center'>
              <p className='text-[15px]'>{elem.name}</p>
              {/* <p>${elem.calories.replace('kcal', '')}</p> */}
              <button className='bg-[red] w-[100px] text-white rounded-md my-6 py-[10px] text-[15px] hover:text-yellow-500' onClick={()=>handleRemove(elem.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default ViewReceipe
