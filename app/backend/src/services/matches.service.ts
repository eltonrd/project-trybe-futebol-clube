import { Match, MatchCreate } from '../interfaces/matches.interface';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  public static async getMatches(): Promise<Match[]> {
    const matches = await Matches.findAll({
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return matches as unknown as Match[];
  }

  public static async createMatch(match: MatchCreate): Promise<MatchCreate | null> {
    const newMatch = await Matches.create(match);
    return newMatch as MatchCreate;
  }

  public static async getMatchById(id: string): Promise<Match | null> {
    const match = await Matches.findOne({
      where: { id },
      include: [{
        model: Teams,
        as: 'teamHome',
        attributes: ['teamName'],
      }, {
        model: Teams,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });
    return match as unknown as Match;
  }

  public static async updateMatch(id: string) {
    const getMatch = await this.getMatchById(id);
    if (getMatch?.inProgress === true) {
      await Matches.update({ inProgress: false }, { where: { id } });
    } else {
      await Matches.update({ inProgress: true }, { where: { id } });
    }
  }
}
