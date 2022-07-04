import { Router } from 'express';
import TaskController from '../controllers/taskController';
import Middlewares from '../middlewares';
import TaskModel from '../model/taskModel';
import TaskService from '../services/taskService';

const taskRoutes = Router();

const taskModel = new TaskModel();
const taskService = new TaskService(taskModel);
const taskController = new TaskController(taskService);


taskRoutes.route('/')
  .post(Middlewares.tokenValidation, (req, res, next) => taskController.create(req, res, next));

export default taskRoutes;
