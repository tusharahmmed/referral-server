/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable no-unused-vars */
import { ClientSession, Model, Types } from 'mongoose';
import { ICourse } from '../course/course.interface';
import { IUser } from '../user/user.interface';

export type IOrder = {
  _id: Types.ObjectId;
  user_id: Types.ObjectId | IUser;
  course_id: Types.ObjectId | ICourse;
  price: Types.Decimal128;
};

export interface OrderModel extends Model<IOrder> {
  // check first order
  isFirstOrder(
    user_id: Types.ObjectId,
    session?: ClientSession,
  ): Promise<boolean>;
}
