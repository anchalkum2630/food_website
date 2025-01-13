import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { IoMdLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
    const [sideNav, setSideNav] = useState(false);

    const handleChange = () => {
        setSideNav(!sideNav);
    };

    const handleLogout = () => {
        // Handle admin logout logic here
        console.log("Admin logged out");
    };

    return (
        <header className="fixed top-0 left-0 w-[100%] px-4 py-2 bg-gray-900 text-white shadow-md z-50">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="font-bold text-[20px]">
                    <p className="text-[25px]">
                        Yum<span className="text-blue-500">Food</span>
                        <span className="text-yellow-500 ml-2">
                            <FontAwesomeIcon icon={faUserShield} />
                        </span>
                    </p>
                </div>

                {/* Desktop Links */}
                <div className="hidden sm:flex items-center gap-6 text-lg">
                    <Link to="/admin/homepage">
                        <p className="hover:text-blue-500 text-[18px] font-semibold">Dashboard</p>
                    </Link>
                    <Link to="/admin/recipes">
                        <p className="hover:text-blue-500 text-[18px] font-semibold">Manage Recipes</p>
                    </Link>
                    <Link to="/admin/users">
                        <p className="hover:text-blue-500 text-[18px] font-semibold">Manage Users</p>
                    </Link>
                    <Link to="/admin/feedback">
                        <p className="hover:text-blue-500 text-[18px] font-semibold">Feedback</p>
                    </Link>
                    <Link to="/admin/complaints">
                        <p className="hover:text-blue-500 text-[18px] font-semibold">Complaints</p>
                    </Link>
                    <Link to="/admin/adminadd" className="text-[18px] font-semibold hover:text-blue-500">
                        Add Admin
                    </Link>
                </div>

                {/* User Profile and Logout */}
                <div className="flex gap-5 items-center">
                    <img
                        src="https://i.pinimg.com/736x/bc/c7/41/bcc7416a37b874426e201c2506056a1c.jpg"
                        alt="adminProfilePic"
                        className="w-12 h-12 rounded-full border mx-auto hidden sm:block"
                        title="Admin"
                    />
                    <IoMdLogOut
                        size={30}
                        className="cursor-pointer hidden sm:block"
                        onClick={handleLogout}
                        title="Logout"
                    />
                    {/* Hamburger Menu */}
                    <GiHamburgerMenu
                        size={30}
                        className="cursor-pointer sm:hidden"
                        onClick={handleChange}
                    />
                </div>
            </div>

            {/* Mobile Sidebar */}
            {sideNav && (
                <div className="fixed w-[50%] h-[100%] top-0 left-0 z-50 bg-gray-800">
                    <div className="bg-gray-900 w-full h-[40%] relative flex flex-col items-center py-10 text-white">
                        <RxCross1
                            size={30}
                            className="absolute top-3 right-3 cursor-pointer"
                            onClick={handleChange}
                        />
                        <ul className="flex flex-col gap-8 text-xl text-gray-200">
                            <Link to="/admin/dashboard" onClick={handleChange}>
                                <li className="hover:text-blue-500">Dashboard</li>
                            </Link>
                            <Link to="/admin/recipes" onClick={handleChange}>
                                <li className="hover:text-blue-500">Manage Recipes</li>
                            </Link>
                            <Link to="/admin/users" onClick={handleChange}>
                                <li className="hover:text-blue-500">Manage Users</li>
                            </Link>
                            <Link to="/admin/feedback" onClick={handleChange}>
                                <li className="hover:text-blue-500">Feedback</li>
                            </Link>
                            <Link to="/admin/complaints" onClick={handleChange}>
                                <li className="hover:text-blue-500">Complaints</li>
                            </Link>
                            <Link to="/admin/admin" onClick={handleChange}>
                                <li className="hover:text-blue-500">Add Admin</li>
                            </Link>
                            <li
                                className="hover:text-red-500 cursor-pointer"
                                onClick={() => {
                                    handleChange();
                                    handleLogout();
                                }}
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
};

export default AdminNavbar;
