import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ReqType extends Request {
  user: any,
  token: any
}

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export interface UserType {
  _id: string,
  username: string,
  password: string,
  recipes: Recipe[],
}

export interface Recipe {
  uri: string,
  label: string,
  image: string,
  ingredientLines: string[],
  url: string,
}
