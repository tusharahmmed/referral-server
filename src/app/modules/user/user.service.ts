import { Types } from 'mongoose';
import Referral from '../referral/referral.model';
import User from './user.model';

const getPorfileStats = async (userId: string) => {
  const result = await Referral.aggregate([
    {
      $match: {
        $or: [
          { referred_by: new Types.ObjectId(userId) },
          {
            reffer_to: new Types.ObjectId(userId),
            status: 'converted',
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        totalReferred: {
          $sum: {
            $cond: [
              { $eq: ['$referred_by', new Types.ObjectId(userId)] },
              1,
              0,
            ],
          },
        },
        convertedUsers: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$referred_by', new Types.ObjectId(userId)] },
                  { $eq: ['$status', 'converted'] },
                ],
              },
              1,
              0,
            ],
          },
        },
        totalCreditsEarned: {
          $sum: '$credit',
        },
      },
    },
  ]);

  // return
  if (result?.length > 0) {
    return result?.[0];
  } else {
    return { totalReferred: 0, convertedUsers: 0, totalCreditsEarned: 0 };
  }
};

const getProfileDetais = async (userId: string) => {
  const result = await User.findOne({ _id: new Types.ObjectId(userId) });

  return result;
};

export const UserService = {
  getPorfileStats,
  getProfileDetais,
};
