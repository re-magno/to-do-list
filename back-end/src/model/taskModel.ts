import { ITaskCreated, ITaskCreateRequest, ITaskModel } from '../interfaces/taskInterface';
import prismaClient from './prisma/prismaClient';

export default class TaskModel implements ITaskModel {
  public async create(newTask: ITaskCreateRequest): Promise<ITaskCreated> {
    const taskCreated = await prismaClient.task.create({
      data: newTask
    });
    return taskCreated as unknown as ITaskCreated;
  };
}