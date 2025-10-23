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

export const CourseRoutes = router;
