import { prisma } from "../../lib/prisma";
import { IReviewRequest } from "./review.interface";

const createReviewIntoDB = async (
  customerId: string,
  payload: IReviewRequest,
) => {
  const { bookingId, rating, comment } = payload;

  const booking = await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
      customerId: customerId,
    },
  });

  if (booking.status !== "COMPLETED") {
    throw new Error(
      "You can only provide a review after the service is completed!",
    );
  }

  const isAlreadyReviewed = await prisma.review.findFirst({
    where: {
      customerId,
      serviceId: booking.serviceId,
    },
  });

  

  if (isAlreadyReviewed) {
    throw new Error("You have already reviewed this service!");
  }

  const result = await prisma.review.create({
    data: {
      rating,
      comment,
      customerId,
      serviceId: booking.serviceId as string,
      technicianId: booking.technicianId as string,
      bookingId: booking.id,
    },
  });

  return result;
};

const getAllReviewsFromDB = async () => {
  return await prisma.review.findMany({
    include: {
      customer: { select: { name: true } },
      service: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const reviewService = {
  createReviewIntoDB,
  getAllReviewsFromDB,
};
