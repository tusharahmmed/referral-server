"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_controller_1 = require("./order.controller");
const order_validation_1 = require("./order.validation");
const router = (0, express_1.Router)();
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
router.post('/create-new', (0, validateRequest_1.default)(order_validation_1.OrderValidation.createOrder), (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.USER), order_controller_1.OrderController.createOrder);
exports.OrderRoutes = router;
