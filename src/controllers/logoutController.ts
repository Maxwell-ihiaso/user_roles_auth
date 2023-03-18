import { NextFunction, Request, Response } from "express";
import { cookieOptions } from "../config/cookieOptions";

const User = require('../model/User');

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", cookieOptions);
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
 
    res.clearCookie("jwt", cookieOptions);
    res.sendStatus(204);
}
