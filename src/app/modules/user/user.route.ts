import { Router } from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = Router();

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

router.get(
  '/profile-stats',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  UserController.getPorfileStats,
);

export const UserRoutes = router;
