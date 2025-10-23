import { model, Schema } from 'mongoose';

import { REFERRAL_STATUS } from '../../../enums/referral';
import { IReferral, ReferralModel } from './referra.interface';

const referralSchema = new Schema<IReferral, ReferralModel>(
  {
    referred_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reffer_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(REFERRAL_STATUS),
      default: REFERRAL_STATUS.pending,
    },
    credit: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Referral = model<IReferral, ReferralModel>('Referral', referralSchema);

export default Referral;
