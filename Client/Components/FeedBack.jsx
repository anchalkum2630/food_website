import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
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

// Data array containing card information
const data = [
  {
  image: 'https://plus.unsplash.com/premium_photo-1682089841647-458dd29dc0ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODl8fGluZGlhbiUyMGdpcmx8ZW58MHx8MHx8fDA%3D',
  title: 'Aaradhya',
  description: 'YumFood recipes have been a lifesaver! I made their paneer tikka for a party and everyone loved it. Super easy to follow and delicious!',
  linkText: 'Yum',
},
{
  image: 'https://plus.unsplash.com/premium_photo-1664910204655-114b5b1f0e69?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdXNld2lmZXxlbnwwfHwwfHx8MA%3D%3D',
  title: 'Saanvi',
  description: 'I made YumFood’s chicken biryani for a family dinner, and it was a huge hit. The step-by-step instructions were easy to follow, and the result was restaurant-quality!',
  linkText: 'Love',
},
{
  image: 'https://plus.unsplash.com/premium_photo-1661601616684-8b8a2939ce1a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGNoZWZ8ZW58MHx8MHx8fDA%3D',
  title: 'Ishita',
  description: 'I tried YumFood’s chocolate cake recipe for my daughter’s birthday, and it turned out amazing. The moistness and flavor were perfect!',
  linkText: 'Yum',
},
{
  image: 'https://images.unsplash.com/photo-1650116384974-a8e4ae69c884?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc1fHxpbmRpYW4lMjBnaXJsfGVufDB8fDB8fHww',
  title: 'Ananya',
  description: 'The butter chicken recipe from YumFood is now a staple in my kitchen. I love how simple it was to make, and it tasted divine!',
  linkText: 'Yum',
},
{
  image: 'https://images.unsplash.com/photo-1678855746382-15173a12fb38?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjkxfHxpbmRpYW4lMjBnaXJsfGVufDB8fDB8fHww',
  title: 'Diya',
  description: 'YumFood’s dal makhani recipe is my go-to for weekend lunches. The flavor is authentic, and it’s always a crowd-pleaser!',
  linkText: 'Love',
},
{
  image: 'https://plus.unsplash.com/premium_photo-1682089885175-3ce7ea1a1f64?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzE3fHxpbmRpYW4lMjBnaXJsfGVufDB8fDB8fHww',
  title: 'Mira',
  description: 'I followed YumFood’s rajma chawal recipe, and it was the most comforting meal I’ve made in a long time. Perfect for family dinners!',
  linkText: 'Yum',
},

];

// Card component to render individual card
const Card = ({ image, title, description, linkText }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4 h-[100%]">
    <div className="w-[90%] h-52 p-1 overflow-hidden"><img src={image} alt={title} className="w-full h-full mx-auto" /></div>
    <div className="p-6 h-48 overflow-y-auto">
      <p className="text-gray text-left" style={{ color: "blue" }}>{title}</p>
      <h3 className="text-xl text-left font-bold mt-2" style={{ color: "#2f2e0c" }}>{description}</h3>
      <a href="#" className="font-semibold text-left mt-4 underline block" style={{ color: "red" }}>
        {linkText}
      </a>
    </div>
  </div>
);

// Main CardView component
const FeedBack = () => {
  return (
    <div className="z-[-10] mt-16 mb-8"> {/* Adjusted margin-top for Navbar */}
      <div className="max-w-7xl mx-auto px-2 text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold mb-8" style={{ color: "#2f2e0c" }}>
          Trusted by millions of users around the world !
        </h2>

        {/* Slider Layout */}
        <div className="py-20 z-[-10] justify-center items-center">
          <Slider {...settings}>
            {data.map((item, index) => (
              <Card
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                linkText={item.linkText}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default FeedBack;