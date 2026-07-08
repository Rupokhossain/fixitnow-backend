import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All users retrieved successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await adminService.updateUserStatusIntoDB(
    id as string,
    status,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `User status updated to ${status} (Ban/Unban successful)`,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};
