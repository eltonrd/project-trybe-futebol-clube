import * as express from 'express';
import * as cors from 'cors';
import loginRouter from './routers/login.route';
import teamsRouter from './routers/teams.route';
import matchesRouter from './routers/matches.route';
import leaderboardRouter from './routers/leaderboard.route';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use('/login', loginRouter);
    this.app.use('/login/validate', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/teams/:id', teamsRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/matches/:id', matchesRouter);
    this.app.use('/leaderboard/home', leaderboardRouter);
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use(cors());
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
