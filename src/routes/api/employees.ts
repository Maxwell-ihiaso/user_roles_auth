import { Router } from "express";
import  ROLES_LIST  from "../../config/roles_list";
import {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} from "../../controllers/employeesController";
import verifyRoles from "../../middleware/verifyRoles";

const router = Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.route("/:id").get(getEmployee);

export default router;