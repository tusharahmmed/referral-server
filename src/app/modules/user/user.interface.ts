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

export type UserModel = Model<
  IUser,
  Record<string, unknown>
  //  IUserMethods
>;
