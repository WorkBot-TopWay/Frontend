<template>
  <div
    class="
      stepsdemo-content
      flex
      justify-content-center
      align-items-center
      bg-black-alpha-10
    "
  >
    <Card class="col-12 md:col-6 lg:col-10 mt-5 mb-5">

      <template v-slot:title> Ranking Information </template>
      <template v-slot:subtitle> Enter your ranking information </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="Participants" v-if="values">
            <div class="flex flex-row align-items-center justify-content-between">
              <h2>Participants</h2>
              <Button
                label="Next participant"
                class="p-button-success"
                v-if="!(userGymCompetition.length === index)"
                @click="addParticipant"
                style="width: 10em"
              />
            </div>

            <div class="field" v-if="!(userGymCompetition.length === index)">
              <div class="p-fluid">
                <div class="field">
                  <label for="name">Participant's name</label>
                  <InputText id="name" :value="fullName(object)" disabled />
                </div>
                <div class="field">
                  <label for="score">Score</label>
                  <InputNumber
                    id="score"
                    v-model="value"
                    :useGrouping="false"
                    :class="{ 'p-invalid': validationErrors.value && submitted }"
                  />
                  <small
                    v-show="validationErrors.value && submitted"
                    class="p-error"
                  >Score is required.</small
                  >
                </div>
              </div>
            </div>
            <div v-else>
              <h3>There are no more participants to register</h3>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between" v-if="userGymCompetition.length === index">
          <i></i>
          <Button
            label="Next"
            @click="nextPage()"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>

    </Card>
  </div>
</template>

<script>
import { ClimbingGymsApiService } from "../../services/climbing-gyms-api.service";
import { ScalerApiService } from "../../services/scaler-api.service";
import { LeagueApiService } from "../../services/league-api.service";

export default {
  name: "ClimbingGymRanking",
  data: () => {
    return {
      idRank: 0,
      submitted: true,
      validationErrors: {},
      value: 0,
      index: 0,
      values: true,
      object: {},
      userGymCompetition: [],
      league: {},
      competitions_ranking: [],
      competitions_league: {
        id: 1,
        leagueId: 0,
        name: "",
        date: new Date(),
        type: "",
        competitions_ranking: [],
      },
      climbing_gym_Service: new ClimbingGymsApiService(),
      scaler_Service: new ScalerApiService(),
      league_service: new LeagueApiService(),
    };
  },
  computed: {
    competitionId() {
      return parseInt(this.$route.params.id);
    },
  },
  async created() {
    /// user of the competition gym
    this.climbing_gym_Service
      .findCompetitionReservationByCompetitionGymId(this.competitionId)
      .then((response) => {
        this.userGymCompetition = response.data;
        if (this.userGymCompetition.length > 0) {
          this.object = this.userGymCompetition[0];
        }
      });
  },
  methods: {
    fullName(user) {
      return user.firstName + " " + user.lastName;
    },
    scoreRank() {
      console.log(this.score, "score complete");
    },
    addParticipant() {
      this.submitted = true;
      if (this.validateForm()) {
        if (!(this.userGymCompetition.length === this.index)) {
          let aux = {
            score: this.value,
          };
          this.climbing_gym_Service.createRanking(this.competitionId,this.object.id,aux).then((response) => {
            console.log(response.data, "response");
          });
        }
        this.index++;
        if (!(this.userGymCompetition.length === this.index)) {
          this.object = this.userGymCompetition[this.index];
          this.value = 0;
        }
      }
    },
    validateForm() {
      if (!this.value > 0) this.validationErrors["value"] = true;
      else delete this.validationErrors["value"];

      return !Object.keys(this.validationErrors).length;
    },
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        alert("Competition created successfully");
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>

</style>