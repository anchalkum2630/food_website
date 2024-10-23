import React, { useEffect, useState } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Head = () => {
  const images = [
    {
      url: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"
    },
    {
      url: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
    },
    {
      url: "https://images.pexels.com/photos/5792329/pexels-photo-5792329.jpeg"
    }
  ];
  const [slider,setslider]=useState(0)
  
  const handleplus=()=>{
    setslider(slider === images.length - 1 ? 0 : slider + 1);
  }
  
  const handleminus=()=>{
    setslider(slider === 0 ? images.length - 1 : slider - 1);
  }

  useEffect(()=>{
    const sliderClear=setInterval(()=>{
      handleplus();
    },2000)
    return()=>clearInterval(sliderClear)
  },[slider])

  const [text] = useTypewriter({
    words: [
      'Tasty & Fresh Food',
      'Swaadisht & Fresh Khana',
      'Flavorful & Nutritious Meals',
      'Authentic & Paushtik Rasoi'
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000
  });

  return (
    <div className='mt-24 mx-auto '>
      <div className='w-[90%] mx-auto h-[80vh] relative bg-black opacity-50 rounded-2xl overflow-hidden' >
      {
        images.map((item, i) => (
          <div key={i} className={`${slider === i ? 'block' : 'hidden'}`}>
            <img src={item.url} alt="Delicious food" className='w-full h-[80vh] rounded-2xl object-cover' />
          </div>
        ))
      }
      </div>
      <p className='absolute top-[50%] left-0 right-0 text-center text-[25px] lg:text-[35px] w-full mx-auto font-bold text-black'>
        Welcome To The World Of <span className='text-black-500'>{text}</span>
        <Cursor cursorStyle='|' />
      </p>     
    </div>
  );
};

export default Head;
