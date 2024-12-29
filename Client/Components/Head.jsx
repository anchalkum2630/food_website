import React, { useEffect, useState } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Head = () => {
  const images = [
    // {
    //   url:"https://i.pinimg.com/736x/2c/c1/56/2cc15671ae9156431d8bcc36468f0bf6.jpg"
    // },
    // {
    //   url: "https://i.pinimg.com/736x/2f/26/13/2f26132a6e685ea535ee4f2c04a56380.jpg"
    // },
    // {
    //   url: "https://i.pinimg.com/736x/9e/ef/71/9eef71b816eb87e65b64ae72aa4c014a.jpg"
    // },
    {
      url: "https://i.pinimg.com/736x/da/dc/64/dadc64c99d75fa17597ce8c1d043c9cc.jpg"
    },
    // {
    //   url:"https://i.pinimg.com/736x/ec/a2/a7/eca2a75df3cd648c87a978819b1f6fbc.jpg"
    // }
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
    },5000)
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
// bg-black opacity-50
  return (
    <div className='mt-16 mx-auto bg-black '>
      <div className='w-[100%] mx-auto h-[92vh] relative opacity-70 overflow-hidden' >
      {
        images.map((item, i) => (
          <div key={i} className={`${slider === i ? 'block' : 'hidden'}`}>
            <img src={item.url} alt="Delicious food" className='w-full h-[92vh]  image-resize' />
          </div>
        ))
      }
      </div>
      <p className='absolute top-[53%] left-0 right-0 text-center text-[25px] lg:text-[35px] w-full mx-auto font-bold text-white'>
        Welcome To The World Of <span className='text-black-500'>{text}</span>
        <Cursor cursorStyle='|' />
      </p>     
    </div>
  );
};

export default Head;
