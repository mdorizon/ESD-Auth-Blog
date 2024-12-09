import express from "express";
import UserController from "./routes/user/user.controller";
import logger from "./middleware/logger.middleware";
import AuthController from "./routes/auth/auth.controller";
import authMiddleware from "./middleware/auth.middleware";
import PostController from "./routes/post/post.controller";
import cors from "cors";
import { IUser } from "./routes/user/user.types";

const app = express();
const port = 8000;

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

app.use(express.json());
app.use(cors());

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", AuthController);
app.use("/users", UserController);
app.use("/posts", PostController)

app.get("/private", authMiddleware, (req, res) => {
  console.log("Get user with authMiddleware: ", req.user);
  res.send("Private route");
});

app.listen(port, () => {
  console.log(`Auth blog listening on port ${port}`);
});