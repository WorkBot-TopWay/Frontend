<template>
  <div class="flex align-content-end justify-content-center">
    <div class="flex flex-wrap m-3 bg-black-alpha-10" style="width: 85%" v-if="informationObject(favorites)">
      <Card
        class="m-3 col-12 md:col-6 lg:col-3"
        v-for="gym of favorites"
        :key="gym"
        style="width: 17em"
      >
        <template #header>
          <img alt="user header" :src="gym.logoUrl" />
        </template>

        <template #title>
          {{ gym.name }}
        </template>

        <template #content>
          <Rating v-model="val" :cancel="false" />
        </template>

        <template #subtitle>
          {{ gym.district }}
        </template>

        <template #footer>
          <Button @click="seeMore(gym.id, gym.name)" label="Primary">
            See more
          </Button>
        </template>
      </Card>
    </div>
    <div v-else>
      <h2 class="font">You do not follow any climbing gym</h2>
    </div>
  </div>
</template>

<script>
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";
import { ScalerApiService } from "../topway/services/scaler-api.service";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";

export default {
  name: "FavoriteScaler",
  data: () => {
    return {
      favorites: [],
      climbing_gym_Service: new ClimbingGymsApiService(),
      scaler_Service: new ScalerApiService(),
      localTopWay: LocalStoreTopWay,
    };
  },
  created() {
    this.scaler_Service
      .findFavoriteByScalerId(this.localTopWay.state.userInfo.id)
      .then((res) => {
        this.favorites = res.data;
      });
  },
  methods: {
    seeMore(id, name) {
      console.log(id, "See more");
      this.$router.push(`/features/${id}/${name}`);
    },
    informationObject(object) {
      if (
        object === undefined ||
        object === null ||
        Object.entries(object).length === 0
      ) {
        return false;
      }
      return true;
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Suez+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,500&display=swap");

.font {
  font-family: "Open Sans", sans-serif;
}
</style>