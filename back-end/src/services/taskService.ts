import { ITaskCreated, ITaskCreateRequest, ITaskModel, ITaskService } from "../interfaces/taskInterface";


export default class TaskService implements ITaskService {
  private _taskModel : ITaskModel;
  
  constructor(taskModel: ITaskModel) {
    this._taskModel = taskModel;
}
  async create(newTask: ITaskCreateRequest): Promise<ITaskCreated> {
    const taskCreated = await this._taskModel.create(newTask);
    return taskCreated as ITaskCreated;
  }
}