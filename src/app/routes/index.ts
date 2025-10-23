import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { CourseRoutes } from '../modules/course/course.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(module => router.use(module.path, module.route));
export const applicationRoutes = router;
