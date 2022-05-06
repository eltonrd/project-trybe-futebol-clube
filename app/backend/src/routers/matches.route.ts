import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = express.Router();

matchesRouter.get('/', MatchesController.getMatches);

export default matchesRouter;
