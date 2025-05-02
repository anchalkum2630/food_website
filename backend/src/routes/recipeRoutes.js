// FILE: routes/recipeRoutes.js
import express from 'express';
const router = express.Router();
import {getPublicRecipes,getPrivateRecipes,getSavedRecipeId} from '../controllers/recipeController.js';
import { verifyAccessToken } from '../middlewares/verifyToken.js';

// Unified handlers that include filtering
router.get('/public',getPublicRecipes);
router.get('/private',verifyAccessToken,getPrivateRecipes); // user must be authenticated
router.get('/private/saved/:id',verifyAccessToken,getSavedRecipeId);

export default router;
