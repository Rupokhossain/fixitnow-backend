import { Router } from "express";
import { technicianController } from "./technician.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma";

const router = Router();

router.put(
  "/technician/profile",
  auth(Role.TECHNICIAN),
  technicianController.updateMyProfile,
);

router.get(
  "/technician/bookings",
  auth(Role.TECHNICIAN),
  technicianController.getTechnicianBookings,
);

router.patch(
  "/technician/bookings/:id",
  auth(Role.TECHNICIAN),
  technicianController.updateBookingStatus,
);

router.get("/technicians", technicianController.getAllTechnicians);

router.get("/technicians/:id", technicianController.getSingleTechnician);

router.put(
  "/technician/availability",
  auth(Role.TECHNICIAN),
  technicianController.updateAvailability,
);

export const technicianRoutes = router;
