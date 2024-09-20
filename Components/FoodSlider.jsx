import React from 'react'
import {Food}from '../Data/Data'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useViewContext } from './Context/Context_view';
const FoodSlider = () => {
  const {handleAdd,isInCart}=useViewContext();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:2000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className='w-[90%] mx-auto my-4'>
      <h2 className='font-bold text-3xl text-center'>What's On Your Mind?</h2>
      <div className='py-20 justify-center items-center'>
      <Slider {...settings}>
         {
            Food.map((item,i)=>(
               <div className='bg-[white] pt-8 h-[60vh] mx-auto' key={item.id}>
                  <div className=' flex justify-center items-center rounded-t-xl'>
                  <img src={item.image}
                   className='w-[30vh] h-[30vh] rounded-full object-cover'
                    alt=" food item "/>
                  </div>
                  <div className='flex flex-col justify-center items-center gap-2 p-4'>
                  <p className='text-[14px] font-semibold uppercase'>{item.name}</p>
                  <p className='text-[15px] font-semibold uppercase'>${item.calories.replace('kcal', '')}</p>
                  <button className=' bg-blue-500 w-[100px] text-white rounded-md my-6 py-[10px] text-[15px] font-bold hover:text-black' onClick={()=>handleAdd(item.id)}>
                   {isInCart(item.id) ? 'Added' : 'Add to cart'}
                  </button>
                  </div>
               </div>
            ))
         }
         </Slider>
        </div>
      </div>
    </>
  )
}

export default FoodSlider




