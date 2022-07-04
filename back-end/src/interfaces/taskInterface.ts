import { Request, Response, NextFunction } from 'express';

export interface ITaskCreateRequest {
  task: string;
  userId: string;
}

export interface ITaskCreated {
  id: string;
  task: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskController {
  create(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}

export interface ITaskService {
  create(newTask: ITaskCreateRequest) : Promise<ITaskCreated>;
}

export interface ITaskModel {
  create(newTask: ITaskCreateRequest) : Promise<ITaskCreated>;
}