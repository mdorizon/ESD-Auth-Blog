import bcrypt from "bcrypt";
import { Request, Response } from "express";
import client from "../../config/database.config";
import { IUser, SignupIUserDTO } from "./user.types";

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT id, username, email FROM public.user");
    res.status(200).send(result.rows); // Exclusion du mot de passe
  } catch (e) {
    console.error("Database error:", e);
    res.status(500).send({ error: "Error while fetching data" });
  }
};

const getOneByEmail = async (email: string): Promise<IUser | null> => {
  const query = "SELECT * FROM public.user WHERE email = $1";
  const values = [email];

  const result = await client.query(query, values);
  const user = result.rows[0];

  if (!user) {
    return null;
  }

  return user;
};

const getOneById = async (id: number): Promise<Partial<IUser> | null> => {
  const query = "SELECT id, username, email, profile_picture FROM public.user WHERE id = $1"; // Exclusion du mot de passe
  const values = [id];

  try {
    const result = await client.query(query, values);
    const user = result.rows[0];
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

const create = async (userDTO: SignupIUserDTO) => {
  const query = "INSERT INTO public.user (username, password, email) VALUES ($1, $2, $3)";
  const values = [userDTO.username, userDTO.password, userDTO.email];

  try {
    await client.query(query, values);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.user?.id;
  try {
    const result = (await client.query("SELECT * FROM public.user WHERE id = $1", [id])).rows;

    if (Array.isArray(result) && result.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    if (Array.isArray(result) && result.length === 1) {
      const currentUser = result[0];
      const newUser = {
        ...currentUser,
        ...req.body,
      };

      const sqlUpdate =
        "UPDATE public.user SET username=$1, email=$2, profile_picture=$3 WHERE id = $4";
      const values = [
        newUser.username,
        newUser.email,
        newUser.profile_picture,
        id,
      ];
      try {
        await client.query(sqlUpdate, values);
        res.status(200).send({ message: "User updated successfully" });
      } catch (e) {
        console.error("Update error:", e);
        res.status(500).send({ error: "Error while modifying data" });
      }
    }
  } catch (e) {
    console.error("Database error:", e);
    res.status(500).send({ error: "Error while fetching data" });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = (await client.query("SELECT * FROM public.user WHERE id = $1", [id])).rows;
    if (Array.isArray(result) && result.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    try {
      await client.query("DELETE FROM public.user WHERE id = $1", [id]);
      res.status(204).send();
    } catch (e) {
      console.error("Database error:", e);
      res.status(500).send({ error: "Error while fetching data" });
    }
  } catch (e) {
    console.error("Database error:", e);
    res.status(500).send({ error: "Error while fetching data" });
  }
};

export default {
  getAll,
  getOneById,
  create,
  update,
  remove,
  getOneByEmail,
};