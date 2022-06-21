<template>
  <div
    v-if="LeaguesTheGym.length > 0"
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
    v-if="LeaguesTheGym.length > 0"
    class="flex align-content-end justify-content-center"
  >
    <div class="flex flex-wrap m-3 bg-black-alpha-10" style="width: 85%">
      <Card
        class="m-3 col-12 md:col-6 lg:col-3"
        v-for="league of filterByLeague"
        :key="league.id"
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
          <div v-if="youAreAlreadyPart(league.id)">
            <Button
              @click="youAreAlreadyAMember()"
              class="p-button-secondary"
              label="Primary"
              >You are already a member</Button
            >
          </div>
          <div v-else>
            <Button
              v-if="requestSent(league.id)"
              @click="requestSentData(league.id)"
              label="Primary"
            >
              Request Send
            </Button>
            <Button
              v-else
              @click="sendRequest(league.id)"
              class="p-button-secondary"
              >Send request</Button
            >
          </div>
        </template>
      </Card>
    </div>
  </div>
  <div
    v-else
    class="flex justify-content-start align-items-center mt-5 flex-column"
  >
    <span class="font text-2xl mb-4"
    >At the moment there is no league, be the first to create one</span
    >
    <Button @click="previousPage" label="Primary"> To accept </Button>
  </div>
</template>

<script>
import { LeagueApiService } from "../../services/league-api.service";
import { LocalStoreTopWay } from "../../../LocalStore/LocalStoreTopWay";

export default {
  name: "Join_League",
  data: () => {
    return {
      filter: "",
      status: ["Send request", "Request sent", "You are already a member"],
      request: [],
      requests: [],
      idRequest: 0,
      id: 0,
      flag: 0,
      LeaguesTheGym: [],
      listUserLeagues: [],
      league_service: new LeagueApiService(),
      localTopWay: LocalStoreTopWay,
      newRequest: {
        id: 0,
        leagueId: 0,
        scalerId: 0,
        status: "Pending",
      },
    };
  },
  computed: {
    climbingGymId() {
      return parseInt(this.$route.params.id);
    },
    // eslint-disable-next-line vue/no-async-in-computed-properties,vue/no-dupe-keys,vue/return-in-computed-property
    filterByLeague() {
      if (this.filter === "") {
        return this.LeaguesTheGym;
      } else {
        return this.LeaguesTheGym.filter((league) =>
          league.name.toLowerCase().includes(this.filter.toLowerCase())
        );
      }
    },
  },
  created() {
    //Load all leagues by climbing gym id
    this.league_service
      .findLeagueByClimbingGymId(this.climbingGymId)
      .then((response) => {
        this.LeaguesTheGym = response.data;
      });
    //Load League of the user
  this.league_service.findLeaguesByClimbingGymIdAndScalerId(this.climbingGymId, this.localTopWay.state.userInfo.id).then((response) => {
    this.listUserLeagues = response.data;
  });
  //Load all requests of the user
    this.league_service.findRequestsLeagueByScalerId(this.localTopWay.state.userInfo.id).then((response) => {
      this.requests = response.data;
    });
  },
  methods: {
    previousPage() {
      this.$router.go(-1);
    },
    youAreAlreadyAMember() {
      alert("You are already a member");
    },
    youAreAlreadyPart(id) {
      for (let i = 0; i < this.listUserLeagues.length; i++) {
        if (this.listUserLeagues[i].id === id) {
          console.log("true");
          return true;
        }
      }
      console.log("false");
      return false;
    },
    requestSent(id) {
      if(this.requests.length === 0){
        return false;
      }else {
        for (let i = 0; i < this.requests.length; i++) {
          if (this.requests[i].leagueId === id) {
            return true;
          }
        }
        return false;
      }
    },
    requestSentData(id) {
      let index = confirm(
        "You have already submitted a request, do you want to cancel it?"
      );
      if (index) {
        this.league_service
          .deleteRequestByScalerIdAndLeagueId(this.localTopWay.state.userInfo.id, id)
          .then((response) => {
            console.log(this.id, "deleted");
            console.log(response);
            this.$router.go(0);
          });
      }
    },
    sendRequest(id) {
      alert("You have already submitted a request");
      let data={};
      ///// Loading the request /////
      this.league_service.createRequestByScalerIdAndLeagueId(this.localTopWay.state.userInfo.id, id,data).then((response) => {
        console.log(response);
        this.$router.go(0);
      });
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