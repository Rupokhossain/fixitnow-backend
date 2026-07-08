import { Router } from "express";
import { auth } from "../../middleware/auth";
import { serviceController } from "./service.controller";
import { Role } from "../../../generated/prisma";


const router = Router();

router.post("/services", auth(Role.TECHNICIAN), serviceController.createService)

router.get("/services", serviceController.getAllServices);

router.get("/services/:id", serviceController.getSingleServices)

router.patch("/services/:id", auth(Role.TECHNICIAN), serviceController.updateService);

router.delete("/services/:id", auth(Role.TECHNICIAN), serviceController.deleteService);

export const serviceRoutes = router;