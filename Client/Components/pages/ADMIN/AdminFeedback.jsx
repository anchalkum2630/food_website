import React, { useState } from 'react';

const AdminFeedback = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [feedbacks, setFeedbacks] = useState([
        {
            id: 1,
            userImage: 'https://via.placeholder.com/40',
            username: 'John Doe',
            feedback: 'Great product, I loved it! Would recommend to others.',
        },
        {
            id: 2,
            userImage: 'https://via.placeholder.com/40',
            username: 'Jane Smith',
            feedback: 'Good quality, but the delivery took longer than expected.',
        },
        {
            id: 3,
            userImage: 'https://via.placeholder.com/40',
            username: 'Sam Wilson',
            feedback: 'Amazing customer support and quick response.',
        },
        // Add more feedbacks here
    ]);

    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDelete = (id) => {
        const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
        setFeedbacks(updatedFeedbacks);
        console.log(`Deleted feedback with id: ${id}`);
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-16">
            {/* Admin Feedback Title */}
            {/* <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Admin Feedback</h2> */}

            {/* Search Box (Centered) */}
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search feedback by username"
                    className="w-2/3 sm:w-1/2 lg:w-1/3 px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
                />
            </div>

            {/* Feedback List */}
            <div className="space-y-6">
                {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map((feedback) => (
                        <div
                            key={feedback.id}
                            className="flex items-start bg-white shadow-xl rounded-lg p-6 space-x-4 transition transform hover:scale-105"
                        >
                            {/* Profile Picture and Username */}
                            <div className="flex-shrink-0">
                                <img
                                    src={feedback.userImage}
                                    alt={feedback.username}
                                    className="w-16 h-16 rounded-full object-cover shadow-md"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-lg font-semibold text-gray-800">{feedback.username}</div>
                                <p className="mt-2 text-gray-600">{feedback.feedback}</p>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(feedback.id)}
                                className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No feedback found</div>
                )}
            </div>
        </div>
    );
};

export default AdminFeedback;
