import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma";


const router = Router();


router.get("/admin/users", auth(Role.ADMIN), adminController.getAllUsers)

router.patch("/admin/users/:id", auth(Role.ADMIN), adminController.updateUserStatus)

router.get("/admin/bookings", auth(Role.ADMIN), adminController.getAllBookings)

export const adminRoutes = router;