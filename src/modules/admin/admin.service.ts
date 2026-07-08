import { Status } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateUserStatusIntoDB = async (id: string, status: Status) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: { status },
  });
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await prisma.booking.findMany({
    include: {
      service: true,
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      technician: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

export const adminService = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllBookingsFromDB
};
