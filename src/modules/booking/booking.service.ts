import { prisma } from "../../lib/prisma";
import { IBookingRequest } from "./booking.interface";

const createBookingIntoDB = async (
  customerId: string,
  payload: IBookingRequest,
) => {
  const { serviceId, date, time } = payload;

  const serviceData = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId,
    },
  });

  if (serviceData.technicianId === customerId) {
    throw new Error("You can't book your own service");
  }

  const combinedDateTime = new Date(`${date} ${time}`);
  if (isNaN(combinedDateTime.getTime())) {
    throw new Error("Invalid Date or Time format!");
  }

  if (combinedDateTime < new Date()) {
    throw new Error("Please select a future date");
  }

  const result = await prisma.booking.create({
    data: {
      customerId: customerId,
      serviceId: payload.serviceId,
      technicianId: serviceData.technicianId,
      scheduledAt: combinedDateTime,
      status: "REQUESTED",
    },
  });

  return result;
};

const getCustomerBookingsFromDB = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      customerId: userId,
    },

    include: {
      service: {
        include: {
          category: true,
        },
      },
      technician: {
        select: {
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

const getSingleBookingFromDB = async (id: string) => {
  const result = await prisma.booking.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      service: true,
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      technician: {
        select: { name: true, email: true, technicianProfile: true },
      },
      payment: true,
    },
  });

  return result;
};

export const bookingService = {
  createBookingIntoDB,
  getCustomerBookingsFromDB,
  getSingleBookingFromDB,
};
