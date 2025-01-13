import React, { useState } from 'react';

const AdminComplaint = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            userImage: 'https://via.placeholder.com/40',
            username: 'John Doe',
            complaint: 'The product arrived damaged, I want a refund.',
            resolved: false,
        },
        {
            id: 2,
            userImage: 'https://via.placeholder.com/40',
            username: 'Jane Smith',
            complaint: 'The delivery was delayed and I missed an important event.',
            resolved: false,
        },
        {
            id: 3,
            userImage: 'https://via.placeholder.com/40',
            username: 'Sam Wilson',
            complaint: 'Customer support was unresponsive when I needed help.',
            resolved: true,
        },
        // Add more complaints here
    ]);

    const filteredComplaints = complaints.filter(complaint =>
        complaint.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleResolve = (id) => {
        const updatedComplaints = complaints.map(complaint =>
            complaint.id === id ? { ...complaint, resolved: true } : complaint
        );
        setComplaints(updatedComplaints);
        console.log(`Resolved complaint with id: ${id}`);
    };

    const handleUnresolve = (id) => {
        const updatedComplaints = complaints.map(complaint =>
            complaint.id === id ? { ...complaint, resolved: false } : complaint
        );
        setComplaints(updatedComplaints);
        console.log(`Unresolved complaint with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Confirm deletion before proceeding
        if (window.confirm("Are you sure you want to delete this complaint?")) {
            const updatedComplaints = complaints.filter(complaint => complaint.id !== id);
            setComplaints(updatedComplaints);
            console.log(`Deleted complaint with id: ${id}`);
        }
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-16">
            {/* Admin Complaint Title */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin Complaints</h2>

            {/* Search Box (Centered) */}
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search complaints by username"
                    className="w-2/3 sm:w-1/2 lg:w-1/3 px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
                />
            </div>

            {/* Complaint List */}
            <div className="space-y-6">
                {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((complaint) => (
                        <div
                            key={complaint.id}
                            className={`flex items-start bg-white shadow-xl rounded-lg p-6 space-x-4 transition transform hover:scale-105 ${
                                complaint.resolved ? 'bg-green-100' : ''
                            }`}
                        >
                            {/* Profile Picture and Username */}
                            <div className="flex-shrink-0">
                                <img
                                    src={complaint.userImage}
                                    alt={complaint.username}
                                    className="w-16 h-16 rounded-full object-cover shadow-md"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-lg font-semibold text-gray-800">{complaint.username}</div>
                                <p className="mt-2 text-gray-600">{complaint.complaint}</p>
                                
                                {/* Resolved Tag */}
                                {complaint.resolved && (
                                    <div className="text-sm text-green-500 font-semibold mt-2">Resolved</div>
                                )}
                            </div>

                            {/* Resolve and Unresolve Buttons */}
                            <div className="flex flex-col items-center space-y-2">
                                {!complaint.resolved ? (
                                    <button
                                        onClick={() => handleResolve(complaint.id)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                                    >
                                        Resolve
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleUnresolve(complaint.id)}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
                                    >
                                        Unresolve
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(complaint.id)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No complaints found</div>
                )}
            </div>
        </div>
    );
};

export default AdminComplaint;
