import { NextFunction, Request, Response } from "express";
import { IRolesList, IUser } from "../interfaces/interface";
import User from "../model/User";
import createHttpError from "http-errors";

export const handleNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, pwd } = req.body;
    if (!user || !pwd)
      throw createHttpError.BadRequest("Username and password are required.");

    // check for duplicate usernames in the db
    const duplicate: IUser | null = await User.findOne({
      username: user,
    }).exec();
    if (duplicate) throw createHttpError.Conflict("Username is already taken!");

    //create and store the new user
    const newUser: {
      username: string;
      roles?: IRolesList;
      password: string;
      refreshToken?: string;
    } = {
      username: user,
      password: pwd,
    };

    await new User(newUser).save();

    res.status(201).json({ success: `New user created!` });
  } catch (err) {
    next(err);
  }
};
