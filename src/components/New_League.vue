<template>
  <div class="stepsdemo-content flex justify-content-center align-items-center bg-black-alpha-10" style="height: 85vh">
    <Card class="col-12 md:col-6 lg:col-10 ">
      <template v-slot:title>
        New League
      </template>
      <template v-slot:subtitle>
        Enter your new league information
      </template>
      <template v-slot:content>
        <div class="p-fluid">

          <div class="field">
            <label for="name_league">League name</label>
            <InputText id="name_league" v-model="name_league" :class="{'p-invalid': validationErrors.name_league && submitted}" />
            <small v-show="validationErrors.name_league && submitted" class="p-error">league name is required.</small>
          </div>

          <div class="field">
            <label for="url_photo">Url Photo</label>
            <InputText id="url_photo" v-model="url_photo" :class="{'p-invalid': validationErrors.url_photo && submitted}" />
            <small v-show="validationErrors.url_photo && submitted" class="p-error">Url photo is required.</small>
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
          <Button label="Next" class="p-button-success"  @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { LeagueApiService } from "../topway/services/league-api.service";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";

export default {
  name: "New_League",
  data:()=>{
    return{
      submitted: false,
      validationErrors: {},
      league:[],
      climberId: 0,
      id: 0,
      name_league: '',
      url_photo: '',
      description: '',
      league_service: new LeagueApiService(),
      localTopWay: LocalStoreTopWay,
      climbing_gym_Service: new ClimbingGymsApiService(),
      nameGym: '',
      newClimbersLeague:{
        id: 0,
        scalerId:0,
        leagueId:0,
        climbingGymId: 0,
      },
      newLeague:{
        id:0,
        scalerId:0,
        climbingGymId: 0,
        name: '',
        description: '',
        url_photo: '',
        number_participants: 1,
      }
    }
  },
  computed: {
    climbingGymId() {
      return parseInt(this.$route.params.id);
    },
  },
  mounted() {
    this.league_service.getAll().then(response => {
      this.league = response.data;
      this.id= this.league.length + 1;
    });
    /// Gym ///
    this.climbing_gym_Service.findClimbingById(this.climbingGymId).then((response) => {
      this.nameGym = response.data.name;
    });
    /// Climber ///
    this.league_service.getAllLeagues().then(response => {
      this.climberId= response.data.length + 1;
    });
  },
  methods:{
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        this.newLeague.id = this.id;
        this.newLeague.name = this.name_league;
        this.newLeague.description = this.description;
        this.newLeague.url_photo = this.url_photo;
        this.newLeague.scalerId = this.localTopWay.state.userInfo.id;
        this.newLeague.climbingGymId = this.climbingGymId;
        ////ClimbersLeague////
        this.newClimbersLeague.id = this.climberId;
        this.newClimbersLeague.scalerId= this.localTopWay.state.userInfo.id;
        this.newClimbersLeague.leagueId= this.id;
        this.newClimbersLeague.climbingGymId= this.climbingGymId;

        console.log(this.newLeague,this.newClimbersLeague);
        this.createLeague(this.newLeague,this.newClimbersLeague);
        alert("Registro lo datos correctamente");
        this.$router.push(`/${this.nameGym}/${this.climbingGymId}/MyLeagues`);
      }
    },
    validateForm(){
      if (!this.name_league.trim())
        this.validationErrors['name_league'] = true;
      else
        delete this.validationErrors['name_league'];

      if (!this.url_photo.trim())
        this.validationErrors['url_photo'] = true;
      else
        delete this.validationErrors['url_photo'];

      return !Object.keys(this.validationErrors).length;
    },
    createLeague(league, climbersLeague){
      ///// New ClimbersLeague /////
      this.league_service.createClimbersLeague(climbersLeague).then(response => {
        console.log(response);
      }).catch((e) => {
        console.log(e);
      });
      ///// New League /////
      this.league_service.create(league).then(response => {
        console.log(response);
      }).catch((e) => {
        console.log(e);
      });
    }
  },
};
</script>

<style scoped>

</style>