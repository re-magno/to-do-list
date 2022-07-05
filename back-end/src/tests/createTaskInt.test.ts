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
};
const EMPTY_TASK = { task: ''};
const TASK_MIN_CHARACTERES = { task: 'ab' };
const MESSAGE_EMPTY_TASK = { message: "\"task\" is not allowed to be empty" };
const MESSAGE_MIN_CHARACTERES = { message: "\"task\" length must be at least 3 characters long" };
const MESSAGE_TASK_REQUIRED = { message: "\"task\" is required" };

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

    after(() => {
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

  describe('2.2 - When an empty "task" is sent', () => {
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
        .send(EMPTY_TASK);
    });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
      (TaskModel.prototype.create as sinon.SinonStub).restore();
    });
    it('It should return status 400 - BAD REQUEST', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('It should respond with an object containing the "message" property and the message "\"task\" is not allowed to be empty"', () => {
      expect(chaiHttpResponse.body).deep.equal(MESSAGE_EMPTY_TASK);
    });
  });

  describe('2.3 - When a "task" is less than 3 characters', () => {
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
        .send(TASK_MIN_CHARACTERES);
    });

    after(() => {
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
      (TaskModel.prototype.create as sinon.SinonStub).restore();
    });

    it('It should return status 400 - BAD REQUEST', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('It should respond with an object containing the "message" property and the message "\"task\" length must be at least 3 characters long"', () => {
      expect(chaiHttpResponse.body).deep.equal(MESSAGE_MIN_CHARACTERES);
    });
  });

  describe('2.4 - When the "task" is not sent', () => {
    before(async () => {
      sinon.stub(TaskModel.prototype, 'create').resolves(TASK_CREATED);
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(USER);

      const { body: { token }} = await chai
        .request(app)
        .post('/login')
        .send(VALID_EMAIL);

      chaiHttpResponse = await chai.request(app)
        .post('/task')
        .set('authorization', token);
    });

    after(() => {
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
      (TaskModel.prototype.create as sinon.SinonStub).restore();
    });

    it('It should return status 400 - BAD REQUEST', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('It should respond with an object containing the "message" property and the message "\"task\" is required"', () => {
      expect(chaiHttpResponse.body).deep.equal(MESSAGE_TASK_REQUIRED);
    });
  });
});
