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

export const paymentRoutes = router;