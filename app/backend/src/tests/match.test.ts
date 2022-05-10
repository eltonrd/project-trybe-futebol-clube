import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota /matches', () => {
  let chaiHttpResponse: Response;
  const bodyCreateMatchOk = {
      "homeTeam": 1,
      "awayTeam": 16, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    }
  const bodyCreateMatchFail = {
      "homeTeam": 16,
      "awayTeam": 16, 
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    }
    const bodyMatchGoalsUpdate = {
      "homeTeamGoals": 3,
      "awayTeamGoals": 3
    }
  it('A rota /matches deve retornar um status 200 com todos as partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body.length).to.be.greaterThan(0);
  })
  it('A rota /matches deve retornar um status 200 criando uma partida com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').send(bodyCreateMatchOk);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('homeTeam');
    expect(chaiHttpResponse.body).to.have.property('awayTeam');
    expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body).to.have.property('inProgress');
})
  it('A rota /matches deve retornar um status 401 criando uma partida com times iguais', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').send(bodyCreateMatchFail);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.error).to.be.equal('It is not possible to create a match with two equal teams');
  })
  it('A rota /matches:id/finish deve retornar um status 200 ao atualizar a progressão de uma partida', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.message).to.be.equal('Match updated');
  })
  it('A rota /matches:id/finish deve retornar um status 401 ao atualizar a progressão de uma partida que não existe', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/999/finish');
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.error).to.be.equal('There is no match with such id!');
  })
  it('A rota /matches:id deve retornar um status 200 ao atualizar os gols de uma partida', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1').send(bodyMatchGoalsUpdate);
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.message).to.be.equal('Match updated');
  })
  it('A rota /matches:id deve retornar um status 401 ao atualizar os gols de uma partida que não está em andamento', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/2').send(bodyMatchGoalsUpdate);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.error).to.be.equal('The match is not in progress!');
  })
  it('A rota /matches:id deve retornar um status 401 ao atualizar os gols de uma partida que não existe', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/999').send(bodyMatchGoalsUpdate);
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.error).to.be.equal('There is no match with such id!');
  })
});


