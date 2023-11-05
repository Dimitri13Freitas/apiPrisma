import { Router } from "express";
import UserController from "./controller/UserController.js";

const router = Router();

router.post("/user", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/user/:id", UserController.findUser);

export { router };

