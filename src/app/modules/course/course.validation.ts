import z from 'zod';

export const priceSchema = z
  .number()
  .min(0, 'price cannot be negative')
  .max(1000000, 'price too large')
  .refine(val => {
    const decimalPart = val.toString().split('.')[1];
    return !decimalPart || decimalPart.length <= 2;
  }, 'price can have maximum 2 decimal places');

const createCourse = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    price: priceSchema,
    instructor: z.string({ required_error: 'Instructor is required' }),
    thumbnail: z.string({ required_error: 'Thumbnail is required' }),
  }),
});

export const CourseValidation = {
  createCourse,
};
