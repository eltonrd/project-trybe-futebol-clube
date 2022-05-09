import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import TokenMiddleware from '../middlewares/token.middleware';

const matchesRouter = express.Router();

matchesRouter.get('/', MatchesController.getMatches);
matchesRouter.post('/', TokenMiddleware.verifyToken, MatchesController.createMatch);
matchesRouter.patch('/:id/finish', TokenMiddleware.verifyToken, MatchesController.updateMatch);

export default matchesRouter;
