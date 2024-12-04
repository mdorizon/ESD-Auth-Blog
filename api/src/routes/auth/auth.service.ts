import { Request, Response } from "express";
import client from "../../config/database.config";
import userService from "../user/user.service";

const signin = async(req: Request, res: Response) => {
  const { username, password } = req.body;
  res.send('signin')
};

const signup = async(req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password)

  return userService.create(req, res)
};

export default {
  signin,
  signup
}