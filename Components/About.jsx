import React from 'react';
import FoodData from './FoodData';

const AboutUs = () => {
  return (
    <div className='mt-10'>
    <div className="w-full max-w-6xl mx-auto p-6 sm:p-8 lg:p-12 font-semibold">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-500 mb-4">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to our food app, your gateway to exploring the vibrant and diverse world of Indian cuisine. Our app is designed to deliver the rich flavors, aromas, and textures of traditional Indian food directly to your doorsteps, bringing an authentic taste of India to your everyday life.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <img
          src="https://images.unsplash.com/photo-1601972602288-3be527b4f18a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFwcCUyMGZvb2R8ZW58MHx8MHx8fDA%3D" // Replace with your image URL
          alt="Indian Cuisine"
          className="w-full max-w-lg rounded-lg object-cover"
        />
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-4">
            At YumFood, we are passionate about preserving and celebrating the culinary heritage of India. Our team of chefs and food enthusiasts meticulously curates and prepares every dish using authentic recipes, premium ingredients, and traditional cooking methods. From the spicy street food of Mumbai to the rich curries of Punjab, we bring a variety of regional dishes that showcase India's culinary diversity.
          </p>
          
          <p className="text-lg text-gray-700 mb-4">
            Our mission is to make high-quality Indian food accessible and enjoyable for everyone. We strive to offer an exceptional dining experience, whether you’re ordering for a quick lunch, planning a family dinner, or hosting a special event. Our user-friendly app ensures that you can easily explore our menu, customize your orders, and have your favorite dishes delivered right to your door with just a few clicks.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            We believe that food is not just sustenance; it's a celebration of culture, tradition, and community. That’s why we are committed to providing you with not only delicious meals but also a warm and memorable experience that connects you with the rich traditions of Indian cuisine.
          </p>
          <p className="text-lg text-gray-700">
            Thank you for choosing us to be a part of your culinary journey. We look forward to serving you and making every meal an extraordinary experience!
          </p>
        </div>
      </div>
    </div>
    <FoodData/>
    </div>
  );
};

export default AboutUs;
