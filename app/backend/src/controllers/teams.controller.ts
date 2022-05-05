import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  public static async getTeams(_req: Request, res: Response, next: NextFunction): Promise<
  Response | void > {
    try {
      const teams = await TeamsService.getTeams();
      return res.status(200).json(teams);
    } catch (Error) {
      next(Error);
    }
  }
}
