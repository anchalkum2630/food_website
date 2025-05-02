import prisma from '../config/prismaConfig.js';
import redisClient from '../config/redisConfig.js';

export const getRecipes = async ({ isLoggedIn, userId, filters = {} }) => {
  const { page = 1, limit = 20, query, cuisine, diet, course } = filters;
  const skip = (page - 1) * limit;

  const whereClause = {
    AND: [
      query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
              { ingredients: { contains: query, mode: 'insensitive' } },
            ],
          }
        : {},
      cuisine ? { cuisine: { equals: cuisine, mode: 'insensitive' } } : {},
      diet ? { diet: { equals: diet, mode: 'insensitive' } } : {},
      course ? { course: { equals: course, mode: 'insensitive' } } : {},
    ],
  };

  if (!isLoggedIn) {
    const cacheKey = `recipes:public:page:${page}:query:${query || ''}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const recipes = await prisma.recipe.findMany({
      where: whereClause,
      skip: Number(skip),
      take: Number(limit),
      orderBy: { id: 'asc' },
    });

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(recipes));
    return recipes;
  }

  const saved = await prisma.savedRecipe.findMany({
    where: { userId },
    select: { recipeId: true },
  });

  const savedIds = saved.map(r => r.recipeId);
  whereClause.AND.push({ id: { notIn: savedIds } });

  const recipes = await prisma.recipe.findMany({
    where: whereClause,
    skip: Number(skip),
    take: Number(limit),
    orderBy: { id: 'asc' },
  });

  return recipes;
};


export const getSavedRecipeById = async (userId, recipeId) => {
  const saved = await prisma.savedRecipe.findFirst({
    where: {
      userId,
      recipeId,
    },
  });

  if (!saved) return null;

  return prisma.recipe.findUnique({
    where: { id: recipeId },
  });
};

