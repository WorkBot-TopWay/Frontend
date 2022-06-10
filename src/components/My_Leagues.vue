<template>
  <div
    v-if="myLeagues.length > 0"
    class="flex align-content-center justify-content-center m-3 flex-column"
  >
    <div class="flex align-content-center justify-content-center">
      <InputText
        class="mr-2"
        v-model="filter"
        placeholder="Search"
        type="text"
        style="width: 20em"
      />
    </div>
  </div>
  <div
    v-if="myLeagues.length > 0"
    class="flex align-content-end justify-content-center"
  >
    <div class="flex flex-wrap m-3 bg-black-alpha-10" style="width: 85%">
      <Card
        class="m-3 col-12 md:col-6 lg:col-3"
        v-for="league of filterByLeague"
        :key="league"
        style="width: 17em"
      >
        <template #header>
          <img alt="user header" :src="league.urlLogo" />
        </template>

        <template #title>
          {{ league.name }}
        </template>

        <template #content>
          <span>Number of participants: {{ league.numberParticipants }}</span>
        </template>

        <template #subtitle>
          {{ league.description }}
        </template>

        <template #footer>
          <Button
            @click="openLeague(gym.name, league.name, league.id)"
            label="Primary"
          >
            Open
          </Button>
        </template>
      </Card>
    </div>
  </div>
  <div
    v-else
    class="flex justify-content-start align-items-center mt-5 flex-column"
  >
    <span class="font text-2xl mb-4"
      >You are not in any league, Join or create one</span
    >
    <Button @click="previousPage" label="Primary"> To accept </Button>
  </div>
</template>

<script>
import { LeagueApiService } from "../topway/services/league-api.service";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";

export default {
  name: "My_Leagues",
  data: () => {
    return {
      filter: "",
      myListLeagues: [],
      myLeagues: [],
      gym: {},
      league_service: new LeagueApiService(),
      climbing_gym_Service: new ClimbingGymsApiService(),
      localTopWay: LocalStoreTopWay,
    };
  },
  computed: {
    climbingGymId() {
      return parseInt(this.$route.params.id);
    },
    // eslint-disable-next-line vue/no-async-in-computed-properties,vue/no-dupe-keys,vue/return-in-computed-property
    filterByLeague() {
      if (this.filter === "") {
        return this.myLeagues;
      } else {
        return this.myLeagues.filter(
          (myLeagues) =>
            myLeagues.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
        );
      }
    },
  },
  created() {
    this.league_service
      .findLeaguesByClimbingGymIdAndScalerId(
        this.climbingGymId,
        this.localTopWay.state.userInfo.id
      ).then((response) => {
        this.myLeagues = response.data;
      });

    this.climbing_gym_Service.findClimbingById(this.climbingGymId).then((response) => {
      this.gym = response.data;
    });
  },
  methods: {
    previousPage() {
      this.$router.go(-1);
    },
    openLeague(name, title, id) {
      this.$router.push(`/${name}/${title}/${id}`);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,500&display=swap");

.font {
  font-family: "Open Sans", sans-serif;
}
</style>