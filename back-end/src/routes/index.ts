import { Router } from 'express';
import loginRoutes from './loginRoutes';
import taskRoutes from './taskRoutes';

const routes = Router();

routes.use('/login', loginRoutes);
routes.use('/task', taskRoutes)

export default routes;
