import { Types } from 'mongoose';
import Referral from '../referral/referral.model';

const getPorfileStats = async (userId: string) => {
  const result = await Referral.aggregate([
    {
      $match: {
        referred_by: new Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: '$referred_by',
        totalReferred: { $sum: 1 },
        convertedUsers: {
          $sum: { $cond: [{ $eq: ['$status', 'converted'] }, 1, 0] },
        },
        totalCreditsEarned: {
          $sum: { $cond: [{ $eq: ['$status', 'converted'] }, '$credit', 0] },
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

export const UserService = {
  getPorfileStats,
};
