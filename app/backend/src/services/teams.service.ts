import Team from '../interfaces/teams.interface';
import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  public static async getTeams(): Promise<Team[]> {
    const teams = await Teams.findAll();
    return teams as Team[];
  }

  public static async getTeamById(id: number): Promise<Team> {
    const team = await Teams.findOne({
      where: { id },
    });
    return team as Team;
  }
}
