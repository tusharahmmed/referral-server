import { model, Schema } from 'mongoose';
import { USER_ROLE } from '../../../enums/user';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    referral_code: {
      type: String,
      required: true,
    },
    referred_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.USER,
    },
  },
  {
    timestamps: true,
  },
);

const User = model<IUser, UserModel>('User', userSchema);

export default User;
