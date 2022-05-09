import { Request, Response, NextFunction } from 'express';
// import JwtToken from '../utils/jwt.token';
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

  public static async createMatch(req: Request, res: Response, next: NextFunction): Promise<
  Response | void > {
    try {
      const matches = req.body;
      if (matches.homeTeam === matches.awayTeam) {
        return res.status(400).json(
          { message: 'It is not possible to create a match with two equal teams' },
        );
      }
      const matchCreated = await MatchesService.createMatch(matches);
      return res.status(201).json(matchCreated);
    } catch (Error) {
      next(Error);
    }
  }

  public static async updateMatch(req: Request, res: Response, next: NextFunction): Promise<
  Response | void > {
    try {
      const matchId = req.params.id;
      await MatchesService.updateMatch(matchId);
      return res.status(200).json({ message: 'Match updated' });
    } catch (Error) {
      next(Error);
    }
  }
}
