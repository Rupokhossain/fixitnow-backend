import { Router } from "express";
import { auth } from "../../middleware/auth";
import { serviceController } from "./service.controller";
import { Role } from "../../../generated/prisma";


const router = Router();

router.post("/services", auth(Role.TECHNICIAN), serviceController.createService)

export const serviceRoutes = router;