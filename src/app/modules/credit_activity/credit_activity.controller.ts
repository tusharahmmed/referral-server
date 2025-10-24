import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CreditActivityService } from './credit_activity.service';

const getActivitiesByUserId = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await CreditActivityService.getActivitiesByUserId(
    req.query,
    user?.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Credit activities retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const CreditActivityController = {
  getActivitiesByUserId,
};
