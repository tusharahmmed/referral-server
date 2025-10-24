import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CourseRoutes } from '../modules/course/course.route';
import { CreditActivityRoutes } from '../modules/credit_activity/credit_activity.route';
import { OrderRoutes } from '../modules/order/order.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/credit-activities',
    route: CreditActivityRoutes,
  },
];

moduleRoutes.forEach(module => router.use(module.path, module.route));
export const applicationRoutes = router;
