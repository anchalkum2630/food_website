// FILE: routes/recipeRoutes.js
import express from 'express';
const router = express.Router();
import {getPublicRecipes,getPrivateRecipes,getSavedRecipeId,saveRecipe,deleteSavedRecipe,getRecipeById} from '../controllers/recipeController.js';
import { verifyAccessToken } from '../middlewares/verifyToken.js';

// Unified handlers that include filtering
router.get('/public',getPublicRecipes);
router.get('/private',verifyAccessToken,getPrivateRecipes); // user must be authenticated
router.get('/private/saved',verifyAccessToken,getSavedRecipeId);
router.post('/private/saved',verifyAccessToken,saveRecipe);
router.delete('/private/saved',verifyAccessToken,deleteSavedRecipe);
router.get('/details', getRecipeById);

export default router;
