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

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { status } = req.body;

  const user = req.user;

  const result = await technicianService.updateBookingStatusIntoDB(
    id as string,
    user?.id as string,
    status,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Booking status updated to ${status}`,
    data: result,
  });
});

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await technicianService.getAllTechniciansFromDB(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Technicians fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTechnician = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await technicianService.getSingleTechnicianFromDB(
    id as string,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Technician profile retrieved successfully",
    data: result,
  });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { availability } = req.body;

  const result = await technicianService.updateAvailabilityIntoDB(
    user?.id as string,
    availability,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability updated successfully",
    data: result,
  });
});

export const technicianController = {
  updateMyProfile,
  getTechnicianBookings,
  updateBookingStatus,
  getAllTechnicians,
  getSingleTechnician,
  updateAvailability
};
