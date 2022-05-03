import http from "../../core/services/http-common";

export class ScalerApiService{
  getAll() {
    return http.get("/scalers");
  }

  get(id) {
    return http.get(`/scalers/${id}`);
  }
  create(data) {
    return http.post("/scalers", data);
  }
  update(id, data) {
    return http.put(`/scalers/${id}`, data);
  }
  delete(id) {
    return http.delete(`/scalers/${id}`);
  }
  findById(id) {
    return http.get(`/scalers/${id}`);
  }
  getAllFavorites(id) {
    return http.get(`/scalers/${id}/?_embed=favorites`);
  }

}