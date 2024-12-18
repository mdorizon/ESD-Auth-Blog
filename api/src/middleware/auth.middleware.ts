import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../routes/user/user.service";
dotenv.config();

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(404).send('Token not found');
    return;
  }

  // Extract token from header
  const tokenParts = token.split(" ");
  const access_token = tokenParts[1];

  // Vérifier si le token est valide
  jwt.verify(
    access_token,
    process.env.JWT_SECRET as string,
    async (err, decoded: any) => {
      // vérifier si le token a expiré
      
      if (!decoded?.exp || decoded.exp < Date.now() / 1000) {
        res.status(401).send('Token expired');
        return;
      }

      if (err) {
        res.status(401).send('Token invalid');
        return;
      }

      // Vérifier si l'utilisateur existe
      const user = await userService.getOneById(decoded.id);
      if (!user) {
        res.status(403).send('User not found');
        return;
      }

      (req as any).user = user;

      next();
    }
  );
};

export default authMiddleware;