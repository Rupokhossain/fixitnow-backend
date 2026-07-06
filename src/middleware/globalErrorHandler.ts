import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma";
import httpStatus from "http-status";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode;
  let errorMessage = err.message || "Internal Server Error";

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields.";
  }

  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Duplicate key error.";
    }

    else if (err.code === "P2025") {
      statusCode = httpStatus.NOT_FOUND;
      errorMessage =
        "Required record was not found.";
    }
  }

  else if (err instanceof Prisma.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage =
        "Authentication failed against the database server.";
    }

    else if (err.errorCode === "P1001") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Can't reach database server.";
    }
  }

  else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution.";
  }

  res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    message: errorMessage,
    errorDetails: err.message,
  });
};