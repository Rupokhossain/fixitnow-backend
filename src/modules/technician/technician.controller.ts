import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { technicianService } from "./technician.service";
import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const payload = req.body;

  const result = await technicianService.updateProfileIntoDB(
    user?.id as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Technician profile updated successfully",
    data: result,
  });
});

const getTechnicianBookings = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await technicianService.getTechnicianBookingsFromDB(
      user?.id as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician bookings retrieved successfully",
      data: result,
    });
  },
);

export const technicianController = {
  updateMyProfile,
  getTechnicianBookings
};
