import { prisma } from "../../lib/prisma";
import { ICategory } from "./category.interface";

const createCategory = async (payload: ICategory) => {
  const { name, description } = payload;

  const isExist = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  if (isExist) {
    throw new Error("Category already exists");
  }

  if (!name) {
    throw new Error("Category name is required");
  }

  if (!description) {
    throw new Error("Category description is required");
  }

  const result = await prisma.category.create({
    data: {
      name,
      description,
    },
  });

  return result;
};

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return result;
};

export const categoryService = {
  createCategory,
  getAllCategories,
};
