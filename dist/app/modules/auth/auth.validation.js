"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const user_1 = require("../../../enums/user");
const signup = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required' })
            .min(3, 'Name at least 3 charecters long'),
        email: zod_1.z
            .string({ required_error: 'email is required' })
            .email({ message: 'Plese type a valid email' })
            .trim()
            .toLowerCase(),
        password: zod_1.z
            .string({ required_error: 'password is required' })
            .min(6, { message: 'Password should be at least 6 digit' })
            .trim(),
        role: zod_1.z.enum([user_1.USER_ROLE.USER]).optional(),
        referred_user_code: zod_1.z.string().optional(),
    }),
});
const signin = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'email is required' })
            .email({ message: 'Plese type a valid email' })
            .trim()
            .toLowerCase(),
        password: zod_1.z
            .string({ required_error: 'password is required' })
            .min(6, { message: 'Password should be at least 6 digit' })
            .trim(),
    }),
});
const refreshToken = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required' }),
    }),
});
exports.AuthValidation = {
    signup,
    signin,
    refreshToken,
};
