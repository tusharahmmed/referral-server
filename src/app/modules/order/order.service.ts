import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import { REFERRAL_STATUS } from '../../../enums/referral';
import ApiError from '../../../errors/ApiError';
import Course from '../course/course.model';
import CreditActivity from '../credit_activity/credit_activity.model';
import Referral from '../referral/referral.model';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const createOrder = async (payload: Pick<IOrder, 'course_id' | 'user_id'>) => {
  return await mongoose.connection.transaction(async session => {
    // get user
    const userDetails = await User.findById(
      new Types.ObjectId(payload.user_id as Types.ObjectId),
    ).session(session);

    if (!userDetails) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    // get course
    const courseDetails = await Course.findById(
      new Types.ObjectId(payload.course_id as Types.ObjectId),
    ).session(session);

    if (!courseDetails) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Course does not exist');
    }

    // check first order
    const isFirstOrder = await Order.isFirstOrder(
      payload.user_id as Types.ObjectId,
      session,
    );

    // create order
    const createdOrder = await Order.create(
      [
        {
          course_id: new Types.ObjectId(payload.course_id as Types.ObjectId),
          user_id: new Types.ObjectId(payload.user_id as Types.ObjectId),
          price: courseDetails?.price,
        },
      ],
      { session },
    );

    const order = createdOrder[0];

    // if first order and has referral
    if (isFirstOrder && userDetails?.referred_by) {
      // change referral status
      await Referral.findOneAndUpdate(
        {
          reffer_to: userDetails?._id,
        },
        {
          status: REFERRAL_STATUS.converted,
        },
        {
          new: true,
          session,
        },
      );

      // insert data into credit activity
      await CreditActivity.create(
        [
          {
            referred_by: new Types.ObjectId(
              userDetails?.referred_by as Types.ObjectId,
            ),
            reffer_to: new Types.ObjectId(userDetails?._id),
            credit: 2,
            order_id: new Types.ObjectId(order?._id),
          },
        ],
        { session },
      );
    }

    return order;
  });
};

export const OrderService = {
  createOrder,
};
