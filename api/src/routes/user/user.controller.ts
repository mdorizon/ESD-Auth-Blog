import { Request, Response, Router } from "express";
import UserService from "./user.service";
import authMiddleware from "../../middleware/auth.middleware";

const UserController = Router();

UserController.get("/", UserService.getAll);
UserController.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const userDTO = { email, username, password };
  const user = await UserService.create(userDTO);

  res.status(201).send(user);
});
UserController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getOneById(+id);
  if (!user) {
    res.status(404).send("User not found");
  }

  res.send(user);
});
UserController.put("/", authMiddleware, UserService.update);
UserController.delete("/:id", authMiddleware, UserService.remove);

export default UserController;