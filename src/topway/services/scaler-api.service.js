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
  getAllNotifications() {
    return http.get("/notifications");
  }
  getAllNotificationsByScalerId(id) {
    return http.get(`/notifications?scalerId=${id}`);
  }
  createNotification(data) {
    return http.post("/notifications", data);
  }
  deleteNotification(id) {
    return http.delete(`/notifications/${id}`);
  }

}