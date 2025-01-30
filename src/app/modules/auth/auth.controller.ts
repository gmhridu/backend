import httpStatus from 'http-status';
import config from '../../config';
import asyncHandler from '../../utils/asyncHandler';
import sendRes from '../../utils/sendRes';
import { AuthServices } from './auth.service';

const loginUser = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
    },
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { ...passwordData } = req.body;

  console.log(req.user)

  const result = await AuthServices.changePassword(req.user, passwordData);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
