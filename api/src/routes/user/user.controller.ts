import { Request, Response, Router } from "express";
import UserService from "./user.service";

const UserController = Router()

UserController.get("/", UserService.getAll);
UserController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserService.getOne(+id);
  if (!user) {
    res.status(404).send("User not found")
  }

  res.send(user);
});
UserController.post("/", UserService.create);
UserController.put("/:id", UserService.update);
UserController.delete("/:id", UserService.remove);

export default UserController;