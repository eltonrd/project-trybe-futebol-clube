import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/', LeaderboardController.getLeaderboard);

export default leaderboardRouter;
