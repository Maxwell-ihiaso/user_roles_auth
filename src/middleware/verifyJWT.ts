import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { customPayload, CustomRequest } from "../interfaces/interface";


const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (typeof authHeader === "string") {
    if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as customPayload;

    if (!decoded) return res.sendStatus(403); //invalid token
    (req as CustomRequest).user = decoded?.UserInfo.username;
    (req as CustomRequest).roles = decoded?.UserInfo.roles;
    next();
  }
};

export default verifyJWT
