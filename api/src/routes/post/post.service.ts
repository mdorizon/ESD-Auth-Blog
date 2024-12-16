import { Request, Response } from "express";
import client from "../../config/database.config";

const getAll = async(req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM public.post');

    res.status(200).send(result.rows);
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const getAllByUser = async(req: Request, res: Response) => {
  const user_id = req.user?.id

  try {
    const result = await client.query('SELECT * FROM public.post where user_id = $1', [user_id]);

    res.status(200).send(result.rows);
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const getOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await client.query('SELECT * FROM public.post WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    }

    res.status(200).send(result.rows[0]);
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const create = async (req: Request, res: Response) => {
  const user_id = req.user?.id
  const { title, content, image_path } = req.body;

  try {
    const result = await client.query('SELECT * FROM public.user WHERE id = $1', [user_id]);

    if (result.rows.length === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    try {
      const result = await client.query('INSERT INTO public.post (user_id, title, content, image_path) VALUES ($1, $2, $3, $4) RETURNING id', [user_id, title, content, image_path]);

      res.status(200).send({ message: "Post created successfully", id: result.rows[0].id });
    } catch (e) {
      console.error('Database error:', e);
      res.status(500).send({ error: 'Error while fetching data' });
    }
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

const update = async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = (await client.query('SELECT * FROM public.post WHERE id = $1', [id])).rows;

    if (Array.isArray(result) && result.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    }
    
    // si l'user n'est pas le créateur du post il ne peux pas modifier (plus tard faire en sorte que les admins bypass ceci !)
    if (result[0].user_id !== req.user?.id) {
      res.status(401).send({ error: "You do not have the permission to modify this post !" });
      return;
    }

    if (Array.isArray(result) && result.length === 1) {
      const currentPost = result[0];
      const newPost = {
        ...currentPost,
        ...req.body,
      };

      const sqlUpdate = 'UPDATE public.post SET title=$1, content=$2, image_path=$3 WHERE id = $4';
      const values = [
        newPost.title, 
        newPost.content,
        newPost.image_path,
        id
      ]
      try {
        await client.query(sqlUpdate, values);
        res.status(200).send({ message: "Post updated successfully" });
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
    const result = (await client.query('SELECT * FROM public.post WHERE id = $1', [id])).rows;

    if (Array.isArray(result) && result.length === 0) {
      res.status(404).send({ error: "Post not found" });
      return;
    };

    // si l'user n'est pas le créateur du post il ne peux pas le supprimer
    if (result[0].user_id !== req.user?.id) {
      res.status(401).send({ error: "You do not have the permission to delete this post !" });
      return;
    }
    
    try {
      await client.query('DELETE FROM public.post WHERE id = $1', [id]);
      res.status(204).send();
    } catch (e) {
      console.error('Database error:', e);
      res.status(500).send({ error: 'Error while deleting data' });
    }
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send({ error: 'Error while fetching data' });
  }
};

export default {
  getAll,
  getAllByUser,
  getOne,
  create,
  update,
  remove
}