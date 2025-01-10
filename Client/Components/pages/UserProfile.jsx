import React from 'react';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { useViewContext } from '../Context/Context_view';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const {userProfile,userDate,userTime,UserName}=useViewContext();
  const navigate=useNavigate();
   if(!UserName){
      navigate('/')
   }

  return (
    
    <div className='bg-white'>
    <div className='flex pb-16'>
     <div className='flex mt-24 pt-10 lg:w-[50%] w-full flex-col sm:flex-row bg-white'>
      {/* Profile Image Section */}
      <div className="w-[100%] sm:w-[50%] p-5 flex sm:justify-end justify-center">
        <img
          src={userProfile.profile_pic||"https://i.pinimg.com/736x/bc/c7/41/bcc7416a37b874426e201c2506056a1c.jpg"}
          alt="profilePic"
          className="w-60 h-80 rounded-full border image-resize"
        />
      </div>

      {/* Profile Info Section */}
      <div className="w-[90%] sm:w-[50%] flex items-center sm:justify-start justify-center ml-12 ">
        <ul className="font-semibold text-justify space-y-2">
            <li>Name : {userProfile.name}</li>
            <li>Phone no : {userProfile.userid}</li>
            <li>Email : {userProfile.email}</li>
            <li>Gender : {userProfile.gender}</li>
            <li>Created Date : {userDate}</li>
            <li>Created Time : {userTime}</li>
             <button className='bg-black w-[100%] text-white rounded-md py-[10px] mt-11 text-[15px] hover:text-yellow-500'>
                   Edit Profile
             </button>
        </ul>      
      </div> 
    </div>
      <div className="mt-24 pt-10 w-[50%] h-50% hidden lg:block">
        <img
          src="https://t3.ftcdn.net/jpg/00/68/07/18/240_F_68071830_RxuE10B2g224wHv6SH3zLPBiBJuAAl6S.jpg"
          alt="profilePic"
          className="w-90% h-50% image-resize p-10"
        />
      </div>
    </div>
    {/* <div className="flex ml-80 pb-8">
        <button className='bg-black w-[20%] text-white rounded-md py-[10px] ml-11 text-[15px] hover:text-yellow-500'>
          Edit Profile
        </button>
      </div> */}
    </div>
  );
};

export default UserProfile;
