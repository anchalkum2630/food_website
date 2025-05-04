import React from 'react'
import {Food}from '../Data/Data'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useViewContext } from './Context/Context_view';
const FoodSlider = () => {
  const {handleAdd,favourites}=useViewContext();
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
      <div className='mx-auto my-4 w-[90%]'>
      <h2 className='font-bold text-3xl text-center'>What's On Your Mind?</h2>
      <div className='py-20 justify-center items-center'>
      <Slider {...settings}>
         {favourites.slice(0,13).map((item) => (
            <div key={item.id} className='justify-center px-2'>
              <img src={item.imageUrl} alt={item.name} className='w-full h-48 rounded-lg image-resize' />
              <div className='flex justify-center py-2 px-4 flex-col items-center'>
                <p className='text-[20px] line-clamp-1'>{item.name}</p>
                <p>{item.prep_time}</p>
                <button className='bg-black w-[100px] text-white rounded-md my-6 py-[10px] text-[15px] hover:text-yellow-500' onClick={()=>handleAdd(item.id)}>
                    Added
                </button>
              </div>
            </div>
          ))}
         </Slider>
        </div>
      </div>
    </>
  )
}

export default FoodSlider




