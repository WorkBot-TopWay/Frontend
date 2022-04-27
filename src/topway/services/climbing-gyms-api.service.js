import http from "../../core/services/http-common";
export class ClimbingGymsApiService {
  getAll() {
    return http.get("/climbing-gyms");
  }

  get(id) {
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
  findByTitle(title) {
    return http.get(`/climbing-gyms?title=${title}`);
  }

}