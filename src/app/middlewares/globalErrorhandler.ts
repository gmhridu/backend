import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import handleValidationError from '../errors/handleValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

const globalErrorHandler: ErrorRequestHandler = (
  err: unknown,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [{ path: '', message: 'Something went wrong' }];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    ({ statusCode, message, errorSources } = simplifiedError);
  } else if (err instanceof Error) {
    if (err.name === 'ValidationError') {
      const simplifiedError = handleValidationError(err as any);
      ({ statusCode, message, errorSources } = simplifiedError);
    } else if (err.name === 'CastError') {
      const simplifiedError = handleCastError(err as any);
      ({ statusCode, message, errorSources } = simplifiedError);
    } else if ('code' in err && err.code === 11000) {
      const simplifiedError = handleDuplicateError(err);
      ({ statusCode, message, errorSources } = simplifiedError);
    } else if (err instanceof AppError) {
      statusCode = err.statusCode;
      message = err.message;
      errorSources = [{ path: '', message: err.message }];
    } else {
      message = err.message;
      errorSources = [{ path: '', message: err.message }];
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(config.NODE_ENV === 'development' && { 
      stack: err instanceof Error ? err.stack : null,
      error: err 
    })
  });
};

export default globalErrorHandler;