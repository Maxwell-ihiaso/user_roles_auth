import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../interfaces/interface";
import User from "../model/User";

export const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) throw createHttpError.Unauthorized();

    const refreshToken = cookies.jwt;

    const foundUser: IUser | null = await User.findOne({ refreshToken }).exec();
    if (!foundUser) throw createHttpError.Forbidden();

    // evaluate jwt
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as Secret,
      (err: any, decoded: any) => {
        if (err || foundUser?.username !== decoded?.username)
          throw createHttpError.Forbidden();

        const roles: number[] = Object.values(foundUser?.roles as {}).filter(
          Boolean
        ) as number[];

        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded.username,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          { expiresIn: "15s" }
        );

        res.json({ roles, accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};
