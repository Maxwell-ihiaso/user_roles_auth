import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../interfaces/interface";

const verifyRoles = (...allowedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as CustomRequest)?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    const result = (req as CustomRequest).roles
      .map((role: number) => rolesArray.includes(role))
      .find((val: boolean) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
