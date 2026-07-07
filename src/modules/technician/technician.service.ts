import { prisma } from "../../lib/prisma";
import { ITechnician } from "./technician.interface";

const updateProfileIntoDB = async (userId: string, payload: ITechnician) => {
  const { bio, skills, experience, pricing } = payload;

  if (!bio) {
    throw new Error("Bio is required");
  }

  if (!skills) {
    throw new Error("Skills are required");
  }

  if (!experience) {
    throw new Error("Experience is required");
  }

  if (!pricing) {
    throw new Error("Pricing is required");
  }

  const result = await prisma.technicianProfile.upsert({
    where: {
      userId: userId,
    },
    update: payload,

    create: {
      ...payload,
      userId: userId,
    },
  });

  return result;
};

export const technicianService = {
  updateProfileIntoDB,
};
