<template>
  <Toolbar>
    <template #start>
      <Button
        label="Edit information"
        icon="pi pi-pencil"
        class="p-button-success mr-2"
        @click="openEditInformation()"
      />
      <Button label="Add ranking" icon="pi pi-plus" class="p-button-warning" @click="addRanking()"/>
    </template>
    <template #end>
      <Button label="Members" icon="pi pi-users" class="mr-2"  @click="openConfirmation()" />
      <Button v-if="isMyLeague(localTopWay.state.userInfo.id)" label="Remove league" icon="pi pi-trash" class="p-button-danger mr-2" />
      <Button v-else label="Leave the league" icon="pi pi-sign-out" class="p-button-danger mr-2" @click="leaveLeague" />
    </template>
  </Toolbar>
  <div class="flex" style="width: 100%">
    <div style="width: 40%">
      <div class="text-center">
        <Card class="" style="width:100%;">

          <template #header>
            <img class="mt-3"  alt="user header" :src="leagues.url_photo" style="width: 70%">
          </template>

          <template #title>
           {{ leagues.name }}
          </template>
          <template #subtitle>
             <span class="font"> Administrator: {{ isAdmin() }}</span><br>
            <span>Description: {{ leagues.description }} </span><br>
            <span>Number of participants: {{ leagues.number_participants }}</span>
          </template>
          <template #content>
           <div>
             <h2 class="font">Awaiting Requests</h2>
             <div v-if="requestLeague.length>0">
               <DataTable
                 :value="users"
               dataKey="id"
               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
               :rowsPerPageOptions="[5, 10, 15]"
               currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
               responsiveLayout="scroll"
               >
                  <Column field="url_photo" header="Photo" style="min-width: 1rem">
                    <template #body="slotProps">
                      <Avatar
                        class="flex align-content-center justify-content-center m-2"
                        :image="slotProps.data.url_photo"
                        size="large"
                        shape="circle"
                      />
                    </template>
                  </Column>
                  <Column  header="Name" sortable style="min-width: 2rem">
                    <template #body="slotProps">
                      <span>{{ slotProps.data.first_name }} {{ slotProps.data.last_name }}</span>
                    </template>
                  </Column>
                 <Column  header="Pending"  style="min-width: 2rem">
                   <template #body="slotProps">
                     <Button @click="requestAccept(slotProps.data.id)" label="Accept"   class="p-button-raised p-button-success mr-2"/>
                     <Button @click="requestReject(slotProps.data.id,slotProps.data.first_name)" label="Reject" class="p-button-raised p-button-danger"/>
                      </template>
                 </Column>

                </DataTable>
             </div>
              <div v-else>
                <span>No requests</span>
              </div>
           </div>
          </template>
        </Card>
      </div>
    </div>
    <div class="text-center" style="width: 60%">
      <div class="flex justify-content-center align-items-center mt-5 mb-5">
        <h3 class="font m-0 mr-2">Please select a ranking:</h3>
        <Dropdown  inputId="class" v-model="nameSelected" :options="nameCompetition" optionLabel="name" placeholder="Select a type" style="width: 14rem; height: 2.5rem" />
        <Button label="Select" class="p-button-success ml-2" style="height: 2.5rem; width: 8rem" @click="leagueCompetitionsData()"/>
      </div>
      <DataTable
        :value="leagueCompetitions"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll"
      >
        <template #header>
            <h3>{{nameSelected.name}}</h3>
        </template>
        <Column field="url_photo" header="Photo" style="min-width: 1rem">
          <template #body="slotProps">
            <Avatar
              class="flex align-content-center justify-content-center m-2"
              :image="slotProps.data.url_photo"
              size="large"
              shape="circle"
            />
          </template>
        </Column>
        <Column  header="Name" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.first_name }} {{ slotProps.data.last_name }}</span>
          </template>
        </Column>
        <Column  header="Type" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.type }}</span>
          </template>
        </Column>
        <Column  header="Score" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.score }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog header="Members" v-model:visible="displayConfirmation" :style="{width: '700px'}" :modal="true">
      <div class="confirmation-content">
        <DataTable
          :value="usersLeague"
          dataKey="id"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 15]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
          responsiveLayout="scroll"
        >
          <Column field="url_photo" header="Photo" style="min-width: 1rem">
            <template #body="slotProps">
              <Avatar
                class="flex align-content-center justify-content-center m-2"
                :image="slotProps.data.url_photo"
                size="large"
                shape="circle"
              />
            </template>
          </Column>
          <Column  header="Name" sortable style="min-width: 2rem">
            <template #body="slotProps">
              <span>{{ slotProps.data.first_name }} {{ slotProps.data.last_name }}</span>
            </template>
          </Column>
          <Column  header="District" sortable style="min-width: 2rem">
            <template #body="slotProps">
              <span>{{ slotProps.data.district }}</span>
            </template>
          </Column>
          <Column v-if="admin.id===localTopWay.state.userInfo.id" header="Actions"  style="min-width: 2rem">
            <template #body="slotProps">
              <Button @click="deleteMember(slotProps.data.id)" label="remove" icon="pi pi-trash" class="p-button-raised p-button-danger"/>
            </template>
          </Column>
        </DataTable>
      </div>
      <template #footer>
        <Button label="Ok" icon="pi pi-check" @click="closeConfirmation" class="p-button-text"/>
      </template>
    </Dialog>
    <Dialog header="Edit Information" v-model:visible="editInformation" :style="{width: '700px'}" :modal="true">
      <div class="stepsdemo-content flex justify-content-center align-items-center bg-black-alpha-10" style="height: 75vh">
        <Card class="col-12 md:col-6 lg:col-10 ">
          <template v-slot:title>
            Enter your league information
          </template>
          <template v-slot:content>
            <div class="p-fluid">

              <div class="field">
                <label for="name_league">League name</label>
                <InputText id="name_league" v-model="leagues.name" />
              </div>

              <div class="field">
                <label for="url_photo">Url Photo</label>
                <InputText id="url_photo" v-model="leagues.url_photo" />
              </div>

              <div class="field">
                <label for="description">Description (optional)</label>
                <InputText id="description" v-model="leagues.description" />
              </div>

            </div>
          </template>
          <template v-slot:footer>
            <div class="grid grid-nogutter justify-content-end">
              <i></i>
              <Button label="Cancel"  class="p-button-danger"  @click="closeEditInformation()" icon="pi pi-angle-left" />
              <Button label="Accept" class="p-button-success ml-3"  @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
            </div>
          </template>
        </Card>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { LeagueApiService } from "../topway/services/league-api.service";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";
import { ScalerApiService } from "../topway/services/scaler-api.service";

export default {
  name: "LeagueDetails",
  data: () => {
    return {
      flag: true,
      leagues: {},
      nameSelected: "",
      leagueCompetitions: [],
      nameCompetition: [],
      nameRanking:'',
      displayConfirmation: false,
      editInformation:false,
      requestLeague:[],
      admin:{},
      climberId:[],
      userClimber:[],
      userCompetition:[],
      usersLeague:[],
      Competitions:[],
      users:[],
      league_service: new LeagueApiService(),
      scaler_Service: new ScalerApiService(),
      localTopWay: LocalStoreTopWay,
      newClimbersLeague:{
        id: 0,
        scalerId:0,
        leagueId:0,
        climbingGymId: 0,
      },
    }
  },
  computed: {
    leagueId() {
      return parseInt(this.$route.params.id);
    },
  },
 async created() {
    this.league_service.findCompetitionsByLeagueId(this.leagueId).then(response => {
      var num=0;
      this.Competitions = response.data;
      this.Competitions.forEach(element => {
        let aux={};
        aux.name=element.name;
        aux.index=num;
        num++;
        this.nameCompetition.push(aux);
        console.log(this.nameCompetition, "nameCompetition hereeeee");
      });
    });

    this.league_service.findAllLeaguesByLeagueId(this.leagueId).then(response =>{
      response.data.forEach(element => {
        this.scaler_Service.findById(element.scalerId).then(response =>{
          this.usersLeague.push(response.data);
          console.log(this.usersLeague, "usersLeague");
        });
      });
    });
    this.league_service.findLeagueById(this.leagueId).then((response) => {
      this.leagues = response.data;
      console.log(this.leagues);
        this.league_service.findClimbingIdByLeagueIdAndScalerId(this.localTopWay.state.userInfo.id,this.leagues.id).then(element =>{
          this.userClimber = element.data;
          console.log(this.userClimber, "user climber");
        });
      this.scaler_Service.findById(this.leagues.scalerId).then((response) => {
        this.admin = response.data;
      });
    });
    this.league_service.findRequestsByLeagueId(this.leagueId).then((response) => {
      this.requestLeague = response.data;
      console.log(this.requestLeague);
      this.requestLeague.forEach(element =>{
        console.log(element.scalerId);
        this.scaler_Service.findById(element.scalerId).then((response) => {
          this.users.push(response.data);
        });
      });
    });
    /// Climber ///
    this.league_service.getAllLeagues().then(response => {
      this.climberId = response.data;
    });

  },
  methods: {
    closeConfirmation() {
      this.displayConfirmation = false;
    },
    openConfirmation() {
      this.displayConfirmation = true;
    },
    closeEditInformation() {
      this.editInformation = false;
    },
    openEditInformation() {
      this.editInformation = true;
    },
    isMyLeague(id) {
      if (this.leagues.scalerId === id) {
        return true;
      } else {
        return false;
      }
    },
    nextPage() {
      if(this.leagues.name !== "" && this.leagues.url_photo !== ""){
        this.league_service.update(this.leagues.id,this.leagues).then(() => {
          this.editInformation = false;
          this.submitted = false;
          this.validationErrors = {};
        });
        alert("Data was updated");
      }else{
        alert("Please fill all the fields");
      }

    },
    isAdmin(){
      console.log(this.users);
      return this.admin.first_name + " " + this.admin.last_name;
    },
    requestUser(id){
      console.log(id);
    },
    requestAccept(id){
      this.leagues.number_participants++;
      this.league_service.update(this.leagues.id,this.leagues).then(response =>{
        console.log(response);
      });
      this.newClimbersLeague.id =this.climberId[this.climberId.length-1].id+1;
      this.newClimbersLeague.leagueId = this.leagues.id;
      this.newClimbersLeague.scalerId = id;
      this.newClimbersLeague.climbingGymId= this.leagues.climbingGymId;
      console.log(this.newClimbersLeague);
     this.league_service.createClimbersLeague(this.newClimbersLeague).then(response =>{
       console.log(response);
     });
      this.league_service.deleteRequests(this.findRequest(id)).then(response => {
        console.log(this.id, "deleted");
        console.log(response);
        this.$router.go(0);
      });
    },
    requestReject(id,name){
      let index = confirm (`Are you sure you want to reject ${name}?`);
      if(index){
        this.league_service.deleteRequests(this.findRequest(id)).then(response => {
          console.log(this.id, "deleted");
          console.log(response);
          this.$router.go(0);
        });
      }
    },
    findRequest(id){
      for (let index of this.requestLeague){
        if(index.scalerId=== id){
          return index.id;
        }
      }
      return 0;
    },
    async leaveLeague(){
      let index = confirm (`Are you sure you want to leave this league?`);
      if(index){
         this.leagues.number_participants--;
        this.league_service.update(this.leagues.id,this.leagues).then(response =>{
          console.log(response);
        });

          this.league_service.deleteClimbersLeague(this.userClimber[0].id).then(response => {
            console.log(this.id, "deleted");
            console.log(response);
            this.$router.go(-1);
        });
      }
    },
    async deleteMember(id){
      let index = confirm (`Are you sure?`);
      if(index && id!==this.admin.id){
        this.leagues.number_participants--;
        this.league_service.update(this.leagues.id,this.leagues).then(response =>{
          console.log(response);
        });
        this.league_service.findClimbingIdByLeagueIdAndScalerId(id,this.leagues.id).then(element =>{
          this.league_service.deleteClimbersLeague(element.data[0].id).then(response => {
            console.log(response,"deleted");
            this.$router.go(0);
          });
        });
      }else {
        alert("You cannot delete yourself, as you are the league administrator.")
      }
    },
    addRanking(){
      this.$router.push(`/Ranking/${this.leagues.name}/${this.leagues.id}`);
    },
    loadingCompetition(index){
      this.userCompetition = [];
      var type = this.Competitions[index].type;
      this.Competitions[index].competitions_ranking.forEach(response =>{
        var score =response.score;
          this.scaler_Service.findById(response.scalerId).then(response =>{
            let data = {};
            data = response.data;
            data.score = score;
            data.type = type;
            this.userCompetition.push(data);
        });
      });
    },
    leagueCompetitionsData(){
      this.leagueCompetitions = [];
      this.loadingCompetition(this.nameSelected.index);
      this.leagueCompetitions =  this.userCompetition;
    }
  },

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,500&display=swap");

.font {
  font-family: "Open Sans", sans-serif;
}
.size{
  width: 100%;
}
</style>
