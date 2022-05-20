<template>
  <div
    v-if="filterByLeague.length > 0"
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
    v-if="filterByLeague.length > 0"
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
          <img alt="user header" :src="league.url_photo" />
        </template>

        <template #title>
          {{ league.name }}
        </template>

        <template #content>
          <span>Number of participants: {{ league.number_participants }}</span>
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
</template>

<script>
import { LeagueApiService } from "../topway/services/league-api.service";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";

export default {
  name: "Join_League",
  data: () => {
    return {
      filter: "",
      status: ["Send request", "Request sent", "You are already a member"],
      request: [],
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
    this.league_service
      .findAllLeaguesByClimbingGymId(this.climbingGymId)
      .then((response) => {
        this.listUserLeagues = response.data;
        console.log(this.listUserLeagues);
      });
    this.league_service
      .findLeagueByClimbingGymId(this.climbingGymId)
      .then((response) => {
        this.LeaguesTheGym = response.data;
      });
    this.league_service.getAllRequests().then((response) => {
      this.idRequest = response.data;
      console.log(this.idRequest, "idRequest");
    });
    this.league_service
      .findRequestsByScalerId(this.localTopWay.state.userInfo.id)
      .then((response) => {
        this.request = response.data;
      });
  },
  methods: {
    youAreAlreadyAMember() {
      alert("You are already a member");
    },
    youAreAlreadyPart(id) {
      console.log(this.listUserLeagues, "listUserLeagues");
      for (let index of this.listUserLeagues) {
        if (
          this.localTopWay.state.userInfo.id == index.scalerId &&
          index.leagueId == id
        ) {
          return true;
        }
      }
      return false;
    },
    requestSent(id) {
      for (let index of this.request) {
        if (
          index.leagueId === id &&
          index.scalerId === this.localTopWay.state.userInfo.id
        ) {
          return true;
        }
      }
      return false;
    },
    requestSentData(id) {
      let index = confirm(
        "You have already submitted a request, do you want to cancel it?"
      );
      if (index) {
        this.league_service
          .deleteRequests(this.findRequest(id))
          .then((response) => {
            console.log(this.id, "deleted");
            console.log(response);
            this.$router.go(0);
          });
      }
    },
    sendRequest(id) {
      alert("You have already submitted a request");
      this.newRequest.id = this.idRequest.length + 1;
      this.newRequest.leagueId = id;
      this.newRequest.scalerId = this.localTopWay.state.userInfo.id;
      ///// Loading the request /////
      this.league_service.createRequests(this.newRequest).then((response) => {
        console.log(response);
        this.$router.go(0);
      });
    },
    findRequest(id) {
      for (let index of this.request) {
        if (index.leagueId === id) {
          return index.id;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>