import { NextFunction, Request, Response } from "express";
import { HttpError } from "../interfaces/interface";

const { logEvents } = require('./logEvents');

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.error(err.stack)
    res.status(status).send(err.message);
}

export default errorHandler