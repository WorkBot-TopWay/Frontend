import http from "../../core/services/http-common";
export class ClimbingGymsApiService {
  getAll() {
    return http.get("/climbingGyms/?_embed=category_gyms");
  }

  findClimbingById(id) {
    return http.get(`/climbingGyms/${id}`);
  }
  create(data) {
    return http.post("/climbingGyms", data);
  }
  update(id, data) {
    return http.put(`/climbingGyms/${id}`, data);
  }
  delete(id) {
    return http.delete(`/climbingGyms/${id}`);
  }
  findAllImagesById(id) {
    return http.get(`/climbingGyms/${id}/images`);
  }
  findFeatureById(id) {
    return http.get(`/climbingGyms/${id}/features`);
  }
  findNewsById(id) {
    return http.get(`/climbingGyms/${id}/new_news`);
  }
  findCompetitionById(id) {
    return http.get(`/competition_gyms/${id}?_embed=competition_gyms_ranking`);
  }
  findCommentById(id) {
    return http.get(`/climbingGyms/${id}/comments`);
  }
  findCategoryById(id) {
    return http.get(`climbingGyms/${id}/category_gyms`);
  }
  getAllCategory() {
    return http.get("/categories");
  }
}