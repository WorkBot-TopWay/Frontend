import http from "../../core/services/http-common";
export class ScalerApiService{
  getAll() {
    return http.get("/scalers");
  }

  get(id) {
    return http.get(`/scalers/${id}`);
  }
  signIn(data) {
    return http.post(`/scalers/sign-in`, data);
  }
  signUp(data) {
    return http.post(`/scalers/sign-up`, data);
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

  findByEmailAndPassword(email, password) {
    return http.get(`/scalers?email=${email}&password=${password}`);
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
    return http.get(`/favorites/${id}/climbing-gyms`);
  }
  findFavoriteByClimbingGymIdAndscalersId(climbingGymId,scalerId) {
    return http.get(`/favorites?climbingGymId=${climbingGymId}&scalerId=${scalerId}`);
  }
  createFavorite(climbingGymId,scalerId,data) { // new
    return http.post(`/favorites?climbingGymId=${climbingGymId}&scalerId=${scalerId}`, data);
  }
  deleteFavorite(climbingGymId,scalerId) { // new
    return http.delete(`/favorites?climbingGymId=${climbingGymId}&scalerId=${scalerId}`);
  }

  ///// Notifications /////
  getAllNotificationsByScalerId(id) {
    return http.get(`/notifications?scalerId=${id}`);
  }
  createNotification(scalerId,data) {
    return http.post(`/notifications?scalerId=${scalerId}`, data);
  }
  deleteNotification(id) {
    return http.delete(`/notifications/${id}`);
  }

}