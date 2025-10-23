import { Router } from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = Router();

/**
 * @swagger
 * /orders/create-new:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new course order for a user.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - course_id
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *               course_id:
 *                 type: string
 *                 description: The ID of the course being ordered.
 *     responses:
 *       200:
 *         description: Order created successfully!
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
 *                   example: Order created successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 68fc91a8b7f2d9a47a0f9c11
 *                     user_id:
 *                       type: string
 *                       example: user_details
 *                     course_id:
 *                       type: string
 *                       example: course_details
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-23T18:38:36.917Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-23T18:38:36.917Z
 */

router.post(
  '/create-new',
  validateRequest(OrderValidation.createOrder),
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  OrderController.createOrder,
);

export const OrderRoutes = router;
