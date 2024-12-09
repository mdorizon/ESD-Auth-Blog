import { Router } from "express";
import PostService from "./post.service";
import authMiddleware from "../../middleware/auth.middleware";

const PostController = Router()

PostController.get("/", PostService.getAll);
PostController.get("/user", authMiddleware, PostService.getAllByUser);
PostController.get("/:id", PostService.getOne);
PostController.post("/", authMiddleware, PostService.create);
PostController.put("/:id", authMiddleware, PostService.update);
PostController.delete("/:id", authMiddleware, PostService.remove);

export default PostController;