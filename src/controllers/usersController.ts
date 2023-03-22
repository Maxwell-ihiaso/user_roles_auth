import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../model/User";

/**
 * getAllUsers
 * {method : GET}
 * @param req
 * @param res
 * @param next
 * @returns returns all users in the database
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0)
      return res.status(204).json({ message: "No users found" });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * deleteUser
 * {method : DELETE}
 * @param id - expects id passed in the request body.
 * @param req
 * @param res
 * @param next
 * @returns delete userin db
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req?.body?.id) throw createHttpError.BadRequest("User ID required");

    const user = await User.findOne({ _id: req.body.id }).exec();

    if (!user) {
      return res
        .status(204)
        .json({ message: `User ID ${req.body.id} not found` });
    }

    const result = await User.deleteOne({ _id: req.body.id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * getUser
 * {method : GET}
 * @param id - expects an id to be passed as a parameter to the requiest URL
 * @param req
 * @param res
 * @param next
 * @returns a single user data
 */
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req?.params?.id) throw createHttpError.Forbidden("User ID required");

    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
      return res
        .status(204)
        .json({ message: `User ID ${req.params.id} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
