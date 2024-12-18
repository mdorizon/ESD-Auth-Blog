import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../user/user.service";
import { SigninIUserDTO, SignupIUserDTO } from "../user/user.types";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const signin = async (userDTO: SigninIUserDTO) => {
  const user = await userService.getOneByEmail(userDTO.email);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(userDTO.password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const access_token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "12h",
  });

  return access_token;
};

const signup = async (userDTO: SignupIUserDTO) => {
  return userService.create(userDTO);
};

const whoami = async (user_id: number) => {
  return userService.getOneById(user_id);
};

export default {
  signin,
  signup,
  whoami,
};