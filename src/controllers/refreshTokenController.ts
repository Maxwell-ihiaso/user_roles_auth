// import { Request, Response } from "express";
// import jwt, { Secret } from "jsonwebtoken";

// const User = require('../model/User');

// export const handleRefreshToken = async (req: Request, res: Response) => {
//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(401);
//     const refreshToken = cookies.jwt;

//     const foundUser = await User.findOne({ refreshToken }).exec();
//     if (!foundUser) return res.sendStatus(403); //Forbidden
//     // evaluate jwt
//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET as Secret,
//         (err, decoded) => {
//             if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
//             const roles = Object.values(foundUser.roles);
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": decoded.username,
//                         "roles": roles
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET as Secret,
//                 { expiresIn: '10s' }
//             );
//             res.json({ roles, accessToken })
//         }
//     );
// }

import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../interfaces/interface";
import User from "../model/User";

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser: IUser | null = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); // Forbidden

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret,
    (err: any, decoded: any) => {
      if (err || foundUser?.username !== decoded?.username)
        return res.sendStatus(403);
      const roles: number[] = Object.values(foundUser?.roles as {}).filter(Boolean) as number[];
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: "10s" }
      );
      res.json({ roles, accessToken });
    }
  );
};
