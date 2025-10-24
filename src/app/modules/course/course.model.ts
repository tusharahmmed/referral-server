/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema, Types } from 'mongoose';

import { CourseModel, ICourse } from './course.interface';

const courseSchema = new Schema<ICourse, CourseModel>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Types.Decimal128,
      default: Types.Decimal128.fromString('0.00'),
      required: true,
      get: (value: any) => parseFloat(value.toString()),
    } as any,
    instructor: {
      type: String,
      required: true,
      index: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  },
);

courseSchema.pre('save', function (next) {
  const course = this;
  if (course.isModified('price') && typeof course.price === 'number') {
    course.price = Types.Decimal128.fromString(
      (course.price as number).toFixed(2),
    );
  }

  next();
});

const Course = model<ICourse, CourseModel>('Course', courseSchema);

export default Course;
