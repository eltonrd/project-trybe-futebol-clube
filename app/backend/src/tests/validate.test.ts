import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login/validate', () => {
  let chaiHttpResponse: Response;
  const jwtTokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjUyMTQxMDU3LCJleHAiOjE2NTIyMjc0NTd9.IPZ2orCoYr_EeGtyLecC7GiJmMefZxx5OtQMJUFGz3A';
  const jwtTokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTIxNDI2MzUsImV4cCI6MTY1MjIyOTAzNX0.Sa32Kg17ASlQq_OU6xgq3fIo5X9EXER-5XfZflasB4w';
  const invalidToken = 'tokenInvalid';
  it('A rota /login/validate deve retornar um status 200 ao passar um token válido', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'jwtTokenAdmin');
    expect(chaiHttpResponse).to.have.status(200);
  });
  it('A rota /login/validate deve retornar um status 400 quando for passado um token inválido', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'invalidToken');
    expect(chaiHttpResponse).to.have.status(400);
  });
  it('A rota /login/validate deve retornar uma role admin ao passar o token correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', jwtTokenAdmin);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.role).to.be.equal('admin');
  });
  it('A rota /login/validate deve retornar uma role user ao passar o token correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', jwtTokenUser);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.role).to.be.equal('user');
  });
  it('A rota /login/validate deve retornar um status 500 quando não for passado um token', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate');
    expect(chaiHttpResponse).to.have.status(500);
  });
});