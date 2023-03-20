import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

const router = Router();

router.get("/", handleRefreshToken);

export default router;
