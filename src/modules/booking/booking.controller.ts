import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const payload = req.body;

  const result = await bookingService.createBookingIntoDB(
    user?.id as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking requested successfully",
    data: result,
  });
});

const getCustomerBookings = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await bookingService.getCustomerBookingsFromDB(
    user?.id as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Customer bookings retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getCustomerBookings,
};
