import { z } from 'zod';
import { USER_ROLE } from '../../../enums/user';

const signup = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(3, 'Name at least 3 charecters long'),
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'Plese type a valid email' })
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: 'password is required' })
      .min(6, { message: 'Password should be at least 6 digit' })
      .trim(),
    role: z.enum([USER_ROLE.USER] as [string, ...string[]]).optional(),
    referred_user_code: z.string().optional(),
  }),
});

const signin = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'email is required' })
      .email({ message: 'Plese type a valid email' })
      .trim()
      .toLowerCase(),
    password: z
      .string({ required_error: 'password is required' })
      .min(6, { message: 'Password should be at least 6 digit' })
      .trim(),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidation = {
  signup,
  signin,
  refreshToken,
};
