import http from "../../core/services/http-common";
export class LeagueApiService {
  getAll() {
    return http.get("/leagues");
  }
  create(climbingGymId,scalerId,data) {
    return http.post(`/leagues?climbingGymId=${climbingGymId}&scaleId=${scalerId}`, data);
  }
  update(data,id) {
    return http.put(`/leagues/${id}`, data);
  }
  delete(id) {
    return http.delete(`/leagues/${id}`);
  }
  findLeagueById(id) {
    return http.get(`/leagues/${id}`);
  }
  findLeagueByClimbingGymId(id) {
    return http.get(`/leagues?climbingGymId=${id}`);
  }
  /////////Climbers_league/////////////

  findLeaguesByClimbingGymIdAndScalerId(ClimbingGymId,scalerId) {
    return http.get(`/climber-leagues/climbing-gym/${ClimbingGymId}/scaler/${scalerId}/leagues`);
  }
  findScalersByLeagueId(leagueId) {
    return http.get(`/climber-leagues/${leagueId}/scalers`);
  }
  createClimberLeagues(climbingGymId,scalerId,leagueId,data) {
    return http.post(`/climber-leagues?climbingGymId=${climbingGymId}&scalerId=${scalerId}&leagueId=${leagueId}`, data);
  }
  deleteClimberLeagues(climbingGymId,scalerId,leagueId) {
    return http.delete(`/climber-leagues?climbingGymId=${climbingGymId}&scalerId=${scalerId}&leagueId=${leagueId}`);
  }

  ////////// Requests_league /////////////
  getAllRequestsByLeagueId(leagueId){
    return http.get(`/requests/${leagueId}/scalers`);
  }
  createRequests(leagueId,scalerId,data) {
    return http.post(`/requests?leagueId=${leagueId}&scalerId=${scalerId}`, data);
  }
  findRequestsByScalerIdAndLeagueId(id,id2) {
    return http.get(`/requests?scalerId=${id}&leagueId=${id2}`);
  }
  deleteRequests(leagueId,scalerId) {
    return http.delete(`/requests?leagueId=${leagueId}&scalerId=${scalerId}`);
  }
  /////// Competitions ///////////////
  createCompetitions(leagueId,data){
    return http.post(`/competition-leagues?leagueId=${leagueId}`,data);
  }
  findCompetitionsByLeagueId(leagueId){
    return http.get(`/competition-leagues?leagueId=${leagueId}`);
  }
  /////// Competitions Ranking///////////////
  createCompetitionRankings(competitionLeagueId,scalerId,data){
    return http.post(`/competitionleaguerankings?competitionLeagueId=${competitionLeagueId}&scalerId=${scalerId}`,data);
  }
  findCompetitionRankingsByLeagueId(leagueId){
    return http.get(`/competition-leagues?leagueId=${leagueId}`);
  }
  findScalersByCompetitionLeagueId(competitionLeagueId){
    return http.get(`competition-league-rankings/${competitionLeagueId}/scalers`);
  }
  findCompetitionLeagueByCompetitionLeagueIdAndScalerId(competitionLeagueId,scalerId){
  return http.get(`/competitionleaguerankings?competitionLeagueId=${competitionLeagueId}&scalerId=${scalerId}`);
  }
}
