import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import TokenMiddleware from '../middlewares/token.middleware';
import MatchMiddleware from '../middlewares/match.middleware';

const matchesRouter = express.Router();

matchesRouter.get('/', MatchesController.getMatches);
matchesRouter.post(
  '/',
  TokenMiddleware.verifyToken,
  MatchMiddleware.verifyTeam,
  MatchMiddleware.verifyMatch,
  MatchesController.createMatch,
);
matchesRouter.patch(
  '/:id/finish',
  TokenMiddleware.verifyToken,
  MatchMiddleware.verifyMatchUpdate,
  MatchesController.updateMatch,
);
matchesRouter.patch(
  '/:id',
  TokenMiddleware.verifyToken,
  MatchMiddleware.verifyMatchUpdate,
  MatchesController.updateMatchGoals,
);

export default matchesRouter;
