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

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await services.getAllServicesFromDB(query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Services fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleServices = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    throw new Error(" Id Required In Params");
  }

  const result = await services.getSingleServiceFromDB(id as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single Service Retrived Successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const technicianId = req.user?.id;

  const payload = req.body;

  const result = await services.updateServiceIntoDB(
    id as string,
    technicianId as string,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service Updated Successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const technicianId = req.user?.id;

  await services.deleteServiceFromDB(id as string, technicianId as string);

    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service Deleted Successfully",
    data: null,
  });
});

export const serviceController = {
  createService,
  getAllServices,
  getSingleServices,
  updateService,
  deleteService
};
