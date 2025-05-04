import React, { useState } from 'react';
import { ImCross } from "react-icons/im";
import { useViewContext } from './Context/Context_view';

// const item = [
//   {
//     "id": 1,
//     "name": "Thayir Semiya Recipe (Curd Semiya)",
//     "image_url": "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Raksha_Kamat/Thayir_Curd_Semiya_recipe_Yogurt_Vermicelli_South_indian_Lunch_recipe-4.jpg",
//     "description": "Thayir Semiya or Curd Vermicelli is a quick dish which you can make for lunch. If you are bored of eating curd rice every day, you can always make this Thayir Semiya or curd Semiya for a change. In South India, people consume curd every day.",
//     "cuisine": "Indian",
//     "course": "Lunch",
//     "diet": "Vegetarian",
//     "prep_time": "Total in 35 M",
//     "ingredients": "1/2 cup Semiya (Vermicelli), roasted\n1 cup Curd (Dahi / Yogurt)\nFor tempering:\n1 teaspoon Mustard seeds (Rai/ Kadugu)\n1/2 teaspoon White Urad Dal (Split)\nPinch Asafoetida (hing)\n1 sprig Curry leaves",
//     "instructions": "To begin making the Thayir Semiya recipe, firstly boil the vermicelli in 2 cups water. Drain it and spread on a colander. Pass cold water through it. This ensures that the vermicelli does not become sticky. Keep it aside and let it cool down. Heat a kadai/wok and add oil. Add the peanuts and roast till it turns brownish. Remove and keep it aside. In the same kadai, add more oil if needed and add the mustard seeds and after it splutters add the other ingredients meant for tempering. Add the boiled vermicelli and mix everything. Add salt to taste and mix. Finally just before serving, add curd and mix well. Serve Thayir Semiya on its own for a light and healthy lunch or dinner."
//   }
// ];

const FoodData = () => {
  const {close,foodDetail,onClose}=useViewContext();

  return (
    close && (
      <div className='fixed inset-0 flex justify-center backdrop-blur sm:bg-opacity-50 mt-10'>
        <div className='bg-white  p-4 opacity-100 w-[80%] max-w-3xl h-[80vh] overflow-hidden mt-20'>
          <div className='overflow-y-scroll scrollbar-hide h-full'>
            <div key={foodDetail.id} className='justify-center p-4'>
              <ImCross className='text-red-600 ml-auto cursor-pointer' onClick={onClose} />
              <img src={foodDetail.imageUrl} alt={foodDetail.name} className='sm:w-[50%] h-48 rounded-lg image-resize mx-auto' />
              <div className='flex justify-center py-2 px-4 flex-col items-center'>
                <p className='text-[20px]'><u>{foodDetail.name}</u></p>
                <p className='text-blue-500 mt-2'>{foodDetail.prepTime}in</p>
                <div className='flex justify-center'>
                  <p className='border border-black m-4 px-2'>{foodDetail.cuisine}</p>
                  <p className='border border-black m-4 px-2'>{foodDetail.course}</p>
                  <p className='border border-black m-4 px-2'>{foodDetail.diet}</p>
                </div>
                <p className='m-2'><b><u>Description</u></b></p>
                <p>{foodDetail.description}</p>
                <p className='m-2'><b><u>Ingredients</u></b></p>
                <p>{foodDetail.ingredients}</p>
                <p className='m-2'><b><u>Instructions</u></b></p>
                <p>{foodDetail.instruction}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default FoodData;
