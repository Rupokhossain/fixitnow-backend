import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";


const createCheckoutSession = catchAsync(
  async (req: Request, res: Response) => {
    const bookingId = req.body.bookingId;
    const user = req.user?.id;

    const result = await paymentServices.createCheckoutSession(
      bookingId as string,
      user as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Checkout session created successfully",
      data: result,
    });
  },
);


export const paymentController = {
  createCheckoutSession,
};