import bcrypt from "bcrypt";
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
  const { email, password } = req.body;
  const userDTO = { email, password };

  const access_token = await AuthService.signin(userDTO);

  if (access_token) {
    res.status(200).send({ access_token });
  } else {
    res.status(401).send({ message: "User not authenticated" });
  }
});

AuthController.post("/signup", async (req: Request, res: Response) => {
  const { email, username, password, repeatPassword } = req.body;

  // Vérification des champs
  switch (true) {
    case !email:
      res.status(400).send({ message: "Veuillez renseigner un email" });
      return;
    case !username:
      res.status(400).send({ message: "Veuillez renseigner un nom d'utilisateur" });
      return;
    case !password || !repeatPassword:
      res.status(400).send({ message: "Veuillez renseigner un mot de passe" });
      return;
  }

  // Vérification que les mots de passe correspondent
  if (password !== repeatPassword) {
    res.status(400).send({ message: "Les mots de passe ne correspondent pas." });
    return;
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const userDTO = { email, username, password: hashedPassword };
  
  const result = await AuthService.signup(userDTO);

  if (result) {
    res.status(201).send({ message: "User created" });
    console.log(result)
  } else {
    res.status(400).send({ message: "Cet email est déjà utilisé !" });
    console.log(result)
  }
});

AuthController.get("/verify", authMiddleware, async (req: Request, res: Response) => {
  res.status(200).send({ message: "Token valid" });
});

export default AuthController;