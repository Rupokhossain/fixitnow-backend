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

export const technicianRoutes = router;
