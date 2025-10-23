import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReferral = {
  _id: Types.ObjectId;
  referred_by: Types.ObjectId | IUser;
  reffer_to: Types.ObjectId | IUser;
  status: 'pending' | 'converted';
  credit: number;
};

export type ReferralModel = Model<IReferral>;
