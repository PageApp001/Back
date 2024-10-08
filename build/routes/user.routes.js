"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get("/user", user_controller_1.getUsers);
router.get("");
router.get("/user/:email", user_controller_1.getUserById);
router.post("/user/create", user_controller_1.createUser);
router.put("/user/update/:email", user_controller_1.updateUser);
router.delete("/user/delete/:email", user_controller_1.deleteUser);
router.post("/user/login", auth_controller_1.loginUser);
router.post("/user/register", auth_controller_1.registerUser);
exports.default = router;
