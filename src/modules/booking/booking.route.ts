import { Router } from "express";
import { Role } from "../../../generated/prisma";
import { bookingController } from "./booking.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/bookings", auth(Role.CUSTOMER), bookingController.createBooking);

router.get("/bookings", auth(Role.CUSTOMER), bookingController.getCustomerBookings)

export const bookingRoutes = router;
