import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Delivery = () => {

useEffect(() => {
    AOS.init({
      duration:3000, // Duration of animations (in milliseconds)
      once:false,
      offset:240 // Animation only happens once
    });
  }, []);

  return (
    <>
        <div className='pt-8'>
          <h2 className='font-bold text-3xl text-center pb-8'>Why Us?</h2>
         <div className='flex flex-col lg:flex-row justify-between m-auto p-8'>
            <div className='lg:w-[50%] object-cover my-auto' data-aos="fade-up"><img src="https://images.unsplash.com/photo-1495546968767-f0573cca821e?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='rounded-full'/></div>
         <div data-aos="fade-down" className='lg:w-[50%] text-blue-700 list-disc list-inside p-2 md:font-semibold my-auto text-justify text-2xl'>
           Our app not only helps you discover a variety of delicious recipes but also offers the option to have a professional chef prepare your meal for you. Whether you're in the mood to explore new dishes or prefer the convenience of having a chef cook in your kitchen, we've got you covered.Browse through our extensive collection of recipes, follow easy step-by-step instructions, or, with just a few taps, book a chef to create the perfect meal at your home. We personalize both your cooking and dining experience, ensuring your needs, tastes, and dietary preferences are always met. Enjoy the best of both worlds—cook at home or sit back and let a chef take care of it!
         </div>
         </div>
        </div>
    </>
  )
}

export default Delivery
