import { Router } from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = Router();

/**
 * @swagger
 * /courses/create-new:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - instructor
 *               - thumbnail
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the course.
 *               description:
 *                 type: string
 *                 description: A detailed description of the course content.
 *               price:
 *                 type: number
 *                 format: decimal
 *                 description: The price of the course.
 *               instructor:
 *                 type: string
 *                 description: The instructor's name or ID.
 *               thumbnail:
 *                 type: string
 *                 description: URL or path of the course thumbnail image.
 *     responses:
 *       200:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the created course.
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: string
 *                       description: The course price as a decimal value.
 *                     instructor:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: When the course was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: When the course was last updated.
 *       400:
 *         description: Validation error or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 errorMessages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                       message:
 *                         type: string
 */

router.post(
  '/create-new',
  validateRequest(CourseValidation.createCourse),
  auth(USER_ROLE.SUPER_ADMIN),
  CourseController.createCourse,
);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Course]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the course to delete.
 *     responses:
 *       200:
 *         description: Course deleted successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Course deleted successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the course.
 *                     name:
 *                       type: string
 *                       description: The name of the course.
 *                     description:
 *                       type: string
 *                       description: A brief description of the course.
 *                     price:
 *                       type: number
 *                       description: The price of the course.
 *                     instructor:
 *                       type: string
 *                       description: The instructor's name.
 *                     thumbnail:
 *                       type: string
 *                       description: The course thumbnail URL.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: When the course was created.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: When the course was last updated.
 */

router.delete(
  '/:id',
  auth(USER_ROLE.SUPER_ADMIN),
  CourseController.deleteCourse,
);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve all courses with search, sorting, filtering, and pagination.
 *     tags:
 *       - Course
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Search by name, description, or instructor.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price, -price, createdAt, -createdAt]
 *           default: -createdAt
 *         description: Sort by price or creation date. Prefix with "-" for descending order.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page.
 *     responses:
 *       200:
 *         description: Courses retrieved successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Courses retrieved successfully!
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     totalPage:
 *                       type: integer
 *                       example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 68fa762caad2ffe034ad0b54
 *                       name:
 *                         type: string
 *                         example: JavaScript Mastery
 *                       description:
 *                         type: string
 *                         example: Learn JavaScript from scratch to advanced.
 *                       price:
 *                         type: number
 *                         example: 99.99
 *                       instructor:
 *                         type: string
 *                         example: John Doe
 *                       thumbnail:
 *                         type: string
 *                         example: https://example.com/js-course.jpg
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-10-13T15:00:00Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-10-13T15:10:00Z
 */

router.get(
  '/',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  CourseController.getAllCourse,
);

export const CourseRoutes = router;
