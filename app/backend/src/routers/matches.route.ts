import * as express from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRouter = express.Router();

matchesRouter.get('/', MatchesController.getMatches);
matchesRouter.post('/', MatchesController.createMatch);
matchesRouter.patch('/:id/finish', MatchesController.updateMatch);

export default matchesRouter;
