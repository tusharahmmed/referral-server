import { z } from 'zod';

const signup = z.object({
  body: z.object({}),
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
