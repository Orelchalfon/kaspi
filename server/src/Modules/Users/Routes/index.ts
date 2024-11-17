import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
  deactivateUser,
} from "../../../Modules/Users/Controllers";
const UsersRouter = Router();

UsersRouter.get("/", getAllUsers)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/:id", getUserById)
  .put("/:id", updateUser)
  .delete("/:id", deactivateUser);
export default UsersRouter;
