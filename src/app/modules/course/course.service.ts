import httpStatus from 'http-status';
import { Types } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { ICourse } from './course.interface';
import Course from './course.model';

const createCourse = async (payload: ICourse) => {
  const result = await Course.create(payload);

  return result;
};

const deleteCourse = async (id: string) => {
  const _id = new Types.ObjectId(id);

  const result = await Course.findByIdAndDelete({ _id });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course does not exist!');
  }
  return result;
};

export const CourseService = {
  createCourse,
  deleteCourse,
};
