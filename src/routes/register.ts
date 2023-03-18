import { Router } from "express";
import { handleNewUser } from "../controllers/registerController";

const router = Router();

router.post("/", handleNewUser);

export default router;