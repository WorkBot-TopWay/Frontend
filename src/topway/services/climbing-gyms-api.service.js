import http from "../../core/services/http-common";
export class ClimbingGymsApiService {
  getAll() {
    return http.get("/climbing-gyms");
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

  // Features of climbing gyms
  findFeatureById(id) {
    return http.get(`/features?id=${id}`);
  }

  // News of climbing gyms

  findNewsById(id) {
    return http.get(`/news?climbingGymId=${id}`);
  }

  // News Comments of climbing gyms

  findCommentById(id) {
    return http.get(`/comments?climbingGymId=${id}`);
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

// Competition ranking of climbing gyms
  findScaleRankingByCompetitionGymId(id) {
    return http.get(`/competition-gym-rankings/${id}/scalers`);
  }
  findCompetitionRankingByCompetitionGymIdAndScalerId(competitionGymId, scalerId) {
    return http.get(`/competition-gym-rankings?competitionGymId=${competitionGymId}&scalerId=${scalerId}`);
  }
}

/*
  //getAll() {
    return http.get("/climbingGyms/?_embed=category_gyms");
  }

 // findClimbingById(id) {
    return http.get(`/climbingGyms/${id}?_embed=category_gyms`);
  }
  //create(data) {
    return http.post("/climbingGyms", data);
  }
  //update(id, data) {
    return http.put(`/climbingGyms/${id}`, data);
  }
  //delete(id) {
    return http.delete(`/climbingGyms/${id}`);
  }
  findAllImagesById(id) {
    return http.get(`/images?climbingGymId=${id}`);
  }
  findFeatureById(id) {
    return http.get(`/climbingGyms/${id}/features`);
  }
  findNewsById(id) {
    return http.get(`/climbingGyms/${id}/new_news`);
  }
  // todavia no
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
  findCategoryNameById(id) {
    return http.get(`/categories/${id}`);
  }
}
* */