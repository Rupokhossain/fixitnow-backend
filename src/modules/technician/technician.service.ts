import { BookingStatus } from "../../../generated/prisma";
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

export const technicianService = {
  updateProfileIntoDB,
  getTechnicianBookingsFromDB,
  updateBookingStatusIntoDB,
};
