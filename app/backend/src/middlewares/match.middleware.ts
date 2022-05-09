import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';

export default class MatchMiddleware {
  public static async verifyTeam(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, awayTeam } = req.body;
      const homeTeamFound = await TeamsService.getTeamById(homeTeam);
      const awayTeamFound = await TeamsService.getTeamById(awayTeam);
      if (!homeTeamFound || !awayTeamFound) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      req.body.homeTeam = homeTeamFound.id;
      req.body.awayTeam = awayTeamFound.id;
      next();
    } catch (Error) {
      next(Error);
    }
  }

  public static async verifyMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { homeTeam, awayTeam } = req.body;
      if (homeTeam === awayTeam) {
        return res.status(401).json(
          { message: 'It is not possible to create a match with two equal teams' },
        );
      }
      req.body.homeTeam = homeTeam;
      req.body.awayTeam = awayTeam;
      next();
    } catch (Error) {
      next(Error);
    }
  }
}
