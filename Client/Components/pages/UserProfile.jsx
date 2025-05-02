import React, { useState, useEffect } from "react";
import instance from "../utils/axios";
import { Country, State, City } from "country-state-city";
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaTransgender, FaFlag, FaCity, FaHashtag, FaCalendarAlt
} from "react-icons/fa";

// Reusable Detail component to render individual fields
const Detail = ({ label, value, Icon, fieldName, options = [], editable, onChange, error }) => {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-white shadow-lg border border-green-100">
      <div className="text-green-700 text-2xl mt-1">
        <Icon />
      </div>
      <div className="w-full">
        <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
        {editable && options.length > 0 ? (
          <select
            value={value || ""}
            onChange={(e) => onChange(e, fieldName)}
            className={`text-base font-semibold text-gray-800 border-2 p-2 rounded-md w-full ${error ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select {label}</option>
            {options.map(opt =>
              typeof opt === "object" ? (
                <option key={opt.isoCode} value={opt.isoCode}>{opt.name}</option>
              ) : (
                <option key={opt} value={opt}>{opt}</option>
              )
            )}
          </select>
        ) : editable ? (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e, fieldName)}
            className={`text-base font-semibold text-gray-800 border-2 p-2 rounded-md w-full ${error ? "border-red-500" : "border-gray-300"}`}
          />
        ) : (
          <p className="text-base font-semibold text-gray-800">{value || "Not provided"}</p>
        )}
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    instance.get("/api/customer/profile")
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user data", err));
  }, []);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  const countryList = Country.getAllCountries();
  const stateList = user.country ? State.getStatesOfCountry(user.country) : [];
  const cityList = user.country && user.addressState ? City.getCitiesOfState(user.country, user.addressState) : [];

  const formattedDate = new Date(user.createdAt).toLocaleDateString();

  const validateFields = () => {
  const newErrors = {};

  if (user.name && user.name.length < 3)
    newErrors.name = "Name must be at least 3 characters.";

  if (user.phoneNo && !/^\d{10}$/.test(user.phoneNo))
    newErrors.phoneNo = "Enter a valid 10-digit phone number.";

  if (user.address && user.address.length < 5)
    newErrors.address = "Address must be at least 5 characters.";

  if (user.addressPincode && !/^\d{5,10}$/.test(user.addressPincode))
    newErrors.addressPincode = "Enter a valid pincode.";

  // Optional: If you want to enforce dependencies
  if (user.addressCity && (!user.country || !user.addressState)) {
    newErrors.addressCity = "Select Country and State first.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleEdit = () => {
    if (isEditing) {
      if (validateFields()) {
        instance.put("/api/customer/profile", user)
          .then(() => {
            alert("Profile updated successfully");
            setIsEditing(false);
          })
          .catch(() => alert("Error updating profile"));
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setUser(prev => ({ ...prev, [fieldName]: value }));
    setErrors(prev => ({ ...prev, [fieldName]: "" })); // clear error on change
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr flex items-center justify-center px-4 py-10 mt-10">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-6xl w-full grid grid-cols-1 md:grid-cols-3">
        <div className="bg-gradient-to-b from-green-700 to-emerald-600 p-10 flex flex-col items-center text-white rounded-3xl">
          <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img src={user.picUrl} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-center">{user.name}</h2>
        </div>

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
            <Detail label="Name" value={user.name} Icon={FaUser} fieldName="name" editable={isEditing} onChange={handleChange} error={errors.name} />
            <Detail label="Email" value={user.email} Icon={FaEnvelope} fieldName="email" editable={false} />
            <Detail label="Gender" value={user.gender} Icon={FaTransgender} fieldName="gender" options={["MALE", "FEMALE", "OTHER"]} editable={isEditing} onChange={handleChange} error={errors.gender} />
            <Detail label="Phone Number" value={user.phoneNo} Icon={FaPhone} fieldName="phoneNo" editable={isEditing} onChange={handleChange} error={errors.phoneNo} />
            <Detail label="Country" value={user.country} Icon={FaFlag} fieldName="country" options={countryList} editable={isEditing} onChange={handleChange} error={errors.country} />
            <Detail label="State" value={user.addressState} Icon={FaMapMarkerAlt} fieldName="addressState" options={stateList} editable={isEditing} onChange={handleChange} error={errors.addressState} />
            <Detail label="City" value={user.addressCity} Icon={FaCity} fieldName="addressCity" options={cityList} editable={isEditing} onChange={handleChange} error={errors.addressCity} />
            <Detail label="Pincode" value={user.addressPincode} Icon={FaHashtag} fieldName="addressPincode" editable={isEditing} onChange={handleChange} error={errors.addressPincode} />
            <Detail label="Address" value={user.address} Icon={FaMapMarkerAlt} fieldName="address" editable={isEditing} onChange={handleChange} error={errors.address} />
            <Detail label="Joined On" value={formattedDate} Icon={FaCalendarAlt} fieldName="createdAt" editable={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
