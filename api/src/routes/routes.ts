import express, {Response} from "express";
import cors from "cors";
import LoggerService from "../middleware/logger.middleware"
import UserController from "../users/users.controller";
import PostController from "../posts/posts.controller";

const app = express();
const port = 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(LoggerService)

app.use("/users", UserController);

app.use("/posts", PostController);


app.get("/", (res: Response) => {
  res.send("Hello !");
});

app.listen(port, () => {
  console.log(`AuthBlog listening on port ${port}`);
});