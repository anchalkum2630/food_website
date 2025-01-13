import React, { useState } from 'react';

const AdminAdd = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    // Handlers for input fields
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleGenderChange = (e) => setGender(e.target.value);
    const handleDateChange = (e) => setDateOfJoining(e.target.value);
    const handleProfilePicChange = (e) => setProfilePic(URL.createObjectURL(e.target.files[0]));

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!name || !email || !gender || !dateOfJoining || !profilePic) {
            alert('All fields are required!');
            return;
        }

        const newAdmin = {
            name,
            email,
            gender,
            dateOfJoining,
            profilePic,
        };

        console.log('New Admin Added:', newAdmin);
        alert('New admin added successfully!');
        
        // Clear the form
        setName('');
        setEmail('');
        setGender('');
        setDateOfJoining('');
        setProfilePic(null);
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Admin</h2>

            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="text-lg font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter full name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-lg font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                    <label className="text-lg font-medium text-gray-700">Gender</label>
                    <select
                        value={gender}
                        onChange={handleGenderChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Date of Joining */}
                <div className="space-y-2">
                    <label className="text-lg font-medium text-gray-700">Date of Joining</label>
                    <input
                        type="date"
                        value={dateOfJoining}
                        onChange={handleDateChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

                {/* Profile Picture */}
                <div className="space-y-2">
                    <label className="text-lg font-medium text-gray-700">Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    {profilePic && (
                        <div className="mt-4">
                            <img
                                src={profilePic}
                                alt="Profile Preview"
                                className="w-24 h-24 object-cover rounded-full border-2 border-indigo-600"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 px-8 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        Add Admin
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAdd;
