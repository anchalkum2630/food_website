import {
  getRecipes,
  getSavedRecipeById,
  saveRecipeForUser,
  deleteSavedRecipeForUser,
  getRecipeDetailsById
} from '../services/recipeService.js';

export const getPublicRecipes = async (req, res) => {
  try {
    const filters = req.query;
    const recipes = await getRecipes({ isLoggedIn: false, filters });
    res.status(200).json({ success: true, data: recipes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPrivateRecipes = async (req, res) => {
  try {
    const filters = req.query;
    const userId = req.user.id;
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
    if (!recipeId) {
      return res.status(400).json({ success: false, message: 'Missing recipeId in query' });
    }

    const recipe = await getRecipeDetailsById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    res.status(200).json({ success: true, data: recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


