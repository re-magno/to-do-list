import { Router } from 'express';
import loginRoutes from './loginRoutes';

const routes = Router();

routes.use('/login', loginRoutes);

export default routes;