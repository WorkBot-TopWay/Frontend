import http from "../../core/services/http-common";
export class ClimbingGymsApiService {

  getAll() {
    return http.get("/climbing-gyms");
  }
  login(email, password) {
    return http.get(`/climbing-gyms/login?email=${email}&password=${password}`);
  }

  findClimbingById(id) {
    return http.get(`/climbing-gyms/${id}`);
  }

  create(data) {
    return http.post("/climbing-gyms", data);
  }

  update(id, data) {
    return http.put(`/climbing-gyms/${id}`, data);
  }

  delete(id) {
    return http.delete(`/climbing-gyms/${id}`);
  }

  findClimbingName(name) {
    return http.get(`/climbing-gyms?name=${name}`);
  }

  // Images of climbing gyms
  findAllImagesById(id) {
    return http.get(`/images?climbingGymId=${id}`);
  }

  createImage(climbingGymId, data) {
    return http.post(`/images?climbingGymId=${climbingGymId}`, data);
  }

  deleteImage(id) {
    return http.delete(`/images/${id}`);
  }

  // Features of climbing gyms
  findFeatureById(id) {
    return http.get(`/features?id=${id}`);
  }

  createFeature(climbingGymId,data) {
    return http.post(`/features/${climbingGymId}`, data);
  }

  updateFeature(id, data) {
    return http.put(`/features/${id}`, data);
  }
  // News of climbing gyms

  findNewsById(id) {
    return http.get(`/news?climbingGymId=${id}`);
  }

  createNews(climbingGymId, data) {
    return http.post(`/news?climbingGymId=${climbingGymId}`, data);
  }

  deleteNews(id) {
    return http.delete(`/news/${id}`);
  }

  // News Comments of climbing gyms

  findCommentById(id) {
    return http.get(`/comments?climbingGymId=${id}`);
  }

  createComment(climbingGymId,scalerId, data) {
    return http.post(`/comments?climbingGymId=${climbingGymId}&scalerId=${scalerId}`, data);
  }

  updateComment(climbingGymId,scalerId, data) {
    return http.put(`/comments?climbingGymId=${climbingGymId}&scalerId=${scalerId}`, data);
  }

  deleteComment(climbingGymId,scalerId) {
    return http.delete(`/comments?climbingGymId=${climbingGymId}&scalerId=${scalerId}`);
  }

  //Categories of climbing gyms

  findCategoryByClimbingGymId(id) {
    return http.get(`/category-gyms/${id}/categories`);
  }

  getAllCategory() {
    return http.get("/categories");
  }

  //Competition of climbing gyms

  findCompetitionByClimbingGymId(id) {
    return http.get(`/competition-gyms?climbingGymId=${id}`);
  }

  createCompetition(climbingGymId, data) {
    return http.post(`/competition-gyms?climbingGymId=${climbingGymId}`, data);
  }

  deleteCompetition(id) {
    return http.delete(`/competition-gyms/${id}`);
  }

  // Competition ranking of climbing gyms
  findScaleRankingByCompetitionGymId(id) {
    return http.get(`/competition-gym-rankings/${id}/scalers`);
  }
  findCompetitionRankingByCompetitionGymIdAndScalerId(competitionGymId, scalerId) {
    return http.get(`/competition-gym-rankings?competitionGymId=${competitionGymId}&scalerId=${scalerId}`);
  }
  createRanking(competitionGymId, scalerId, data) {
    return http.post(`/competition-gym-rankings?competitionId=${competitionGymId}&scalerId=${scalerId}`, data);
  }

  updateRanking(competitionGymId, scalerId, data) {
    return http.put(`/competition-gym-rankings?comtempGymId=${competitionGymId}&scalerId=${scalerId}`, data);
  }
  // Competition reservation of climbing gyms
  createCompetitionReservation(competitionGymId,scalerId, data) {
    return http.post(`/competition-reservation-climbers?competitionId=${competitionGymId}&scalerId=${scalerId}`, data);
  }
  findCompetitionReservationByCompetitionGymId(competitionGymId) {
    return http.get(`/competition-reservation-climbers/${competitionGymId}/scalers`);
  }
  /// Category of Gym
  createCategoryGym(climbingGymId,categoryId, data) {
    return http.post(`/category-gyms?climbingGymId=${climbingGymId}&categoryId=${categoryId}`, data);
  }

  deleteCategoryGym(climbingGymId,categoryId) {
    return http.delete(`/category-gyms?climbingGymId=${climbingGymId}&categoryId=${categoryId}`);
  }
}