<template>
  <div class="flex align-content-end justify-content-center">
    <div class="flex flex-wrap m-3 bg-black-alpha-10" style="width: 85%">
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
  },
};
</script>

<style scoped>
</style>