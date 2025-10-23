import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.user;

  const result = await OrderService.createOrder(payload, user as JwtPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully!',
    data: result,
  });
});

export const OrderController = {
  createOrder,
};
