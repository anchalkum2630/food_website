import React, { useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { useViewContext } from './Context/Context_view';

const Header = () => {

    const {item}=useViewContext();

    const [sideNav, setSideNav] = useState(false);
    
    const handleChange = () => {
        setSideNav(!sideNav);
    };

    return (
        <header className="fixed top-0 left-0 w-full px-4 py-4 bg-white shadow-md z-50">
            <div className="flex justify-between items-center">
                <div className="font-bold text-[20px]">
                    <p className='text-[25px]'>Yum<span className="text-blue-500">Receipe</span></p>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-lg">
                    <Link to="/">
                        <p className="hover:text-blue-500 text-[20px] font-bold">Home</p>
                    </Link>
                    <Link to="/About">
                        <p className="hover:text-blue-500 text-[20px] font-bold">About Us</p>
                    </Link>
                    <Link to="/OurFood">
                        <p className="hover:text-blue-500 text-[20px] font-bold">Our Recipe</p>
                    </Link>
                </div>
                <div className="flex gap-5 items-center">
                    <Link to="/SignIn">
                        <p className="hidden sm:flex hover:text-blue-500 text-[20px] font-bold">Sign In</p>
                    </Link>
                    <GiHamburgerMenu size={30} className="cursor-pointer sm:hidden" onClick={handleChange} />
                    <p className='absolute top-1 right-10'>{item}</p>
                    <Link to="/viewReceipe">
                      <FaBookOpen size={30} className='mx-5'/>
                    </Link>
                </div>
            </div>

            {sideNav && (
                <div className="inset-0 bg-gray-800 bg-opacity-75 z-40 flex items-center justify-center">
                    <div className="bg-white w-full max-w-xs h-full relative flex flex-col items-center pt-10">
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
                            <Link to="/SignIn" onClick={handleChange}>
                                <li className="hover:text-blue-500">Sign In</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
