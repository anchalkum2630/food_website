import prisma from '../config/prismaConfig.js';

export const getRecipes = async ({ isLoggedIn, userId, filters = {} }) => {
  const pageNum = Number(filters.page) || 1;
  const limitNum = Number(filters.limit) || 2;
  const query = filters.search?.toString().trim().toLowerCase() || '';
  const skip = (pageNum - 1) * limitNum;
  const whereClause = query
    ? {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          // { description: { contains: query, mode: 'insensitive' } },
          { ingredients: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {};

  if (!isLoggedIn) {
    const recipes = await prisma.Recipe.findMany({
      where: whereClause,
      skip,
      take: limitNum,
      orderBy: { id: 'asc' },
    });

    return recipes;
  }

  // For logged-in users, exclude saved recipes
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
    skip,
    take: limitNum,
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

