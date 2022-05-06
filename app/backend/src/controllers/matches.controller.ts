import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public static async getMatches(_req: Request, res: Response, next: NextFunction): Promise<
  Response | void > {
    try {
      const matches = await MatchesService.getMatches();
      return res.status(200).json(matches);
    } catch (Error) {
      next(Error);
    }
  }
}
