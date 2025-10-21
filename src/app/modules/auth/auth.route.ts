import { NextFunction, Request, Response, Router } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/sign-up',
  (req: Request, res: Response, next: NextFunction) => {
    if (config.env === 'production') {
      throw new ApiError(httpStatus.NOT_FOUND, 'API Not Found');
    }
    next();
  },
  validateRequest(AuthValidation.signup),
  AuthController.signup,
);

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       404:
 *         description: Not found
 */
router.post(
  '/sign-in',
  validateRequest(AuthValidation.signin),
  AuthController.signin,
);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     deprecated: true
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshToken),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
