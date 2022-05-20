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

  /////// Favorites ///////
  getAllFavoritesWithData(id) {
    return http.get(`/scalers/${id}/?_embed=favorites`);
  }
  getAllFavorites() {
    return http.get("/favorites");
  }
  findFavoriteById(id) {
    return http.get(`/scalers/${id}/favorites`);
  }
  findFavoriteByScalerId(id){
    return http.get(`/favorites?scalerId=${id}`);
  }
  findFavoriteByscalersIdAndClimbingGymId(id,id2) {
    return http.get(`/favorites?scalerId=${id}&climbingGymId=${id2}`);
  }
  createFavorite(data) {
    return http.post("/favorites", data);
  }

  detectFavorite(id) {
    return http.delete(`/favorites/${id}`);
  }

}