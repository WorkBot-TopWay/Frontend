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
          <div class="field">
            <div class="competition" v-if="!values">
            <label for="name">Competition name</label>
            <InputText
              id="name"
              v-model="name"
              :class="{ 'p-invalid': validationErrors.name && submitted }"
            />
            <small v-show="validationErrors.name && submitted" class="p-error"
              >Name is required.</small
            >

          <div class="field">
            <label for="class">Type</label>
            <Dropdown
              inputId="class"
              v-model="selectedType"
              :options="tags"
              optionLabel="name"
              placeholder="Select a type"
            />
            <small
              v-show="validationErrors.selectedType && submitted"
              class="p-error"
              >Requires you to select one</small
            >
          </div>
            </div>
          </div>
          <div class="Participants" v-if="values">
          <div class="flex flex-row align-items-center justify-content-between">
            <h2>Participants</h2>
            <Button
              label="Next participant"
              class="p-button-success"
              v-if="!(usersLeague.length === index)"
              @click="addParticipant"
              style="width: 10em"
            />
          </div>

          <div class="field" v-if="!(usersLeague.length === index)">
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
        <div class="grid grid-nogutter justify-content-between" v-if="values">
          <i></i>
          <Button
            label="Next"
            @click="nextPage()"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
        <div class="grid grid-nogutter justify-content-between" v-if="!values">
          <i></i>
          <Button
            label="Next"
            @click="addCompetition()"
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
import { LeagueApiService } from "../../services/league-api.service";
import { ScalerApiService } from "../../services/scaler-api.service";

export default {
  name: "Ranking_League",
  data: () => {
    return {
      idRank: 0,
      submitted: true,
      validationErrors: {},
      value: 0,
      index: 0,
      competition: {},
      values: false,
      object: {},
      usersLeague: [],
      name: "",
      selectedType: "",
      league: {},
      competitions_ranking: [],
      tags: [],
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
    leagueId() {
      return parseInt(this.$route.params.id);
    },
  },
  async created() {
    // user of the league
    this.league_service.findScalersByLeagueId(this.leagueId).then((response) => {
      this.usersLeague = response.data;
      if (this.usersLeague.length > 0) {
        this.object = this.usersLeague[0];
      }

      console.log(this.usersLeague, "users");
    });
    // League
    this.league_service.findLeagueById(this.leagueId).then((response) => {
      this.league = response.data;
      console.log(this.league, "leagues here");
      /// Tag list
      this.climbing_gym_Service
        .findCategoryByClimbingGymId(this.league.climbingGymId)
        .then( response =>{
          this.tags = response.data;
          console.log(this.tags, "tags");
        });
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
        if (!(this.usersLeague.length === this.index)) {
          let aux = {
            score: this.value,
          };
          this.league_service.createCompetitionRankings(this.competition.id,this.object.id,aux).then((response) => {
            console.log(response.data, "response");
          });
        }
        this.index++;
        if (!(this.usersLeague.length === this.index)) {
          this.object = this.usersLeague[this.index];
          this.value = 0;
        }
      }
    },
    validateFormCompetition() {
      if (!this.name.trim()) this.validationErrors["name"] = true;
      else delete this.validationErrors["name"];

      if (this.selectedType.length == 0)
        this.validationErrors["selectedType"] = true;
      else delete this.validationErrors["selectedType"];

      return !Object.keys(this.validationErrors).length;
    },
    validateForm() {
      if (!this.value > 0) this.validationErrors["value"] = true;
      else delete this.validationErrors["value"];

      return !Object.keys(this.validationErrors).length;
    },
    addCompetition() {
        this.submitted = true;
        if (this.validateFormCompetition()) {
        let data={};
        data.name = this.name;
        data.type = this.selectedType.name;
        console.log(data, "data competition");
          this.league_service
            .createCompetitions(this.leagueId, data).then((response) => {
              if (response.status == 200) {
                this.values = true;
                this.league_service
                  .findCompetitionsByLeagueId(this.leagueId).then((response) => {
                  this.competition = response.data[response.data.length - 1];
                  console.log(this.competition, "competition");
                  });
              }
            });
        }
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