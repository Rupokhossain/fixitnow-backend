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
