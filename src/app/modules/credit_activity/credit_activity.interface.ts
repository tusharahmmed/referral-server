import { Model, Types } from 'mongoose';
import { IOrder } from '../order/order.interface';
import { IUser } from '../user/user.interface';

export type ICreditActivity = {
  _id: Types.ObjectId;
  referral_by: Types.ObjectId | IUser;
  reffer_to: Types.ObjectId | IUser;
  credit: number;
  order_id: Types.ObjectId | IOrder;
};

export type CreditActivityModel = Model<ICreditActivity>;
