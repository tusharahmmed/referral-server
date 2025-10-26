"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users/profile-stats:
 *   get:
 *     summary: Get profile statistics for the logged-in user
 *     description: Retrieves profile stats including total referred users, converted users, and total credits earned.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile stats retrieved successfully!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                   description: HTTP status code.
 *                 success:
 *                   type: boolean
 *                   example: true
 *                   description: Indicates if the request was successful.
 *                 message:
 *                   type: string
 *                   example: Profile stats retrieved successfully!
 *                   description: Response message.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         format: uuid
 *                         description: The user ID.
 *                       totalReferred:
 *                         type: integer
 *                         description: Total number of users referred by this user.
 *                         example: 2
 *                       convertedUsers:
 *                         type: integer
 *                         description: Number of referred users who converted (e.g., purchased or signed up).
 *                         example: 1
 *                       totalCreditsEarned:
 *                         type: integer
 *                         description: Total credits earned by this user from referrals.
 *                         example: 2
 */
router.get('/profile-stats', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.USER), user_controller_1.UserController.getPorfileStats);
/**
 * @swagger
 * /users/profile-details:
 *   get:
 *     summary: Get user profile details
 *     description: Retrieve the profile information of the currently authenticated user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: [] # Requires JWT authentication
 *     responses:
 *       200:
 *         description: Profile details retrieved successfully!
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
 *                   example: Profile details retrieved successfully!
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 68faa3af0c315f904eeaaf9a
 *                     name:
 *                       type: string
 *                       example: Tushar
 *                     email:
 *                       type: string
 *                       example: tushar@gmail.com
 *                     referral_code:
 *                       type: string
 *                       example: tushar-8rwm8u
 *                     referred_by:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       example: 2025-10-23T18:38:36.917Z
 *                     updatedAt:
 *                       type: string
 *                       example: 2025-10-23T18:38:36.917Z
 */
router.get('/profile-details', (0, auth_1.default)(user_1.USER_ROLE.SUPER_ADMIN, user_1.USER_ROLE.USER), user_controller_1.UserController.getProfileDetais);
exports.UserRoutes = router;
