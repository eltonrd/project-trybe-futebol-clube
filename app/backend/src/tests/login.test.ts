import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login', () => {
  let chaiHttpResponse: Response;
  const requestOk = {
    email: 'test@test.com',
    password: 'test123456'
  }

  it('A rota /login deve retornar um status 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(requestOk);
    expect(chaiHttpResponse).to.have.status(200);
  });
});
