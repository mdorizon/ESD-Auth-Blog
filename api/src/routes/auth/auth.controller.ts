import { Request, Response, Router } from "express";
import AuthService from "./auth.service";
import authMiddleware from "../../middleware/auth.middleware";

const AuthController = Router();

AuthController.get("/", authMiddleware, async (req: Request, res: Response) => {
  const user_id = req.user?.id as number

  if (!user_id) {
    res.status(400);
    return;
  }

  const user = await AuthService.whoami(user_id);

  if (user) {
    res.status(200).send({ user });
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
});


AuthController.post("/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDTO = { username, password };

  const access_token = await AuthService.signin(userDTO);

  if (access_token) {
    res.status(200).send({ access_token });
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
});

AuthController.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userDTO = { username, password };
  
  const result = await AuthService.signup(userDTO);

  if (result) {
    res.status(201).send({ message: "User created" });
    console.log(result)
  } else {
    res.status(400).send({ message: "Username already used !" });
    console.log(result)
  }
});

export default AuthController;