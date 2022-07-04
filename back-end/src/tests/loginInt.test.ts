import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../model/userModel';

chai.use(chaiHttp);

const { expect } = chai;

const VALID_EMAIL = { email: 'tests@test.com'};
const INVALID_EMAIL = { email: 'tests@test'};
const EMPTY_EMAIL = { email: ''};
const MESSAGE_INVALID_EMAIL = { message: '\"email\" must be a valid email' };
const MESSAGE_EMPTY_EMAIL = { message: '\"email\" is not allowed to be empty' };
const MESSAGE_EMAIL_REQUIRED = { message: "\"email\" is required" };
const USER = 'fc260199-341d-48f2-9f86-865f4f928a43';

describe('1 - When a POST request is sent to the "/login" endpoint', () => {
  let chaiHttpResponse: Response;

  describe('1.1 - When the "email" sent is correct', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(USER);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(VALID_EMAIL);
    });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
    });

    it('It should return status 200 - OK', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('It should respond with the body containing the "user" and "token" properties', () => {
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('1.2 - When an invalid "email" is sent', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(undefined);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(INVALID_EMAIL);
      });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
    });

    it('It should return status 400 - BAD REQUEST', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('It should respond with an object containing the "message" property and the message "\"email\" must be a valid email"', () => {
      expect(chaiHttpResponse.body).deep.equal(MESSAGE_INVALID_EMAIL);
    });
  });

  describe('1.3 - When an empty "email" is sent', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(undefined);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(EMPTY_EMAIL);
      });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
    });

    it('It should return status 400 - BAD REQUEST', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('It should respond with an object containing the "message" property and the message "\"email\" is not allowed to be empty"', () => {
      expect(chaiHttpResponse.body).deep.equal(MESSAGE_EMPTY_EMAIL);
    });
  });

  describe('1.4 - When the "email" is not sent', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(undefined);

      chaiHttpResponse = await chai.request(app)
        .post('/login');
      });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
    });

    it('It should return status 400 - BAD REQUEST', () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('It should respond with an object containing the "message" property and the message "\"email\" is required"', () => {
      expect(chaiHttpResponse.body).deep.equal(MESSAGE_EMAIL_REQUIRED);
    });
  })
  
})