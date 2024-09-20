import React, { useEffect, useState } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { GiFastBackwardButton,GiFastForwardButton } from "react-icons/gi";
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
    //   if(slider<2){
    //     setslider(slider+1)
    //   }else{
    //     setslider(0)
    //   }
    setslider(slider===images.length-1?0:slider+1)

  }
  const handleminus=()=>{
    // if(slider>0){
    //     setslider(slider-1)
    // }else{
    //     setslider(2)
    // }
    setslider(slider===0?images.length-1:slider-1)
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
    <div className='mt-24'>
      <div className='w-[90%] mx-auto h-[80vh] my-5 relative  bg-black opacity-50 rounded-2xl' >
      {
        images.map((item,i)=>(
            <div key={i} className={`${slider === i?'block':'hidden'}`}>
              <img src={item.url} alt="Delicious food" className='w-full h-[80vh] rounded-2xl object-cover'/>
           </div>
        ))
      }
      </div>
      {/* <div className='w-[90%] mx-auto h-[80vh] my-5 bg-black opacity-50 absolute top-0 rounded-2xl'></div> */}
      <p className='absolute top-[50%] left-[20%] right-[50%] text-center text-[25px] lg:text-[35px] w-[70%] mx-auto font-bold text-black'>
         Welcome To The World Of <span className='text-black-500'>{text}</span>
         <Cursor cursorStyle='|' />
      </p>
      <div className='flex justify-between w-full px-10 absolute top-[50%] text-black'>
        <GiFastBackwardButton size={30} className='cursor-pointer' onClick={handleminus}/>
        <GiFastForwardButton size={30} className='cursor-pointer' onClick={handleplus}/>
      </div>
     
    </div>
    
  );
};

export default Head;
