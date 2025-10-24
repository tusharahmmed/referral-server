import { model, Schema } from 'mongoose';
import {
  CreditActivityModel,
  ICreditActivity,
} from './credit_activity.interface';

const creditActivitySchema = new Schema<ICreditActivity, CreditActivityModel>(
  {
    referred_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    reffer_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
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
