import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { Document } from "mongoose";

export interface HttpError extends Error {
  status: number;
}

// JWT payload
export interface customPayload extends JwtPayload {
  UserInfo: {
    username: string;
    roles: number[];
  };
}

// JWT sign and set a variable on request
export interface CustomRequest extends Request {
  user: string | JwtPayload;
  roles: number[] | JwtPayload;
}

// User Roles
export interface IRolesList {
  Admin: number;
  Editor: number;
  User: number;
}

// Mongoose User model
export interface IUser extends Document {
  username: string;
  roles?: IRolesList
  password: string;
  refreshToken?: string;
}

// Mongoose Employees Model
export interface IEmployees extends Document {
  firstname: String;
  lastname: String;
}
