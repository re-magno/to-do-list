import { Router } from 'express';
import LoginController from '../controllers/loginController';
import Middlewares from '../middlewares';
import UserModel from '../model/userModel';
import LoginService from '../services/loginService';

const loginRoutes = Router();

const loginModel = new UserModel()
const loginService = new LoginService(loginModel);
const loginController = new LoginController(loginService);


loginRoutes.route('/')
  .post(Middlewares.loginValidation, (req, res, next) => loginController.login(req, res, next));

export default loginRoutes;
