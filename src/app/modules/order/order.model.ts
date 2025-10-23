/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientSession, model, Schema, Types } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchma = new Schema<IOrder, OrderModel>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    price: {
      type: Types.Decimal128,
      default: Types.Decimal128.fromString('0.00'),
      required: true,
      get: (value: any) => parseFloat(value.toString()),
    } as any,
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  },
);

orderSchma.pre('save', function (next) {
  const order = this;
  if (order.isModified('price') && typeof order.price === 'number') {
    order.price = Types.Decimal128.fromString(
      (order.price as number).toFixed(2),
    );
  }

  next();
});

orderSchma.statics.isFirstOrder = async function (
  user_id: Types.ObjectId,
  session?: ClientSession,
) {
  const orderExist = await Order.exists({
    user_id: new Types.ObjectId(user_id),
  }).session(session || null);

  return !!orderExist;
};

const Order = model<IOrder, OrderModel>('Order', orderSchma);

export default Order;
