import httpStatus from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import sendRes from '../../utils/sendRes';
import { UserServices } from './user.service';

const createCustomer = asyncHandler(async (req, res) => {
  const { customer } = req.body;

  const result = await UserServices.createCustomerIntoDB(req.file, customer);

  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer created successfully',
    data: result,
  });
});

export const UserControllers = {
  createCustomer,
};
