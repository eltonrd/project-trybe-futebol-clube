import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

const TeamsRouter = express.Router();

TeamsRouter.get('/', TeamsController.getTeams);

export default TeamsRouter;
