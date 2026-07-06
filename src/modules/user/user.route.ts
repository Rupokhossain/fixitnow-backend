import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma";


const router = Router();

router.post("/register", userController.registerUser);

router.get("/me", auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN), userController.getMyProfile);


export const userRoutes = router;