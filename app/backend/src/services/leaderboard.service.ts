import Matches from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import Leaderboard from '../interfaces/leaderboard.interface';

export default class LeaderboardService {
  public static async getHomeMatches(id: number): Promise<Matches[]> {
    const matchesHome = await Matches.findAll({
      where: { homeTeam: id, inProgress: false },
    });
    return matchesHome;
  }

  public static totalHomeGames(matches: Matches[]): number {
    const homeGames = matches.length;
    return homeGames;
  }

  public static getHomeVictories(matches: Matches[]): number {
    let victories = 0;
    matches.forEach((item) => {
      if (item.homeTeamGoals > item.awayTeamGoals) victories += 1;
    });
    return victories;
  }

  public static getHomeDraws(matches: Matches[]): number {
    let draws = 0;
    matches.forEach((item) => {
      if (item.homeTeamGoals === item.awayTeamGoals) draws += 1;
    });
    return draws;
  }

  public static getHomeLosses(matches: Matches[]): number {
    let losses = 0;
    matches.forEach((item) => {
      if (item.homeTeamGoals < item.awayTeamGoals) losses += 1;
    });
    return losses;
  }

  public static getHomeGoalsFavor(matches: Matches[]): number {
    let goalsFavor = 0;
    matches.forEach((item) => {
      goalsFavor += item.homeTeamGoals;
    });
    return goalsFavor;
  }

  public static getHomeGoalsOwn(matches: Matches[]): number {
    let goalsOwn = 0;
    matches.forEach((item) => {
      goalsOwn += item.awayTeamGoals;
    });
    return goalsOwn;
  }

  public static getHomeGoalsBalance(goalsFavor: number, goalsOwn: number): number {
    const goalsBalance = goalsFavor - goalsOwn;
    return goalsBalance;
  }

  public static getHomePoints(victories: number, draws: number): number {
    const homePoints = ((victories * 3) + draws);
    return homePoints;
  }

  public static getHomeEfficiency(homePoints: number, homeGames: number): number {
    const homeEfficiency = ((homePoints / (homeGames * 3)) * 100);
    return Number(homeEfficiency.toFixed(2));
  }

  public static homeLeaderboardResponse(matches: Matches[]): Leaderboard {
    return {
      totalPoints: this.getHomePoints(this.getHomeVictories(matches), this.getHomeDraws(matches)),
      totalGames: this.totalHomeGames(matches),
      totalVictories: this.getHomeVictories(matches),
      totalDraws: this.getHomeDraws(matches),
      totalLosses: this.getHomeLosses(matches),
      goalsFavor: this.getHomeGoalsFavor(matches),
      goalsOwn: this.getHomeGoalsOwn(matches),
      goalsBalance: (
        this.getHomeGoalsBalance(this.getHomeGoalsFavor(matches), this.getHomeGoalsOwn(matches))),
      efficiency: this.getHomeEfficiency(this.getHomePoints(
        this.getHomeVictories(matches),
        this.getHomeDraws(matches),
      ), this.totalHomeGames(matches)),
    };
  }

  public static orderLogicLeaderboard(leaderboard: Leaderboard[]) {
    leaderboard.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.efficiency < b.efficiency) return 1;
      if (a.efficiency > b.efficiency) return -1;
      return 0;
    });
  }

  public static async leaderboardResult(): Promise<Leaderboard[]> {
    const getAllTeams = await TeamsModel.findAll();
    // referência para resolver o erro Type'Promise<T>' is not assignable to type Promise<T>: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    const responseLeaderboard = await Promise.all(
      getAllTeams.map(async ({ id }) => {
        const homeMatches = await this.getHomeMatches(id);
        const leaderboardResponse = this.homeLeaderboardResponse(homeMatches);
        return {
          name: getAllTeams.find(({ id: teamId }) => teamId === id)?.teamName,
          ...leaderboardResponse,
        };
      }),
    );
    this.orderLogicLeaderboard(responseLeaderboard);
    return responseLeaderboard;
  }
}
