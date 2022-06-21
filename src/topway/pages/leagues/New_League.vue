<template>
  <div
    class="
      stepsdemo-content
      flex
      justify-content-center
      align-items-center
      bg-black-alpha-10
    "
    style="height: 85vh"
  >
    <Card class="col-12 md:col-6 lg:col-10">
      <template v-slot:title> New League </template>
      <template v-slot:subtitle> Enter your new league information </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="name_league">League name</label>
            <InputText
              id="name_league"
              v-model="name_league"
              :class="{
                'p-invalid': validationErrors.name_league && submitted,
              }"
            />
            <small
              v-show="validationErrors.name_league && submitted"
              class="p-error"
              >league name is required.</small
            >
          </div>

          <div class="field">
            <label for="url_photo">Url Photo</label>
            <InputText
              id="url_photo"
              v-model="url_photo"
              :class="{ 'p-invalid': validationErrors.url_photo && submitted }"
            />
            <small
              v-show="validationErrors.url_photo && submitted"
              class="p-error"
              >Url photo is required.</small
            >
          </div>

          <div class="field">
            <label for="description">Description (optional)</label>
            <InputText id="description" v-model="description" />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between">
          <i></i>
          <Button
            label="To Accept"
            class="p-button-success"
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
import { LeagueApiService } from "../../../topway/services/league-api.service";
import { LocalStoreTopWay } from "../../../LocalStore/LocalStoreTopWay";
import { ClimbingGymsApiService } from "../../../topway/services/climbing-gyms-api.service";

export default {
  name: "New_League",
  data: () => {
    return {
      submitted: false,
      value: true,
      validationErrors: {},
      league: [],
      climberId: 0,
      climberLeague: [],
      id: 0,
      name_league: "",
      url_photo: "",
      description: "",
      league_service: new LeagueApiService(),
      localTopWay: LocalStoreTopWay,
      climbing_gym_Service: new ClimbingGymsApiService(),
      nameGym: "",
    };
  },
  computed: {
    climbingGymId() {
      return parseInt(this.$route.params.id);
    },
  },
  mounted() {
    this.league_service.getAll().then((response) => {
      this.league = response.data;
      this.id = this.league.length + 1;
    });
    /// Gym ///
    this.climbing_gym_Service
      .findClimbingById(this.climbingGymId)
      .then((response) => {
        this.nameGym = response.data.name;
      });
  },
  methods: {
    async nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        // Create new league
          let data ={};
          data.name=this.name_league;
          data.urlLogo=this.url_photo;
          data.description=this.description;
          this.league_service.create(this.climbingGymId, this.localTopWay.state.userInfo.id, data).then((response) => {
          console.log(response);
            alert("Registro lo datos correctamente");
            //this.value=false;
            let dataClimberLeague = {};
            this.league_service.findLeagueByClimbingGymId(this.climbingGymId).then((response) => {
              this.climberLeague=response.data[response.data.length-1];
              console.log(this.climberLeague, "climberLeague data");
              this.league_service.createClimberLeagues(this.climbingGymId, this.localTopWay.state.userInfo.id,  this.climberLeague.id, dataClimberLeague).then((response) => {
                console.log(response);
                this.$router.push(`/${this.nameGym}/${this.climbingGymId}/MyLeagues`);
              });
            });
        });
      }
    },
    validateForm() {
      if (!this.name_league.trim()) this.validationErrors["name_league"] = true;
      else delete this.validationErrors["name_league"];

      if (!this.url_photo.trim()) this.validationErrors["url_photo"] = true;
      else delete this.validationErrors["url_photo"];

      return !Object.keys(this.validationErrors).length;
    },
    createClimberLeague() {
      ////ClimbersLeague////
      let dataClimberLeague = {};
      this.league_service.findLeagueByClimbingGymId(this.climbingGymId).then((response) => {
        this.climberLeague=response.data[response.data.length-1];
        console.log(this.climberLeague, "climberLeague data");
        this.league_service.createClimberLeagues(this.climbingGymId, this.localTopWay.state.userInfo.id,  this.climberLeague.id, dataClimberLeague).then((response) => {
          console.log(response);

          this.$router.push(`/${this.nameGym}/${this.climbingGymId}/MyLeagues`);
        });
      });
    },
  },
};
</script>

<style scoped>
</style>