/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../../config';
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
      select: 0,
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

userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  );

  next();
});

userSchema.statics.getUserIdByRefferCode = async function (code: string) {
  const user = await User.findOne({ referral_code: code });
  return user?._id;
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
