export type UserType = {
  id: number;
  email: string;
  username: string;
  password: string;
  profile_picture: string;
}

export type UserDTO = {
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
}