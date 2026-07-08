import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./modules/user/user.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { authRoutes } from "./modules/auth/auth.route";
import { categoryRoutes } from "./modules/category/category.route";
import { technicianRoutes } from "./modules/technician/technician.route";
import { serviceRoutes } from "./modules/service/service.routes";
import { bookingRoutes } from "./modules/booking/booking.route";

const app: Application = express();

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  }),
);


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


app.use("/api/auth", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", technicianRoutes);
app.use("/api", serviceRoutes);

app.use("/api", bookingRoutes);

app.use(globalErrorHandler)

export default app;
