import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public static async getLeaderboard(req : Request, res : Response, next : NextFunction) : Promise<
  Response | void> {
    try {
      const leaderboard = await LeaderboardService.leaderboardResult();
      return res.status(200).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
