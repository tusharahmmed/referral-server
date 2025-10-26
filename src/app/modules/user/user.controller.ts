import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getPorfileStats = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserService.getPorfileStats(user?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile stats retrieved successfully!',
    data: result,
  });
});

const getProfileDetais = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await UserService.getProfileDetais(user?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile details retrieved successfully!',
    data: result,
  });
});

export const UserController = {
  getPorfileStats,
  getProfileDetais,
};
