import { Router } from "express";
import {
  getAllUsers,
  deleteUser,
  getUser,
} from "../../controllers/usersController";
import ROLES_LIST from "../../config/roles_list";
import verifyRoles from "../../middleware/verifyRoles";

const router = Router();

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

export default router;