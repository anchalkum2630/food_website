// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Country, State, City } from "country-state-city";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaTransgender,
//   FaFlag,
//   FaCity,
//   FaHashtag,
//   FaCalendarAlt,
// } from "react-icons/fa";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     axios.get("/api/user/profile") // ✅ Replace with your actual endpoint
//       .then((res) => setUser(res.data))
//       .catch((err) => console.error("Failed to fetch user data", err));
//   }, []);

//   if (!user) return <div className="text-center mt-10">Loading...</div>;

//   const countryList = Country.getAllCountries();
//   const stateList = user.country ? State.getStatesOfCountry(user.country) : [];
//   const cityList =
//     user.country && user.addressState
//       ? City.getCitiesOfState(user.country, user.addressState)
//       : [];

//   const formattedDate = new Date(user.createdAt).toLocaleDateString();

//   const handleEdit = () => {
//     if (isEditing) {
//       // Save profile via PUT request
//       axios.put("/api/user/profile", user) // ✅ Replace with your backend endpoint
//         .then(() => alert("Profile updated successfully"))
//         .catch(() => alert("Error updating profile"));
//     }
//     setIsEditing((prev) => !prev);
//   };

//   const handleChange = (e, field) => {
//     const value = e.target.value;
//     setUser((prev) => ({ ...prev, [field]: value }));

//     if (field === "country") {
//       setUser((prev) => ({
//         ...prev,
//         addressState: "",
//         addressCity: "",
//         addressPincode: "",
//       }));
//     }
//     if (field === "addressState") {
//       setUser((prev) => ({
//         ...prev,
//         addressCity: "",
//         addressPincode: "",
//       }));
//     }
//     if (field === "addressCity") {
//       setUser((prev) => ({ ...prev, addressPincode: "" }));
//     }
//   };

//   const getDisplayValue = (field, value) => {
//     if (!value) return "Not provided";
//     if (field === "country") {
//       return Country.getCountryByCode(value)?.name || value;
//     }
//     if (field === "addressState") {
//       return stateList.find((s) => s.isoCode === value)?.name || value;
//     }
//     if (field === "addressCity") {
//       return cityList.find((c) => c.name === value)?.name || value;
//     }
//     return value;
//   };

//   const Detail = ({
//     label,
//     value,
//     Icon,
//     fieldName,
//     options = [],
//     editable,
//   }) => (
//     <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition duration-300 border border-green-100">
//       <div className="text-green-700 text-2xl mt-1">
//         <Icon />
//       </div>
//       <div className="w-full">
//         <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
//         {editable && options.length > 0 ? (
//           <select
//             value={value}
//             onChange={(e) => handleChange(e, fieldName)}
//             className="text-base font-semibold text-gray-800 border-2 border-gray-300 p-2 rounded-md w-full"
//           >
//             <option value="">Select {label}</option>
//             {options.map((opt) =>
//               typeof opt === "object" ? (
//                 <option key={opt.isoCode} value={opt.isoCode}>
//                   {opt.name}
//                 </option>
//               ) : (
//                 <option key={opt} value={opt}>
//                   {opt}
//                 </option>
//               )
//             )}
//           </select>
//         ) : editable ? (
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => handleChange(e, fieldName)}
//             className="text-base font-semibold text-gray-800 border-2 border-gray-300 p-2 rounded-md w-full"
//           />
//         ) : (
//           <p
//             className={`text-base font-semibold ${
//               value ? "text-gray-800" : "text-gray-400 italic"
//             }`}
//           >
//             {getDisplayValue(fieldName, value)}
//           </p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-tr flex items-center justify-center px-4 py-10 mt-10">
//       <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 overflow-hidden">
//         {/* Sidebar */}
//         <div className="bg-gradient-to-b from-green-700 to-emerald-600 p-10 flex flex-col items-center text-white">
//           <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-md">
//             <img
//               src={user.picUrl}
//               alt="Profile"
//               className="w-full h-86 object-cover"
//             />
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-center">{user.name}</h2>
//         </div>

//         {/* Info Section */}
//         <div className="col-span-2 p-10 bg-white space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-2xl font-bold text-green-700">Profile Details</h3>
//             <button
//               onClick={handleEdit}
//               className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
//             >
//               {isEditing ? "Save Profile" : "Edit Profile"}
//             </button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <Detail
//               label="Name"
//               value={user.name}
//               Icon={FaUser}
//               fieldName="name"
//               editable={isEditing}
//             />
//             <Detail
//               label="Email"
//               value={user.email}
//               Icon={FaEnvelope}
//               fieldName="email"
//               editable={false}
//             />
//             <Detail
//               label="Gender"
//               value={user.gender}
//               Icon={FaTransgender}
//               fieldName="gender"
//               options={["Male", "Female", "Other"]}
//               editable={isEditing}
//             />
//             <Detail
//               label="Phone Number"
//               value={user.phoneNo}
//               Icon={FaPhone}
//               fieldName="phoneNo"
//               editable={isEditing}
//             />
//             <Detail
//               label="Country"
//               value={user.country}
//               Icon={FaFlag}
//               fieldName="country"
//               options={countryList}
//               editable={isEditing}
//             />
//             <Detail
//               label="State"
//               value={user.addressState}
//               Icon={FaMapMarkerAlt}
//               fieldName="addressState"
//               options={stateList}
//               editable={isEditing}
//             />
//             <Detail
//               label="City"
//               value={user.addressCity}
//               Icon={FaCity}
//               fieldName="addressCity"
//               options={cityList}
//               editable={isEditing}
//             />
//             <Detail
//               label="Pincode"
//               value={user.addressPincode}
//               Icon={FaHashtag}
//               fieldName="addressPincode"
//               editable={isEditing}
//             />
//             <Detail
//               label="Address"
//               value={user.address}
//               Icon={FaMapMarkerAlt}
//               fieldName="address"
//               editable={isEditing}
//             />
//             <Detail
//               label="Joined On"
//               value={formattedDate}
//               Icon={FaCalendarAlt}
//               fieldName="createdAt"
//               editable={false}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;





import React, { useState, useEffect } from "react";
import instance from "../utils/axios.js"; // ✅ Update path as per your project
import { Country, State, City } from "country-state-city";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTransgender,
  FaFlag,
  FaCity,
  FaHashtag,
  FaCalendarAlt,
} from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Agar token Axios instance ke headers se aa raha hai, toh wahan se usse fetch karo
  const accessToken = instance.defaults.headers.common["Authorization"];

  // Log the token before making the request
  console.log("Access Token before sending request:", accessToken);
    instance.get("/api/customer/profile") // ✅ Uses custom Axios instance
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user data", err));
  }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  const countryList = Country.getAllCountries();
  const stateList = user.country ? State.getStatesOfCountry(user.country) : [];
  const cityList =
    user.country && user.addressState
      ? City.getCitiesOfState(user.country, user.addressState)
      : [];

  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  const handleEdit = () => {
    if (isEditing) {
      instance.put("/api/customer/profile", user) // ✅ Uses custom Axios instance
        .then(() => alert("Profile updated successfully"))
        .catch(() => alert("Error updating profile"));
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setUser((prev) => ({ ...prev, [field]: value }));

    if (field === "country") {
      setUser((prev) => ({
        ...prev,
        addressState: "",
        addressCity: "",
        addressPincode: "",
      }));
    }
    if (field === "addressState") {
      setUser((prev) => ({
        ...prev,
        addressCity: "",
        addressPincode: "",
      }));
    }
    if (field === "addressCity") {
      setUser((prev) => ({ ...prev, addressPincode: "" }));
    }
  };

  const getDisplayValue = (field, value) => {
    if (!value) return "Not provided";
    if (field === "country") {
      return Country.getCountryByCode(value)?.name || value;
    }
    if (field === "addressState") {
      return stateList.find((s) => s.isoCode === value)?.name || value;
    }
    if (field === "addressCity") {
      return cityList.find((c) => c.name === value)?.name || value;
    }
    return value;
  };

  const Detail = ({
    label,
    value,
    Icon,
    fieldName,
    options = [],
    editable,
  }) => (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition duration-300 border border-green-100">
      <div className="text-green-700 text-2xl mt-1">
        <Icon />
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
        {editable && options.length > 0 ? (
          <select
            value={value}
            onChange={(e) => handleChange(e, fieldName)}
            className="text-base font-semibold text-gray-800 border-2 border-gray-300 p-2 rounded-md w-full"
          >
            <option value="">Select {label}</option>
            {options.map((opt) =>
              typeof opt === "object" ? (
                <option key={opt.isoCode} value={opt.isoCode}>
                  {opt.name}
                </option>
              ) : (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              )
            )}
          </select>
        ) : editable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e, fieldName)}
            className="text-base font-semibold text-gray-800 border-2 border-gray-300 p-2 rounded-md w-full"
          />
        ) : (
          <p
            className={`text-base font-semibold ${
              value ? "text-gray-800" : "text-gray-400 italic"
            }`}
          >
            {getDisplayValue(fieldName, value)}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr flex items-center justify-center px-4 py-10 mt-10">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-green-700 to-emerald-600 p-10 flex flex-col items-center text-white">
          <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={user.picUrl}
              alt="Profile"
              className="w-full h-86 object-cover"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-center">{user.name}</h2>
        </div>

        {/* Info Section */}
        <div className="col-span-2 p-10 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-green-700">Profile Details</h3>
            <button
              onClick={handleEdit}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Detail label="Name" value={user.name} Icon={FaUser} fieldName="name" editable={isEditing} />
            <Detail label="Email" value={user.email} Icon={FaEnvelope} fieldName="email" editable={false} />
            <Detail label="Gender" value={user.gender} Icon={FaTransgender} fieldName="gender" options={["Male", "Female", "Other"]} editable={isEditing} />
            <Detail label="Phone Number" value={user.phoneNo} Icon={FaPhone} fieldName="phoneNo" editable={isEditing} />
            <Detail label="Country" value={user.country} Icon={FaFlag} fieldName="country" options={countryList} editable={isEditing} />
            <Detail label="State" value={user.addressState} Icon={FaMapMarkerAlt} fieldName="addressState" options={stateList} editable={isEditing} />
            <Detail label="City" value={user.addressCity} Icon={FaCity} fieldName="addressCity" options={cityList} editable={isEditing} />
            <Detail label="Pincode" value={user.addressPincode} Icon={FaHashtag} fieldName="addressPincode" editable={isEditing} />
            <Detail label="Address" value={user.address} Icon={FaMapMarkerAlt} fieldName="address" editable={isEditing} />
            <Detail label="Joined On" value={formattedDate} Icon={FaCalendarAlt} fieldName="createdAt" editable={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

