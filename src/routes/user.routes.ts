import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";
import { loginUser, registerUser } from "../controllers/auth.controller";

const router = Router();

router.get("/user", getUsers);
router.get("");
router.get("/user/:email", getUserById);
router.post("/user/create", createUser);
router.put("/user/update/:email", updateUser);
router.delete("/user/delete/:email", deleteUser);

router.post("/user/login", loginUser);
router.post("/user/register", registerUser);

export default router;
