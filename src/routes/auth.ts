import { NextFunction, Router } from "express";
import { handleLogin } from "../controllers/authController";

const router = Router();

router.post('/', handleLogin);

export default router;