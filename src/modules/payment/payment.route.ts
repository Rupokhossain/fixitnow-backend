import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma";
import { paymentController } from "./payment.controller";

const router = Router();

router.post(
  "/create",
  auth(Role.CUSTOMER),
  paymentController.createCheckoutSession,
);

router.get(
  "/",
  auth(Role.ADMIN, Role.CUSTOMER),
  paymentController.getAllPayments,
);

router.get(
  "/:id",
  auth(Role.ADMIN, Role.CUSTOMER),
  paymentController.getSinglePayment,
);

export const paymentRoutes = router;
