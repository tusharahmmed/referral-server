import { Model, Types } from 'mongoose';

export type ICourse = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: Types.Decimal128;
  instructor: string;
  thumbnail: string;
  isDeleted: boolean;
};

export type CourseModel = Model<ICourse>;
