import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../app';
import TaskModel from '../model/taskModel';
import UserModel from '../model/userModel';

chai.use(chaiHttp);

const { expect } = chai;

const USER = '01a03080-b24a-4345-a838-0e011f552f05';
const VALID_EMAIL = { email: 'tests@test.com'};
const NEW_TASK = { task: 'Create tests'};
const TASK_CREATED = {
  "id": "57a12f3a-f9d6-4325-9f13-46613a635bb5",
  "task": "testar API",
  "status": "pendente",
  "userId": "01a03080-b24a-4345-a838-0e011f552f05",
  "createdAt": "2022-07-04T21:01:42.989Z",
  "updatedAt": "2022-07-04T21:01:42.989Z"
}

describe('2 - When a POST request is sent to the "/task" endpoint', () => {
  let chaiHttpResponse: Response;

  describe('2.1 - When the token and request body are correct', () => {
    before(async () => {
      sinon.stub(TaskModel.prototype, 'create').resolves(TASK_CREATED);
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(USER);

      const { body: { token }} = await chai
        .request(app)
        .post('/login')
        .send(VALID_EMAIL);

      chaiHttpResponse = await chai.request(app)
        .post('/task')
        .set('authorization', token)
        .send(NEW_TASK);
    });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
      (TaskModel.prototype.create as sinon.SinonStub).restore();
    });

    it('It should return status 201 - CREATED', () => {
      expect(chaiHttpResponse).to.have.status(201);
    });

    it('It must respond with an object containing the information of the created task', () => {
      expect(chaiHttpResponse.body).to.have.an('object');
      expect(chaiHttpResponse.body).deep.equal(TASK_CREATED);
    });
  });
  
})
