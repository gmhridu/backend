import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (
  req: Request,
  res: Response,
  // next parameter is required for error middleware even if unused
  next: NextFunction 
): void => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
  });
};

export default notFound;