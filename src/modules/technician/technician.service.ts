import { BookingStatus, Prisma } from "../../../generated/prisma";
import { prisma } from "../../lib/prisma";
import { ITechnician, ITechnicianQuery } from "./technician.interface";

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

const getTechnicianBookingsFromDB = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      technicianId: userId,
    },
    include: {
      service: {
        include: {
          category: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateBookingStatusIntoDB = async (
  bookingId: string,
  technicianId: string,
  status: BookingStatus,
) => {
  const booking = await prisma.booking.findFirst({
    where: {
      id: bookingId,
      technicianId: technicianId,
    },
  });

  if (!booking) {
    throw new Error("You are not authorized to update this booking status!");
  }

  const allowedStatus: BookingStatus[] = [
    BookingStatus.ACCEPTED,
    BookingStatus.DECLINED,
    BookingStatus.IN_PROGRESS,
    BookingStatus.COMPLETED,
  ];

  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid booking status");
  }

  if (booking.status === BookingStatus.COMPLETED) {
    throw new Error("Completed booking cannot be updated");
  }

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: status,
    },
  });
  return result;
};

const getAllTechniciansFromDB = async (query: ITechnicianQuery) => {
  const { searchTerm, location, page, limit } = query;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const skip = (currentPage - 1) * currentLimit;

  const andConditions: Prisma.UserWhereInput[] = [
    {
      role: "TECHNICIAN",
    },
  ];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        {
          technicianProfile: {
            skills: { contains: searchTerm, mode: "insensitive" },
          },
        },
      ],
    });
  }

  if (location) {
    andConditions.push({
      technicianProfile: {
        location: { contains: location, mode: "insensitive" },
      },
    });
  }

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: currentLimit,
    include: {
      technicianProfile: true,
    },
    omit: { password: true },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPage: Math.ceil(total / currentLimit),
    },
    data: result,
  };
};

const getSingleTechnicianFromDB = async (id: string) => {
  const result = await prisma.user.findFirstOrThrow({
    where: {
      id,
      role: "TECHNICIAN",
    },
    include: {
      technicianProfile: true,
      services: true,
      reviewsReceived: {
        include: {
          customer: true,
          service: true,
        },
      },
    },
    omit: { password: true },
  });
  return result;
};

const updateAvailabilityIntoDB = async (userId: string, availability: string) => {
  const result = await prisma.technicianProfile.update({
    where: { userId },
    data: { availability }
  });
  return result;
};

export const technicianService = {
  updateProfileIntoDB,
  getTechnicianBookingsFromDB,
  updateBookingStatusIntoDB,
  getAllTechniciansFromDB,
  getSingleTechnicianFromDB,
  updateAvailabilityIntoDB
};
