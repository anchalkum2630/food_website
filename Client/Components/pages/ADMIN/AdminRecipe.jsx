import React, { useState, useEffect } from 'react';

const AdminRecipe = () => {
    // Sample data (Replace with API call in real use case)
    const initialRecipes = [
        {
            id: 1,
            image: "https://via.placeholder.com/100",
            name: "Spaghetti Carbonara",
            preparationTime: "20 min",
            cuisine: "Italian",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/100",
            name: "Chicken Curry",
            preparationTime: "45 min",
            cuisine: "Indian",
        },
        {
            id: 3,
            image: "https://via.placeholder.com/100",
            name: "Sushi Rolls",
            preparationTime: "30 min",
            cuisine: "Japanese",
        },
        // Add more recipes here
    ];

    const [recipes, setRecipes] = useState(initialRecipes);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter recipes based on search input
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleEdit = (id) => {
        console.log(`Editing recipe with id: ${id}`);
        // Implement edit functionality
    };

    const handleDelete = (id) => {
        const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
        setRecipes(updatedRecipes);
        console.log(`Deleted recipe with id: ${id}`);
    };

    return (
        <div className="container mx-auto px-6 py-8 mt-16">
            {/* Search Box and Add Recipe Button */}
            <div className="mb-6 flex justify-between items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search recipes by name"
                    className="w-full md:w-1/2 px-6 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
                />
                <button
                    onClick={() => console.log('Add new recipe')}
                    className="ml-4 bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                >
                    Add New Recipe
                </button>
            </div>

            {/* Recipe Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Preparation Time</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Cuisine</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe) => (
                                <tr key={recipe.id} className="border-b hover:bg-indigo-50 transition-all duration-200">
                                    <td className="px-6 py-4">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.name}
                                            className="w-16 h-16 object-cover rounded-md shadow-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-gray-700 font-medium">{recipe.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{recipe.preparationTime}</td>
                                    <td className="px-6 py-4 text-gray-600">{recipe.cuisine}</td>
                                    <td className="px-6 py-4 flex space-x-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(recipe.id)}
                                            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none transition duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(recipe.id)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 focus:outline-none transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No recipes found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminRecipe;
