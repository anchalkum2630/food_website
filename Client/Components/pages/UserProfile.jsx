import React from 'react';

const UserProfile = () => {
  return (
    <div className='bg-white'>
    <div className='flex pb-16'>
     <div className='flex mt-24 pt-10 lg:w-[50%] w-full flex-col sm:flex-row bg-white'>
      {/* Profile Image Section */}
      <div className="w-[100%] sm:w-[50%] p-5 flex sm:justify-end justify-center">
        <img
          src="https://images.unsplash.com/photo-1464863979621-258859e62245?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdpcmwlMjBwcm9maWxlfGVufDB8fDB8fHww"
          alt="profilePic"
          className="w-60 h-80 rounded-full border image-resize"
        />
      </div>

      {/* Profile Info Section */}
      <div className="w-[90%] sm:w-[50%] flex items-center sm:justify-start justify-center ml-12 ">
        <ul className="font-semibold text-justify space-y-2">
          <li>Name: Anchal Kumari</li>
          <li>Phone no. : 1234567890</li>
          <li>Email : anchal@gmail.com</li>
          <li>Gender : Female</li>
          <li>Created : 12/12/2024</li>
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
