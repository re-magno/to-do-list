import { Request, Response, NextFunction } from 'express';
import { ITaskController, ITaskService } from '../interfaces/taskInterface';

export default class TaskController implements ITaskController {
  private _taskSevice: ITaskService;

  constructor(taskService: ITaskService) {
    this._taskSevice = taskService;
  }
  
  public async create(req: Request, res: Response, next: NextFunction) : Promise<Response | void> {
    try {
      const { task, user } = req.body;
      const taskCreated = await this._taskSevice.create({ task, userId: user});
      return res.status(201).json(taskCreated);
    } catch (error) {
      next(error);
    }
  }
}