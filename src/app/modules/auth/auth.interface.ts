import { IUser } from '../user/user.interface';

export type ISignupPaylod = IUser & {
  referred_user_code: string;
};
export type ISignInPaylod = Pick<IUser, 'email' | 'password'>;
