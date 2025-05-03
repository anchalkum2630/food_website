import prisma from '../config/prismaConfig.js';
import redisClient from '../config/redisConfig.js';

export const getRecipes = async ({ isLoggedIn, userId, filters = {} }) => {
  const { page = 1, limit = 20, query } = filters;
  const skip = (page - 1) * limit;

  const whereClause = query
    ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { ingredients: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {};

  if (!isLoggedIn) {
    const cacheKey = `recipes:public:page:${page}:query:${query || ''}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const recipes = await prisma.Recipe.findMany({
      where: whereClause,
      skip: Number(skip),
      take: Number(limit),
      orderBy: { id: 'asc' },
    });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(recipes));
    return recipes;
  }

  const saved = await prisma.SavedRecipe.findMany({
    where: { userId },
    select: { recipeId: true },
  });

  const savedIds = saved.map(r => r.recipeId);

  const recipes = await prisma.Recipe.findMany({
    where: {
      ...whereClause,
      id: { notIn: savedIds },
    },
    skip: Number(skip),
    take: Number(limit),
    orderBy: { id: 'asc' },
  });

  return recipes;
};



export const getSavedRecipeById = async (userId) => {
  const saved = await prisma.SavedRecipe.findMany({
    where: { userId },
    select: { recipeId: true },
  });

  if (!saved.length) return [];

  const recipeIds = saved.map((s) => s.recipeId);

  return await prisma.Recipe.findMany({
    where: { id: { in: recipeIds } },
  });
};



export const saveRecipeForUser = async (userId, recipeId) => {
  // Check if recipe exists
  const recipe = await prisma.Recipe.findUnique({
    where: { id: recipeId },
  });

  if (!recipe) return null;

  // Check if already saved
  const alreadySaved = await prisma.SavedRecipe.findFirst({
    where: { userId, recipeId },
  });

  if (alreadySaved) return null;

  // Save it
  return await prisma.SavedRecipe.create({
    data: {
      userId,
      recipeId,
    },
  });
};


export const deleteSavedRecipeForUser = async (userId, recipeId) => {
  const saved = await prisma.SavedRecipe.findFirst({
    where: { userId, recipeId },
  });

  if (!saved) return null;

  return await prisma.SavedRecipe.delete({
    where: { id: saved.id },
  });
};

export const getRecipeDetailsById = async (recipeId) => {
  return await prisma.Recipe.findUnique({
    where: { id: recipeId },
  });
};

