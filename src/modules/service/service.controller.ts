import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { services } from "./service.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createService = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const payload = req.body;

  const result = await services.createServiceIntoDB(
    user?.id as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service Created successfully",
    data: result,
  });
});


export const serviceController = {
    createService
}