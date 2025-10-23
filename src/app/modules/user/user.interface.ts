/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose';

export type IUser = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  referral_code: string;
  referred_by: Types.ObjectId | IUser | null;
  role: string;
};

export interface UserModel extends Model<IUser> {
  //get user id by reffer code
  getUserIdByRefferCode(code: string): Promise<Pick<IUser, '_id'>>;
}
