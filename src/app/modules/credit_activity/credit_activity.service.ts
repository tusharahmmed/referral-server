/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import QueryBuilder from '../../../builder/QueryBuilder';
import { IGenericResponse } from '../../../interfaces/common';
import CreditActivity from './credit_activity.model';

const getActivitiesByUserId = async (
  query: Record<string, unknown>,
  userId: string,
): Promise<IGenericResponse<any>> => {
  const filteredQuery = {
    referred_by: new Types.ObjectId(userId),
    ...query,
  };
  const creditActivityQuery = new QueryBuilder(
    CreditActivity.find().populate([
      {
        path: 'referred_by',
        select: 'name email referral_code',
      },
      {
        path: 'reffer_to',
        select: 'name email referral_code',
      },
      {
        path: 'order_id',
        select: 'user_id course_id price createdAt',
        populate: {
          path: 'course_id',
          select: 'name title description',
        },
      },
    ]),
    filteredQuery,
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await creditActivityQuery.countTotal();
  const data = await creditActivityQuery.modelQuery;

  return {
    data,
    meta,
  };
};

export const CreditActivityService = {
  getActivitiesByUserId,
};
