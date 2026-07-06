import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./modules/user/user.route";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { authRoutes } from "./modules/auth/auth.route";

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


app.use(globalErrorHandler)

export default app;
