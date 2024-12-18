export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface IUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface SigninIUserDTO {
  email: string;
  password: string;
}