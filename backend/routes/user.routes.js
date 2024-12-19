import express from "express";
import { getUserForSidebar } from "../controllers/user.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";

const router = express.Router();

router.get("/", protectRoutes, getUserForSidebar);

export default router;
