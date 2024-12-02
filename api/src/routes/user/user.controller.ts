import { Router } from "express";
import UserService from "./user.service";

const UserController = Router()

UserController.get("/", UserService.getAll);
UserController.get("/:id", UserService.getOne);
UserController.post("/", UserService.create);
UserController.put("/:id", UserService.update);
UserController.delete("/:id", UserService.remove);

export default UserController;