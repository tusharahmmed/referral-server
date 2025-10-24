import { Router } from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CreditActivityController } from './credit_activity.controller';

const router = Router();

/**
 * @swagger
 * /credit-activities/profile-activities:
 *   get:
 *     summary: Get all credit activities for the logged-in user
 *     description: Retrieves a list of all credit-related activities for the authenticated user, including earned and used credits.
 *     tags: [Credit Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: false
 *         description: Number of results per page.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [createdAt, -createdAt]
 *           example: -createdAt
 *         required: false
 *         description: Sort order for results. Default is `-createdAt` (latest first).
 *     responses:
 *       200:
 *         description: Credit activities retrieved successfully!
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
 *                   example: Credit activities retrieved successfully!
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 1
 *                     total:
 *                       type: integer
 *                       example: 2
 *                     totalPage:
 *                       type: integer
 *                       example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 68fb812b014f7c803c5647f2
 *                       referred_by:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 68faa3af0c315f904eeaaf9a
 *                           name:
 *                             type: string
 *                             example: Tushar
 *                           email:
 *                             type: string
 *                             example: tushar@gmail.com
 *                           referral_code:
 *                             type: string
 *                             example: tushar-8rwm8u
 *                       reffer_to:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 68fb70bb5ec5043897b109ba
 *                           name:
 *                             type: string
 *                             example: Nayem
 *                           email:
 *                             type: string
 *                             example: nayem@gmail.com
 *                           referral_code:
 *                             type: string
 *                             example: nayem-rgjxkp
 *                       credit:
 *                         type: number
 *                         example: 2
 *                       order_id:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 68fb812a014f7c803c5647ef
 *                           user_id:
 *                             type: string
 *                             example: 68fb70bb5ec5043897b109ba
 *                           course_id:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 68faa507766d7e16bb1325a8
 *                               name:
 *                                 type: string
 *                                 example: Course 01
 *                               description:
 *                                 type: string
 *                                 example: description
 *                           price:
 *                             type: number
 *                             example: 15.25
 *                           createdAt:
 *                             type: string
 *                             example: 2025-10-24T13:37:46.823Z
 *                       createdAt:
 *                         type: string
 *                         example: 2025-10-24T13:37:47.023Z
 *                       updatedAt:
 *                         type: string
 *                         example: 2025-10-24T13:37:47.023Z
 */
router.get(
  '/profile-activities',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.USER),
  CreditActivityController.getActivitiesByUserId,
);

export const CreditActivityRoutes = router;
