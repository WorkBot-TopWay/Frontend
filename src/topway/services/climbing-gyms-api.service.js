import http from "../../core/services/http-common";
export class ClimbingGymsApiService {
  getAll() {
    return http.get("/climbingGyms");
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

}