import { Request, Response } from "express";
import { IRolesList, IUser } from "../interfaces/interface";
import User from "../model/User";
const bcrypt = require("bcrypt");

export const handleNewUser = async (req: Request, res: Response) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  // check for duplicate usernames in the db
  const duplicate: IUser | null = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {

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

    const result = await new User(newUser).save()

    console.log(result);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    if (err instanceof Error) res.status(500).json({ message: err.message });
  }
};
