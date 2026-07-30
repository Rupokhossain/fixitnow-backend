import { title } from "process";
import { Prisma, Role, Status } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";

interface IUserQuery {
  searchTerm?: string;
  role?: string;
  status?: string;
}

const getAllUsersFromDB = async (query: IUserQuery) => {
  const andConditions: Prisma.UserWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (query.role) {
    andConditions.push({
      role: query.role as Role,
    });
  }

  if (query.status) {
    andConditions.push({
      status: query.status as Status,
    });
  }

  const result = await prisma.user.findMany({
    where: {
      AND: andConditions,
    },
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

const updateUserStatusIntoDB = async (
  id: string,
  status: Status,
  currentUserId: string,
) => {
  if (id === currentUserId) {
    throw new Error("You cannot block your own account.");
  }

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
  getAllBookingsFromDB,
};
