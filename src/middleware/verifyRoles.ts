import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { CustomRequest } from "../interfaces/interface";

const verifyRoles = (...allowedRoles: number[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!(req as CustomRequest)?.roles) throw createHttpError.Unauthorized();

      const rolesArray = [...allowedRoles];

      const isAllowed: boolean = (req as CustomRequest).roles.some(
        (role: number) => rolesArray.includes(role)
      );

      if (!isAllowed) throw createHttpError.Unauthorized();

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default verifyRoles;
