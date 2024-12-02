import { Request, Response } from "express";
import client from "../../config/database.config";

const getAll = async(req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM public.user');

    res.status(200).send(result.rows);
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await client.query('SELECT * FROM public.user WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    res.status(200).send(result.rows[0]);
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const create = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    await client.query('INSERT INTO public.user (username, password, email) VALUES ($1, $2, $3)', [username, password, email]);

    res.status(200).send({ message: "User created successfully" });
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const update = async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = (await client.query('SELECT * FROM public.user WHERE id = $1', [id])).rows;

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

      const sqlUpdate = 'UPDATE public.user SET username=$1, password=$2, email=$3 WHERE id = $4';
      const values = [
        newUser.username, 
        newUser.password,
        newUser.email,
        id
      ]
      try {
        await client.query(sqlUpdate, values);
        res.status(200).send({ message: "User updated successfully" });
      } catch (e) {
        console.error('Update error:', e);
        res.status(500).send({ error: 'Error while modifying data' });
      }
    }
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const remove = async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = (await client.query('SELECT * FROM public.user WHERE id = $1', [id])).rows;
    if (Array.isArray(result) && result.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    };
    
    try {
      await client.query('DELETE FROM public.user WHERE id = $1', [id]);
      res.status(204).send();
    } catch (e) {
      console.error('Database error:', e);
      res.status(500).send({ error: 'Error while fetching data' });
    }
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

export default {
  getAll,
  getOne,
  create,
  update,
  remove
}