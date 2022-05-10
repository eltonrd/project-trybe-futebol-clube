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

  const requestFail = {
    email: 'invalidEmail',
    password: '1234'
  }
  const requestFail2 = {
    email: '',
    password: 'test123456'
  }
  const requestFail3 = {
    email: 'test@test.com',
    password: ''
  }

  it('A rota /login deve retornar um status 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(requestOk);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('token');
  });
  it('Os campos email e password devem ser válidos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(requestFail);
    expect(chaiHttpResponse.body.error).to.be.equal('Incorrect email or password');
    expect(chaiHttpResponse).to.have.status(400);
  });
  it('O campo email deve ser válido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(requestFail2);
    expect(chaiHttpResponse.body.error).to.be.equal('All fields must be filled');
    expect(chaiHttpResponse).to.have.status(400);
  });
  it('O campo password deve ser válido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(requestFail3);
    expect(chaiHttpResponse.body.error).to.be.equal('All fields must be filled');
    expect(chaiHttpResponse).to.have.status(400);
  });
});
