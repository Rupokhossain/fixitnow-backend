import { Prisma } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { IService, IServiceQuery } from "./service.interface";


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

const getAllServicesFromDB = async (query: IServiceQuery) => {
  // pagination & sorting setup
  const currentPage = query.page ? Number(query.page) : 1;

  const currentLimit = query.limit ? Number(query.limit) : 10;

  const skip = (currentPage - 1) * currentLimit;

  const currentSortBy = query.sortBy ? query.sortBy : "createdAt";
  const currentSortOrder = query.sortOrder ? query.sortOrder : "desc";

  // search & match
  const { searchTerm, categoryId, minPrice, maxPrice, location } = query;

  const andConditions: Prisma.ServiceWhereInput[] = [];

  // searching
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // category filter
  if (categoryId) {
    andConditions.push({
      categoryId,
    });
  }

  // price range filter
  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        gte: minPrice ? parseFloat(minPrice) : undefined,
        lte: maxPrice ? parseFloat(maxPrice) : undefined,
      },
    });
  }

  // location filter
  if (location) {
    andConditions.push({
      technician: {
        technicianProfile: {
          location: {
            contains: query.location,
            mode: "insensitive",
          },
        },
      },
    });
  }

  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const services = await prisma.service.findMany({
    where: whereConditions,

    take: currentLimit,
    skip: skip,

    orderBy: {
      [currentSortBy]: currentSortOrder,
    },

    include: {
      category: true,
      technician: {
        include: {
          technicianProfile: true,
        },
        omit: {
          password: true,
        },
      },
    },
  });

  const total = await prisma.service.count({
    where: whereConditions,
  });

  return {
    data: services,
    meta: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPage: Math.ceil(total / currentLimit),
    },
  };
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await prisma.service.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      category: true,
      technician: {
        include: {
          technicianProfile: true,
        },
        omit: {
          password: true,
        },
      },
    },
  });
  return result;
};

const updateServiceIntoDB = async (
  id: string,
  technicianId: string,
  payload: Partial<IService>,
) => {
  const isOwnService = await prisma.service.findUnique({
    where: {
      id,
      technicianId: technicianId,
    },
  });

  if (!isOwnService) {
    throw new Error("You are not authorized to update this service!");
  }

  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteServiceFromDB = async(id: string, technicianId: string) => {
     const isOwnService = await prisma.service.findUnique({
    where: { 
      id,
      technicianId: technicianId 
    }
  });

  if (!isOwnService) {
    throw new Error("You are not authorized to delete this service!");
  }

  const result = await prisma.service.delete({
    where: {
        id
    }
  });
  return result
}

export const services = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB
};
