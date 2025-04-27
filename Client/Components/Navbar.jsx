import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBowlRice } from '@fortawesome/free-solid-svg-icons';
import { useViewContext } from './Context/Context_view';
// import UserProfile from './pages/UserProfile';

const Navbar = () => {

    const {item,UserName,userProfile,FetchSavedRecipe,fetchSearch,handleprofile,handleLogout}=useViewContext();

    const [sideNav, setSideNav] = useState(false);
    
    const handleChange = () => {
        setSideNav(!sideNav);
    };
//     const handleClick = () => {  
//       fetchSearch();  // Trigger search when Enter is pressed   
//   };
// const Query=localStorage.getItem("setQuery");

    return (
        <header className="fixed top-0 left-0 w-[100%] px-4 py-2 bg-white border-red-800 shadow-md z-50">
            <div className="flex justify-between items-center">
                <div className="font-bold text-[20px]">
                    <p className='text-[25px]'>Yum<span className="text-green-700">Receipe <span className='text-yellow-500'><FontAwesomeIcon icon={faBowlRice} /></span></span></p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-lg">
                    <Link to="/">
                        <p className="hover:text-blue-500 text-[20px] font-bold">Home</p>
                    </Link>
                    <Link to="/About">
                        <p className="hover:text-blue-500 text-[20px] font-bold">About Us</p>
                    </Link>
                    <Link to="/OurFood">
                        <p className="hover:text-blue-500 text-[20px] font-bold" onClick={fetchSearch}>Our Recipe</p>
                    </Link>
                </div>
                <div className="flex gap-5 items-center">
                    {!UserName?(<Link to="/SignIn">
                        <p className="hidden sm:flex hover:text-blue-500 text-[20px] my-3 font-bold">Sign In</p>
                    </Link>) 
                    :
                    (<>
                    <Link to="/UserProfile">
                    <img src={userProfile.profile_pic||"https://i.pinimg.com/736x/bc/c7/41/bcc7416a37b874426e201c2506056a1c.jpg"} 
                    alt="profilePic" 
                    className='w-12 h-12 rounded-full border image-resize mx-auto'
                    title={UserName} onClick={()=>handleprofile()}/>
                    </Link>
                    <Link to="/viewReceipe">
                    <p className='absolute top-0 right-24 hidden sm:flex text-blue-500 font-bold'>{item}</p>
                      <FaBookOpen size={30} className='mx-5 hidden sm:flex' onClick={FetchSavedRecipe}/>
                    </Link>
                    <IoMdLogOut size={30} className="cursor-pointer hidden sm:block" onClick={handleLogout} />
                    </>)}
                    <GiHamburgerMenu size={30} className="cursor-pointer sm:hidden" onClick={handleChange} />
                </div>
            </div>
            

            {sideNav && (
                <div className="fixed w-[50%] h-[100%] top-0 left-0 z-50 bg-white ">
                    <div className="bg-white w-full h-[40%] relative flex flex-col items-center py-10 ">
                        <RxCross1 size={30} className="absolute top-3 right-3 cursor-pointer" onClick={handleChange} />
                        <ul className="flex flex-col gap-8 text-xl text-gray-700">
                            <Link to="/" onClick={handleChange}>
                                <li className="hover:text-blue-500">Home</li>
                            </Link>
                            <Link to="/About" onClick={handleChange}>
                                <li className="hover:text-blue-500">About Us</li>
                            </Link>
                            <Link to="/OurFood" onClick={handleChange}>
                                <li className="hover:text-blue-500">Our Recipe</li>
                            </Link>
                            {!UserName?(
                            <Link to="/SignIn" onClick={handleChange}>
                                <li className="hover:text-blue-500">Sign In</li>
                            </Link>):(<>
                            <Link to="/viewReceipe">
                               <FaBookOpen size={30} className='mx-5' title='Saved' onClick={FetchSavedRecipe}/>
                            </Link>
                            <IoMdLogOut size={30} className="cursor-pointer justify-center mx-5 " title='logout' onClick={handleLogout}  /></>)}
                        </ul>
                    </div>
                </div>
            )}
        </header>
        
    );
};

export default Navbar;
