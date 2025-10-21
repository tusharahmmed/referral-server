/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const signup = async () => {
  return { accessToken: '', refreshToken: '' };
};
const signin = async () => {
  return { accessToken: '', refreshToken: '' };
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
