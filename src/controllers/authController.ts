import { NextFunction, Request, Response } from "express";
import { cookieOptions } from "../config/cookieOptions";

import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import User from "../model/User";
import createHttpError from "http-errors";

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, pwd } = req.body;
    if (!user || !pwd)
      throw createHttpError.BadRequest("Username and password are required.");

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) throw createHttpError.Unauthorized();

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) throw createHttpError.Unauthorized();

    const roles = Object.values(foundUser?.roles as {}).filter(
      Boolean
    ) as number[];
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: "1d" }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, cookieOptions);

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } catch (error) {
    next(error);
  }
};
