import React, { useState } from 'react';

const AdminUsers = () => {
    // Sample data (Replace with API call in real use case)
    const initialUsers = [
        {
            id: 1,
            image: "https://via.placeholder.com/100",
            name: "John Doe",
            email: "johndoe@example.com",
            createdAt: "2023-01-15",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/100",
            name: "Jane Smith",
            email: "janesmith@example.com",
            createdAt: "2023-03-20",
        },
        {
            id: 3,
            image: "https://via.placeholder.com/100",
            name: "Robert Brown",
            email: "robertbrown@example.com",
            createdAt: "2023-05-10",
        },
        // Add more users here
    ];

    const [users, setUsers] = useState(initialUsers);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter users based on search input
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        console.log(`Deleted user with id: ${id}`);
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-16">
            {/* Search Box */}
            <div className="mb-8 flex justify-center items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search users by name"
                    className="w-full md:w-1/3 px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-300"
                />
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Created At</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-indigo-50 transition-colors duration-200">
                                    <td className="px-6 py-4">
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="w-16 h-16 object-cover rounded-full shadow-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.createdAt}</td>
                                    <td className="px-6 py-4 flex justify-center">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none transition-all duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
