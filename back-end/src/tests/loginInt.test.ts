import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Response } from 'superagent';
import { app } from '../app';
import UserModel from '../model/userModel';

chai.use(chaiHttp);

const { expect } = chai;

const CORRECT_BODY = { email: 'tests@test.com'};
const INCORRECT_BODY = { email: 'tests@test'};
const UNAUTHORIZED = { "message": "Invalid email" };
const USER = 'fc260199-341d-48f2-9f86-865f4f928a43';

describe('1 - When a POST request is sent to the "/login" endpoint', () => {
  let chaiHttpResponse: Response;

  describe('1.1 - When the "email" sent is correct', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(USER);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(CORRECT_BODY);
    });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
    });

    it('It should return status 200 - OK', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('It should respond with the body containing the "user" and "token" propertiess', () => {
      expect(chaiHttpResponse.body).to.have.property('user');
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('1.2 -  When an incorrect "email" is sent', () => {
    before(async () => {
      sinon.stub(UserModel.prototype, 'findOrCreate').resolves(undefined);

      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send(INCORRECT_BODY);
      });

    after(()=>{
      (UserModel.prototype.findOrCreate as sinon.SinonStub).restore();
    });

    it('It should return status 401 - UNAUTHORIZED', () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('It should respond with an object containing the "message" property and the message "Invalid email"', () => {
      expect(chaiHttpResponse.body).deep.equal(UNAUTHORIZED);
    });
  });
})