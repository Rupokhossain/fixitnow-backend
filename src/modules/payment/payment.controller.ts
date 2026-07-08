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

const handleWebhook = async (req: Request, res: Response) => {
  try {
    const payload = req.body as Buffer;
    const signature = req.headers["stripe-signature"] as string;

    await paymentServices.handleWebhook(payload, signature);

    return res.status(200).json({
      received: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json(err);
  }
};

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await paymentServices.getAllPaymentsFromDB(
    user?.id as string,
    user?.role as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment history retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await paymentServices.getSinglePaymentFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Payment details retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  createCheckoutSession,
  handleWebhook,
  getAllPayments,
  getSinglePayment,
};
