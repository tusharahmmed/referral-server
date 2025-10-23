/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../../../config';
import { REFERRAL_STATUS } from '../../../enums/referral';
import { USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import Referral from '../referral/referral.model';
import User from '../user/user.model';
import { ISignInPaylod, ISignupPaylod } from './auth.interface';
import { generateReferralCode } from './auth.utils';

const signup = async (payload: ISignupPaylod) => {
  // set role
  payload.role = USER_ROLE.USER;

  // generate referral code
  const code = generateReferralCode(payload.name);
  payload.referral_code = code;

  const { referred_user_code } = payload;

  return await mongoose.connection.transaction(async session => {
    try {
      if (referred_user_code) {
        const refferer_id = await User.getUserIdByRefferCode(
          referred_user_code,
          session,
        );
        if (refferer_id) {
          payload.referred_by = refferer_id as mongoose.Types.ObjectId;
        }
      }

      // create user
      const createdUser = await User.create([payload], { session });
      const user = createdUser[0];

      // insert into referral
      if (user?.referred_by) {
        await Referral.create(
          [
            {
              referred_by: user?.referred_by,
              reffer_to: user?._id,
              credit: 2,
              status: REFERRAL_STATUS.pending,
            },
          ],
          { session },
        );
      }

      // generate token
      const accessToken = jwtHelpers.createToken(
        { id: user?._id, role: user?.role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string,
      );

      const refreshToken = jwtHelpers.createToken(
        { id: user?._id, role: user?.role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string,
      );

      return { accessToken, refreshToken };
    } catch (error: any) {
      throw new Error(error);
    }
  });
};
const signin = async (payload: ISignInPaylod) => {
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user is not found !');
  }

  //check password
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new ApiError(httpStatus.FORBIDDEN, 'Password do not matched');

  // generate token
  const accessToken = jwtHelpers.createToken(
    { id: user?._id, role: user?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { id: user?._id, role: user?.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

// refresh token service
const refreshToken = async (payload: string) => {
  const refreshToken = payload;
  let verifiedToken = null;

  // check invalid token
  try {
    verifiedToken = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret,
    ) as JwtPayload;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // check user exist
  const { id } = verifiedToken;

  const verifiedUser = {};

  if (!verifiedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new accessToken
  const newAccessToken = jwtHelpers.createToken(
    {
      id: 'user_id',
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  signup,
  signin,
  refreshToken,
};
