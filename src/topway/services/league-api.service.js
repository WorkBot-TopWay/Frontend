import http from "../../core/services/http-common";
export class LeagueApiService {
  getAll() {
    return http.get("/league");
  }
  create(data) {
    return http.post("/league", data);
  }
  update(id, data) {
    return http.put(`/league/${id}`, data);
  }
  delete(id) {
    return http.delete(`/league/${id}`);
  }
  findLeagueById(id) {
    return http.get(`/league/${id}`);
  }
  findLeagueByClimbingGymId(id) {
    return http.get(`/league?climbingGymId=${id}`);
  }
  /////////Climbers_league/////////////
  getAllLeagues() {
    return http.get(`/climbers_league`);
  }

  findAllLeaguesByScalerId(id,id2) {
    return http.get(`/climbers_league?scalerId=${id}&climbingGymId=${id2}`);
  }
  findAllLeaguesByClimbingGymId(id) {
    return http.get(`/climbers_league?climbingGymId=${id}`);
  }
  findAllLeaguesByLeagueId(id) {
    return http.get(`/climbers_league?leagueId=${id}`);
  }
  findClimbingIdByLeagueIdAndScalerId(id,id2) {
    return http.get(`/climbers_league?scalerId=${id}&leagueId=${id2}`);
  }
  createClimbersLeague(data) {
    return http.post("/climbers_league", data);
  }
  deleteClimbersLeague(id) {
    return http.delete(`/climbers_league/${id}`);
  }

  ////////// Requests_league /////////////
  getAllRequests() {
    return http.get(`/requests`);
  }

  createRequests(data) {
    return http.post("/requests", data);
  }

  findRequestsByLeagueId(id) {
    return http.get(`/requests?leagueId=${id}`);
  }
  findRequestsByScalerId(id) {
    return http.get(`/requests?scalerId=${id}`);
  }
  findRequestsByScalerIdAndLeagueId(id,id2) {
    return http.get(`/requests?scalerId=${id}&leagueId=${id2}`);
  }
  deleteRequests(id) {
    return http.delete(`/requests/${id}`);
  }
  /////// Competitions ///////////////
  findAllCompetitions(){
    return http.get("/competitions_league");
  }
  createCompetitions(data){
    return http.post("/competitions_league",data);
  }
  findCompetitionsByLeagueId(id){
    return http.get(`/competitions_league?leagueId=${id}`);
  }
}