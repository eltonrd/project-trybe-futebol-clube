import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /login/validate', () => {
  const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6InRlc3QxMjM0NTYiLCJyb2xlIjoiYWRtaW4ifQ.PQ0He6tTTT6vodYLdZyRSVjWweFoiBCVxIHDLrighvs'
  const invalidToken = 'tokenInvalid';
  it('A rota /login/validate deve retornar um status 200 ao passar um token válido', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'jwtToken');
    expect(chaiHttpResponse).to.have.status(200);
  });
  it('A rota /login/validate deve retornar um status 400 quando for passado um token inválido', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'invalidToken');
    expect(chaiHttpResponse).to.have.status(400);
  });
  it('A rota /login/validate deve retornar uma role ao passar o token correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', jwtToken);
    expect(chaiHttpResponse.body.role).to.be.equal('admin');
  });
});