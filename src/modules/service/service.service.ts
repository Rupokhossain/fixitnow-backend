import { prisma } from "../../lib/prisma";
import { IService } from "./service.interface";

const createServiceIntoDB = async (technicianId: string, payload: IService) => {
  const profile = await prisma.technicianProfile.findUnique({
    where: {
      userId: technicianId,
    },
  });

  if (!profile) {
    throw new Error("Please create your technician profile first");
  }

  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianId: technicianId,
    },
  });

  return result;
};

export const services = {
  createServiceIntoDB,
};
