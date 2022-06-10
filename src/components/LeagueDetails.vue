<template>
  <Toolbar>
    <template #start>
      <Button
        label="Edit information"
        icon="pi pi-pencil"
        class="p-button-success mr-2"
        @click="openEditInformation()"
      />
      <Button
        label="Add ranking"
        icon="pi pi-plus"
        class="p-button-warning"
        @click="addRanking()"
      />
    </template>
    <template #end>
      <Button
        label="Members"
        icon="pi pi-users"
        class="mr-2"
        @click="openConfirmation()"
      />
      <Button
        v-if="isMyLeague(localTopWay.state.userInfo.id)"
        label="Remove league"
        icon="pi pi-trash"
        class="p-button-danger mr-2"
      />
      <Button
        v-else
        label="Leave the league"
        icon="pi pi-sign-out"
        class="p-button-danger mr-2"
        @click="leaveLeague"
      />
    </template>
  </Toolbar>
  <div class="flex" style="width: 100%">
    <div style="width: 40%">
      <div class="text-center">
        <Card class="" style="width: 100%">
          <template #header>
            <img
              class="mt-3"
              alt="user header"
              :src="leagues.urlLogo"
              style="width: 70%"
            />
          </template>

          <template #title>
            {{ leagues.name }}
          </template>
          <template #subtitle>
            <span class="font"> Administrator: {{ leagues.adminName }}</span
            ><br />
            <span>Description: {{ leagues.description }} </span><br />
            <span
              >Number of participants: {{ leagues.numberParticipants }}</span
            >
          </template>
          <template #content>
            <div>
              <h2 class="font">Awaiting Requests</h2>
              <div v-if="requestLeague.length > 0">
                <DataTable
                  :value="requestLeague"
                  dataKey="id"
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  :rowsPerPageOptions="[5, 10, 15]"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
                  responsiveLayout="scroll"
                >
                  <Column
                    field="url_photo"
                    header="Photo"
                    style="min-width: 1rem"
                  >
                    <template #body="slotProps">
                      <Avatar
                        class="
                          flex
                          align-content-center
                          justify-content-center
                          m-2
                        "
                        :image="slotProps.data.urlPhoto"
                        size="large"
                        shape="circle"
                      />
                    </template>
                  </Column>
                  <Column header="Name" sortable style="min-width: 2rem">
                    <template #body="slotProps">
                      <span
                        >{{ slotProps.data.firstName }}
                        {{ slotProps.data.lastName }}</span
                      >
                    </template>
                  </Column>
                  <Column header="Pending" style="min-width: 2rem">
                    <template #body="slotProps">
                      <Button
                        @click="requestAccept(slotProps.data.id)"
                        label="Accept"
                        class="p-button-raised p-button-success mr-2"
                      />
                      <Button
                        @click=" requestReject(slotProps.data.id,slotProps.data.firstName)"
                        label="Reject"
                        class="p-button-raised p-button-danger"
                      />
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
        <Dropdown
          inputId="class"
          v-model="nameSelected"
          :options="nameCompetition"
          optionLabel="name"
          placeholder="Select a type"
          style="width: 14rem; height: 2.5rem"
        />
        <Button
          label="Select"
          class="p-button-success ml-2"
          style="height: 2.5rem; width: 8rem"
          @click="leagueCompetitionsData()"
        />
      </div>
      <DataTable
        :value="userCompetition"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll"
      >
        <template #header>
          <h3>{{ nameSelected.name }}</h3>
        </template>
        <Column field="url_photo" header="Photo" style="min-width: 1rem">
          <template #body="slotProps">
            <Avatar
              class="flex align-content-center justify-content-center m-2"
              :image="slotProps.data.urlPhoto"
              size="large"
              shape="circle"
            />
          </template>
        </Column>
        <Column header="Name" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span
              >{{ slotProps.data.firstName }}
              {{ slotProps.data.lastName }}</span
            >
          </template>
        </Column>
        <Column header="District" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.district }}</span>
          </template>
        </Column>
        <Column header="Score" sortable style="min-width: 2rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.score }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog
      header="Members"
      v-model:visible="displayConfirmation"
      :style="{ width: '700px' }"
      :modal="true"
    >
      <div class="confirmation-content">
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
                :image="slotProps.data.urlPhoto"
                size="large"
                shape="circle"
              />
            </template>
          </Column>
          <Column header="Name" sortable style="min-width: 2rem">
            <template #body="slotProps">
              <span
                >{{ slotProps.data.firstName }}
                {{ slotProps.data.lastName }}</span
              >
            </template>
          </Column>
          <Column header="District" sortable style="min-width: 2rem">
            <template #body="slotProps">
              <span>{{ slotProps.data.district }}</span>
            </template>
          </Column>
          <Column
            v-if="leagues.scalerId === localTopWay.state.userInfo.id"
            header="Actions"
            style="min-width: 2rem"
          >
            <template #body="slotProps">
              <Button
                @click="deleteMember(slotProps.data.id)"
                label="remove"
                icon="pi pi-trash"
                class="p-button-raised p-button-danger"
              />
            </template>
          </Column>
        </DataTable>
      </div>
      <template #footer>
        <Button
          label="Ok"
          icon="pi pi-check"
          @click="closeConfirmation"
          class="p-button-text"
        />
      </template>
    </Dialog>
    <Dialog
      header="Edit Information"
      v-model:visible="editInformation"
      :style="{ width: '700px' }"
      :modal="true"
    >
      <div
        class="
          stepsdemo-content
          flex
          justify-content-center
          align-items-center
          bg-black-alpha-10
        "
        style="height: 75vh"
      >
        <Card class="col-12 md:col-6 lg:col-10">
          <template v-slot:title> Enter your league information </template>
          <template v-slot:content>
            <div class="p-fluid">
              <div class="field">
                <label for="name_league">League name</label>
                <InputText id="name_league" v-model="newLeague.name" />
              </div>

              <div class="field">
                <label for="url_photo">Url Photo</label>
                <InputText id="url_photo" v-model="newLeague.urlLogo" />
              </div>

              <div class="field">
                <label for="description">Description (optional)</label>
                <InputText id="description" v-model="newLeague.description" />
              </div>
            </div>
          </template>
          <template v-slot:footer>
            <div class="grid grid-nogutter justify-content-end">
              <i></i>
              <Button
                label="Cancel"
                class="p-button-danger"
                @click="closeEditInformation()"
                icon="pi pi-angle-left"
              />
              <Button
                label="Accept"
                class="p-button-success ml-3"
                @click="nextPage()"
                icon="pi pi-angle-right"
                iconPos="right"
              />
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
      newLeague: {},
      nameSelected: "",
      leagueCompetitions: [],
      nameCompetition: [],
      nameRanking: "",
      displayConfirmation: false,
      editInformation: false,
      requestLeague: [],
      notificationId: 0,
      admin: {},
      climberId: [],
      userClimber: [],
      userCompetition: [],
      usersLeague: [],
      Competitions: [],
      users: [],
      league_service: new LeagueApiService(),
      scaler_Service: new ScalerApiService(),
      localTopWay: LocalStoreTopWay,
      newClimbersLeague: {
        id: 0,
        scalerId: 0,
        leagueId: 0,
        climbingGymId: 0,
      },
    };
  },
  computed: {
    leagueId() {
      return parseInt(this.$route.params.id);
    },
  },
  async created() {
    // Ranking of the league
    this.league_service
      .findCompetitionRankingsByLeagueId(this.leagueId).then((response) => {
        this.nameCompetition = response.data;
        this.nameSelected = this.nameCompetition[this.nameCompetition.length - 1];
        this.leagueCompetitionsData();
      });
    ////

    this.league_service.findScalersByLeagueId(this.leagueId).then((response) => {
      this.users = response.data;
      console.log(this.users, "users");
    });
      // Request League
    this.league_service
      .getAllRequestsByLeagueId(this.leagueId)
      .then((response) => {
        this.requestLeague = response.data;
        console.log(this.requestLeague, "requestLeague");
      });
    // League
    this.league_service.findLeagueById(this.leagueId).then((response) => {
      this.leagues = response.data;
      console.log(this.leagues, "leagues here");
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
      this.newLeague=this.leagues;
    },
    isMyLeague(id) {
      if (this.leagues.scalerId === id) {
        return true;
      } else {
        return false;
      }
    },
    nextPage() {
      if (this.newLeague.name !== "" && this.newLeague.urlLogo !== "") {
        let data = {}
            data.name = this.newLeague.name,
            data.urlLogo=this.newLeague.urlLogo,
            data.description= this.newLeague.description,
              console.log(data, "data");
        this.league_service.update(data,this.leagueId).then((response) => {
          this.editInformation = false;
          this.submitted = false;
          this.validationErrors = {};
          console.log(response.data, "Nota");
        });
        alert("Data was updated");
      } else {
        alert("Please fill all the fields");
      }
    },
    requestUser(id) {
      console.log(id);
    },
    requestAccept(ScalerId) {
      // Request League accepted
      let data={};
      this.league_service.createClimberLeagues(this.leagues.climbingGymId, ScalerId, this.leagues.id, data)
        .then(response => {
          console.log(response, "response league accepted");
        });
      // Delete request
      this.league_service.deleteRequestByScalerIdAndLeagueId(ScalerId, this.leagues.id).then(response => {
        console.log(response, "response delete request");
        this.$router.go(0);
      });
      // Notification accepted
      let dataNotification = {};
      dataNotification.message = `Your request to join ${this.leagues.name} was accepted`;
      this.scaler_Service.createNotification(ScalerId, dataNotification).then(response => {
        console.log(response, "response notification");
      });
    },
    requestReject(ScalerId, name) {
      let index = confirm(`Are you sure you want to reject ${name}?`);
      if (index) {
        // Delete request
        this.league_service.deleteRequestByScalerIdAndLeagueId(ScalerId, this.leagues.id).then(response => {
          console.log(response, "response delete request");
          this.$router.go(0);
        });
        //Notification to the user
        let data = {};
        data.message = `Your request to join ${this.leagues.name} was rejected`;
        this.scaler_Service.createNotification(ScalerId, data).then(response => {
          console.log(response, "response notification");
        });
      }
    },
    findRequest(id) {
      for (let index of this.requestLeague) {
        if (index.scalerId === id) {
          return index.id;
        }
      }
      return 0;
    },
    async leaveLeague() {
      let index = confirm(`Are you sure you want to leave this league?`);
      if (index) {
        this.league_service.deleteClimberLeagues(this.leagues.climbingGymId, this.localTopWay.state.userInfo.id, this.leagues.id).then((response) => {
          console.log(response, "response delete climber league");
          this.$router.go(-1);
        });
      }
    },
    async deleteMember(id) {
      let index = confirm(`Are you sure?`);
      if (index && id !== this.leagueId.scalerId) {
          this.league_service.deleteClimberLeagues(this.leagues.climbingGymId, id, this.leagues.id).then((response) => {
            console.log(response, "response delete climber league");
            this.$router.go(0);
          });
        //Notification to the user
        let data = {};
        data.message = `You were eliminated from the ${this.leagues.name} league`;
        this.scaler_Service.createNotification(id, data).then(response => {
          console.log(response, "response notification");
        });
      } else {
        console.log("id",id,"su id",this.localTopWay.state.userInfo.id);
        alert(
          "You cannot delete yourself, as you are the league administrator."
        );
      }
    },
    addRanking() {
      this.$router.push(`/Ranking/${this.leagues.name}/${this.leagues.id}`);
    },
    leagueCompetitionsData() {
      this.leagueCompetitions = [];
     this.league_service.findScalersByCompetitionLeagueId(this.nameSelected.id).then((response) => {
     this.userCompetition = response.data;
      this.userCompetition.forEach((response) => {
        this.league_service.findCompetitionLeagueByCompetitionLeagueIdAndScalerId(this.nameSelected.id, response.id).then((info) => {
          response.score=info.data.score;
        });
      });
      console.log(this.userCompetition, "userCompetition");
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
.size {
  width: 100%;
}
</style>
