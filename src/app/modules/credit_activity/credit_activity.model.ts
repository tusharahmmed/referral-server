import { model, Schema } from 'mongoose';
import {
  CreditActivityModel,
  ICreditActivity,
} from './credit_activity.interface';

const creditActivitySchema = new Schema<ICreditActivity, CreditActivityModel>(
  {
    referral_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reffer_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    order_id: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const CreditActivity = model<ICreditActivity, CreditActivityModel>(
  'CreditActivity',
  creditActivitySchema,
);

export default CreditActivity;
