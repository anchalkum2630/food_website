import {
  getRecipes,
  getSavedRecipeById
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
    const recipeId = parseInt(req.params.id);
    const recipe = await getSavedRecipeById(userId, recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found or not saved' });
    }
    res.status(200).json({ success: true, data: recipe });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
