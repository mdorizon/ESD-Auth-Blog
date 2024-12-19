import { Request, Response, Router } from "express";
import UserService from "./user.service";
import authMiddleware from "../../middleware/auth.middleware";
import multer from "multer";
import path from "path";
import client from "../../config/database.config";

// Extensions autorisées
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

// Fonction de stockage avec validation d'extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../../public", "profiles"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      throw new Error("Invalid file type. Only jpg, jpeg, png, and webp are allowed.");
    }
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);  // Aucun problème ici, cb attend un nom de fichier
  }
});

// Configuration de multer avec la fonction de stockage
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de taille de fichier (10 Mo ici)
}).single("profile_picture");

const UserController = Router();

UserController.post("/upload-picture", upload, async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).send({ error: "No file uploaded" });
      return;
    }
    const profilePictureUrl = `http://localhost:8000/profiles/${req.file.filename}`;
    const userId = req.user?.id;

    const updateQuery = "UPDATE public.user SET profile_picture = $1 WHERE id = $2";
    await client.query(updateQuery, [profilePictureUrl, userId]);

    res.status(200).send({ message: "Profile picture updated successfully", profile_picture: profilePictureUrl });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).send({ error: "Failed to upload profile picture" });
  }
});

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