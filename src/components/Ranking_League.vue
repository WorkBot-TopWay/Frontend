<template>
  <div class="stepsdemo-content flex justify-content-center align-items-center bg-black-alpha-10">
    <Card class="col-12 md:col-6 lg:col-10 mt-5 mb-5">
      <template v-slot:title>
        Ranking Information
      </template>
      <template v-slot:subtitle>
        Enter your ranking information
      </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="name">Competition name</label>
            <InputText id="name" v-model="name" :class="{'p-invalid': validationErrors.name && submitted}" />
            <small v-show="validationErrors.name && submitted" class="p-error">email is required.</small>
          </div>
          <div class="field">
            <label for="class">Type</label>
            <Dropdown inputId="class" v-model="selectedType" :options="word" optionLabel="name" placeholder="Select a type" />
            <small v-show="validationErrors.selectedType && submitted" class="p-error">Requires you to select one</small>
          </div>
          <div class="flex flex-row align-items-center justify-content-between">
            <h2>Participants</h2>
            <Button label="Next participant" class="p-button-success" v-if="!(usersLeague.length===index)"  @click="addParticipant" style="width: 10em"  />
          </div>

          <div class="field"  v-if="!(usersLeague.length===index)">
            <div class="p-fluid">
              <div class="field">
              <label for="name">Participant's name</label>
              <InputText id="name" :value="fullName(object)" disabled />
              </div>
              <div class="field">
                <label for="score">Score</label>
                <InputNumber id="score" v-model="value" :useGrouping="false" :class="{'p-invalid': validationErrors.value && submitted}"/>
                <small v-show="validationErrors.value && submitted" class="p-error">Score is required.</small>
              </div>
            </div>
          </div>
          <div v-else>
            <h3>There are no more participants to register</h3>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between">
          <i></i>
          <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";
import { LeagueApiService } from "../topway/services/league-api.service";
import { ScalerApiService } from "../topway/services/scaler-api.service";

export default {
  name: "Ranking_League",
  data:()=>{
    return{
      idRank: 0,
      submitted: true,
      validationErrors: {},
      value: 0,
      index: 0,
      object: {},
      usersLeague: [],
      name: '',
      selectedType: '',
      word:[],
      league:[],
      competitions_ranking:[],
      tags: [],
      competitions_league:
        {
          id: 1,
          leagueId: 0,
          name:'',
          date: new Date(),
          type: '',
          competitions_ranking: []
        },
      climbing_gym_Service: new ClimbingGymsApiService(),
      scaler_Service: new ScalerApiService(),
      league_service: new LeagueApiService(),
    }
  },
  computed: {
    leagueId() {
      return parseInt(this.$route.params.id);
    },
  },
  async created() {
    this.league_service.findAllCompetitions().then(response => {
      this.idRank = response.data.length+1;
    });
    this.league_service.findAllLeaguesByLeagueId(this.leagueId).then(response =>{
      response.data.forEach(element => {
        this.scaler_Service.findById(element.scalerId).then(response =>{
          this.usersLeague.push(response.data);
          if(this.submitted){
           this.object = this.usersLeague[0];
           console.log(this.object, 'object');
           this.submitted = false;
          }
        });
      });
    });
    this.league_service.findLeagueById(this.leagueId).then(response => {
      /////////// Tag Climbing Gym Data  ////////////
      this.league = response.data;
      console.log(this.league,"league");
      this.climbing_gym_Service
        .findClimbingById(this.league.climbingGymId)
        .then((response) => {
          this.tags = response.data.category_gyms;
          this.tags.forEach((element) => {
            this.climbing_gym_Service
              .findCategoryNameById(element.categoryId)
              .then((response) => {
                let Tag={};
                Tag.name=response.data.name;
                this.word.push(Tag);
              })
              .catch((e) => {
                console.log(e);
              });
            console.log(this.word);
          });
        })
        .catch((e) => {
          console.log(e);
        });
      ///////////////////////////////////////////
    });

  },
  methods: {
    fullName(user) {
      return user.first_name + " " + user.last_name;
    },
    scoreRank() {
      console.log(this.score, "score complete");
    },
    addParticipant() {
      this.submitted = true;
      if (this.validateForm()) {
      if (!(this.usersLeague.length === this.index)) {
        let aux = {
          id: this.index,
          scalerId: this.object.id,
          score: this.value,
        };
        this.competitions_ranking.push(aux);
      }
      this.index++;
      if (!(this.usersLeague.length === this.index)) {
        this.object = this.usersLeague[this.index];
        this.value = 0;
        }
      }
    },
    validateForm() {
      if (!this.name.trim())
        this.validationErrors['name'] = true;
      else
        delete this.validationErrors['name'];

      if (this.selectedType.length == 0)
        this.validationErrors['selectedType'] = true;
      else
        delete this.validationErrors['selectedType'];

      if (!this.value > 0)
        this.validationErrors['value'] = true;
      else
        delete this.validationErrors['value'];

      return !Object.keys(this.validationErrors).length;
    },
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        this.competitions_league.id = this.idRank;
        this.competitions_league.leagueId = this.leagueId;
        this.competitions_league.name = this.name;
        this.competitions_league.type = this.selectedType.name;
        this.competitions_league.date = new Date();
        this.competitions_league.competitions_ranking = this.competitions_ranking;
        console.log(this.competitions_league, "competitions_league");
        this.league_service.createCompetitions(this.competitions_league).then(response => {
          console.log(response.data, "response");
          alert("Competition created successfully");
          this.$router.go(-1);
        });
      }
    }
  }
};
</script>

<style scoped>

</style>