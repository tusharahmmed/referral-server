/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { Types } from 'mongoose';
import QueryBuilder from '../../../builder/QueryBuilder';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { CourseSearchableFields } from './course.constant';
import { ICourse } from './course.interface';
import Course from './course.model';

const createCourse = async (payload: ICourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllCourse = async (
  query: Record<string, unknown>,
): Promise<IGenericResponse<any>> => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await courseQuery.countTotal();
  const data = await courseQuery.modelQuery;

  return {
    data,
    meta,
  };
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
  getAllCourse,
  deleteCourse,
};
