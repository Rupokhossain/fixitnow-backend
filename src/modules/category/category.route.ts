import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma";


const router = Router();

router.post("/admin/categories", auth(Role.ADMIN), categoryController.createController);
router.get("/categories", categoryController.getAllCategories);
router.post("/admin/categories", auth(Role.ADMIN), categoryController.getAllCategories)

export const categoryRoutes = router;