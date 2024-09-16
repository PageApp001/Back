import { Router } from "express";
import { isAdmin } from "../middlewares/verifyRole";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", isAdmin, getUsers);
router.get("/user/:email", isAdmin, getUserById);
router.post("/user/create", isAdmin, createUser);
router.put("/user/update/:email", isAdmin, updateUser);
router.delete("/user/delete/:email", isAdmin, deleteUser);

export default router;
