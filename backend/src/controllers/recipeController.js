import {
  getRecipes,
  getSavedRecipeById,
  saveRecipeForUser,
  deleteSavedRecipeForUser,
  getRecipeDetailsById
} from '../services/recipeService.js';

export const getPublicRecipes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const search = req.query.search || '';
  // console.log("page : ",page," limit : ",limit," search : ",search)

  try {
    const data = await getRecipes({ isLoggedIn: false, userId: null, filters: { page, limit, search } });

    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};


export const getPrivateRecipes = async (req, res) => {
  try {
    const { page = 1, limit = 2, search } = req.query; // Receive page and limit from query params
    const filters = { page, limit, search };
    const userId = req.user.id;

    // console.log("Filters Received:", filters); // Debugging to verify received filters

    const recipes = await getRecipes({ isLoggedIn: true, userId, filters });
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getSavedRecipeId = async (req, res) => {
  try {
    const userId = req.user.id;
    // const recipeId = parseInt(req.params.id);
    const recipe = await getSavedRecipeById(userId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found or not saved' });
    }
    res.status(200).json({ success: true, data: recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const saveRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;
    console.log(recipeId)

    if (!recipeId) {
      return res.status(400).json({ success: false, message: 'Recipe ID is required' });
    }

    const saved = await saveRecipeForUser(userId, recipeId);
    if (!saved) {
      return res.status(400).json({ success: false, message: 'Recipe already saved or does not exist' });
    }

    res.status(201).json({ success: true, message: 'Recipe saved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteSavedRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({ success: false, message: 'Recipe ID is required' });
    }

    const deleted = await deleteSavedRecipeForUser(userId, recipeId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Saved recipe not found' });
    }

    res.status(200).json({ success: true, message: 'Recipe removed from saved list' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// controllers/recipeController.js
export const getRecipeById = async (req, res) => {
  try {
    const recipeId = parseInt(req.query.recipeId);
    console.log(recipeId)
    if (!recipeId) {
      return res.status(400).json({ success: false, message: 'Missing recipeId in query' });
    }
    console.log(recipeId)
    const recipe = await getRecipeDetailsById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    res.status(200).json({ success: true, data: recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


