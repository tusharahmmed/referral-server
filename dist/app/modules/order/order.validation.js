"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = __importDefault(require("zod"));
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
 *                       example: 68fc91a8b7f2d9a47a0f9c11
 *                     course_id:
 *                       type: string
 *                       example: 68fc91a8b7f2d9a47a0f9c12
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-23T18:38:36.917Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-10-23T18:38:36.917Z
 *       400:
 *         description: Validation error or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid user or course ID
 */
const createOrder = zod_1.default.object({
    body: zod_1.default.object({
        user_id: zod_1.default.string({ required_error: 'User id is required' }),
        course_id: zod_1.default.string({ required_error: 'Course id is required' }),
    }),
});
exports.OrderValidation = {
    createOrder,
};
