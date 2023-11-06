import { Router } from "express";
import UserController from "./controller/UserController.js";
import PostController from "./controller/PostController.js";

const router = Router();

router.post("/user", UserController.createUser);
router.get("/users", UserController.findAllUsers);
router.get("/user/:id", UserController.findUser);
router.put("/user/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

router.post("/post/user/:id", PostController.createPost);

export { router };

