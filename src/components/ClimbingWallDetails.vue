<template>
  <Toolbar>
    <template #start>
      <Button
        label="My leagues"
        icon="pi pi-star-fill"
        class="p-button-success mr-2"
        @click="myLeague(climbing_gym.name, id)"
      />
      <Button label="Competencies" icon="pi pi-flag" class="p-button-warning" />
    </template>
    <template #end>
      <Button
        label="New league"
        icon="pi pi-plus"
        class="mr-2"
        @click="newLeague(climbing_gym.name, id)"
      />
      <Button
        label="Join league"
        icon="pi pi-reply"
        class="p-button-secondary mr-2"
        @click="joinLeague(climbing_gym.name, id)"
      />
    </template>
  </Toolbar>
  <div
    class="flex align-content-center justify-content-center"
    style="width: 100%"
  >
    <div class="news x" style="width: 25%">
      <div class="m-2">
        <h1 class="font text-xl font-semibold text-center">News section</h1>
      </div>
      <div
        v-if="informationObject(news)"
        class="
          m-1
          flex
          align-content-center
          justify-content-between
          flex-column
        "
        style="height: 85vh; width: 100%; overflow: auto; margin: auto"
      >
        <Card
          class="col-12 m-auto mt-3"
          v-for="newc of news"
          :key="newc"
          style="width: 15em"
        >
          <template #header>
            <img alt="user header" :src="newc.urlImage" />
          </template>

          <template #title>
            {{ newc.title }}
          </template>

          <template #content>
            {{ newc.description }}
          </template>

          <template #subtitle>
            {{ newc.date }}
          </template>
        </Card>
      </div>
      <div
        v-else
        class="
          m-1
          flex
          align-content-center
          justify-content-between
          flex-column
        "
        style="height: 85vh; width: 100%; overflow: auto; margin: auto"
      >
        <div class="m-1">
          <h1 class="font text-xl font-semibold text-center">No news</h1>
        </div>
      </div>
    </div>
    <div
      class="features x flex align-content-start flex-column"
      style="width: 45%"
    >
      <div
        class="flex justify-content-center align-items-center m-1 mt-5"
        style="width: 100%"
      >
        <Avatar
          :image="climbing_gym.logoUrl"
          class="mr-2"
          size="xlarge"
          shape="circle"
        />
        <span class="font text-center text-900 text-5xl font-semibold">{{
          climbing_gym.name
        }}</span>
      </div>
      <div class="m-3">
        <p
          v-if="informationObject(feature)"
          class="font text-justify text-base font-medium line-height-2"
        >
          {{ feature.description }}
        </p>
        <p v-else class="font text-justify text-base font-medium line-height-2">
          No description
        </p>
      </div>
      <div class="flex justify-content-center mt-2 mb-2">
        <Button
          v-if="!listFavorites()"
          label="Follow"
          icon="pi pi-heart"
          class="p-button-help mr-2"
          @click="follow()"
        />
        <Button
          v-else
          label="Unfollow"
          icon="pi pi-heart-fill"
          class="p-button-help mr-2"
          @click="unfollow()"
        />
      </div>
      <div class="flex align-content-center justify-content-center">
        <div
          v-for="tag of tags"
          :key="tag"
          class="
            flex
            align-items-center
            justify-content-center
            flex-wrap
            mt-2
            mr-1
            ml-1
            mb-2
          "
        >
          <Tag class="mr-2" severity="success" :value="tag.name"></Tag>
        </div>
      </div>
      <TabView class="mr-4 ml-4">
        <TabPanel>
          <template #header>
            <i class="pi pi-image mr-2"></i>
            <span>Gallery</span>
          </template>
          <div class="content-section implementation">
            <div
              v-if="informationObject(images)"
              class="card flex align-content-center justify-content-around"
              style="width: 100%; height: 400px"
            >
              <Galleria
                :value="images"
                :showIndicators="true"
                :showItemNavigators="true"
                :showThumbnails="false"
                :responsiveOptions="responsiveOptions"
                :circular="true"
                :numVisible="7"
                style="max-width: 100%"
              >
                <template #item="slotProps">
                  <img
                    :src="slotProps.item.imageUrl"
                    :alt="slotProps.item.alt"
                    style="max-width: 500px; height: 400px; display: block"
                  />
                </template>
              </Galleria>
            </div>
            <Card
              v-else
              class="
                col-12
                card
                flex
                align-content-center
                justify-content-center
              "
            >
              <template #header>
                <img
                  alt="user header"
                  src="https://siempreenmedio.files.wordpress.com/2014/04/no_disponible.jpg"
                  style="max-width: 300px; height: 300px; display: block"
                />
              </template>
            </Card>
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>
            <i class="pi pi-info-circle mr-2"></i>
            <span>Description</span>
          </template>
          <div v-if="informationObject(feature)">
            <p class="font text-justify text-base font-semibold">
              Entry price:
              <span class="font font-medium">S/ {{ feature.price }}.00</span>
            </p>
            <p class="font text-justify text-base font-semibold">
              Rock type:
              <span class="font font-medium">{{ feature.rock_type }}</span>
            </p>
            <p class="font text-justify text-base font-semibold">
              Number of routes:
              <span class="font font-medium">{{ feature.routes }}</span>
            </p>
            <p class="font text-justify text-base font-semibold">
              Max height:
              <span class="font font-medium"
                > {{feature.max_height }} meters</span
              >
            </p>
            <p class="font text-justify text-base font-semibold">
              bolting:
              <span  class="font font-medium">{{feature.bolting}}</span
              >
            </p>
          </div>
          <div v-else>
            <p class="font text-justify text-base font-semibold">
              No information available
            </p>
          </div>
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar-minus mr-2"></i>
            <span>Office hours</span>
          </template>
          <div v-if="informationObject(feature)">
            <p class="font text-justify text-base font-semibold">
              Days of the week:
              <span class="font font-medium">Lunes a Viernes</span>
            </p>
            <p class="font text-justify text-base font-semibold">
              Hours:
              <span class="font font-medium">{{ convertDate(feature.office_hours_start)}} - {{ convertDate(feature.office_hours_end) }}</span>
            </p>
          </div>
          <div v-else>
            <p class="font text-justify text-base font-semibold">
              No information available
            </p>
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>
            <i class="pi pi-comments mr-2"></i>
            <span>Comments</span>
          </template>
          <div>
            <div
              v-if="informationObject(comments)"
              class="
                flex
                align-content-start
                justify-content-center
                flex-column
              "
              style="width: 80%"
            >
              <div class="mt-3 ml-3" v-for="data of comments" :key="data">
                <div class="flex align-content-start justify-content-start">
                  <Avatar
                    class="flex align-content-center justify-content-center m-2"
                    :image="data.user.urlPhoto"
                    size="large"
                    shape="circle"
                  />
                  <span
                    class="font flex align-items-center justify-content-center"
                    >{{ data.user.firstName }} {{ data.user.lastName }}</span
                  >
                  <Rating
                    class="ml-3 flex align-items-center justify-content-center"
                    v-model="data.score"
                    :cancel="false"
                  />
                </div>
                <div
                  class="
                    flex
                    align-content-start
                    justify-content-start
                    ml-7
                    flex-column
                  "
                >
                  <span class="font">{{ data.description }}</span>
                  <span class="font mt-1">[published]: {{ data.date }}</span>
                </div>
              </div>
            </div>

            <div v-else>
              <p class="font text-justify text-base font-semibold">
                Does not contain comments
              </p>
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
    <div
      class="
        ranking
        x
        flex
        align-content-center
        justify-content-start
        flex-column
      "
      v-if="informationObject(nameCompetition)"
      style="width: 30%"
    >
      <h1 class="font text-xl font-semibold text-center">Ranking section</h1>
      <div class="flex align-items-center justify-content-center mb-3">
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
          @click="GymCompetitionsData()"
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
        <h3 class=" font text-center" >{{ nameSelected.name }}</h3>
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
    <div
      class="flex justify-content-center align-items-start"
      v-else
      style="width: 15%"
    >
      <p class="font text-justify text-base font-semibold">
        Does not contain ranking
      </p>
    </div>
  </div>

</template>

<script>
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";
import { ScalerApiService } from "../topway/services/scaler-api.service";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";
export default {
  name: "ClimbingWallDetails",
  data: () => {
    return {
      favoriteId: 0,
      id: 0,
      cont: 0,
      tags: [],
      favorite: {},
      competition: {},
      participants: [],
      ranking: [],
      comments: [],
      feature: {},
      news: [],
      climbing_gym: {},
      images: [],
      userCompetition:[],
      nameSelected: {},
      nameCompetition: [],
      climbing_gym_Service: new ClimbingGymsApiService(),
      scaler_Service: new ScalerApiService(),
      localTopWay: LocalStoreTopWay,
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 5,
        },
        {
          breakpoint: "768px",
          numVisible: 3,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
    };
  },
  computed: {
    climbingGymId() {
      return parseInt(this.$route.params.id);
    },
  },
  async mounted() {
    /////////// Climbing Gym Data  ////////////
    this.id = this.climbingGymId;
    console.log(this.id, "Here");
    this.climbing_gym_Service.findClimbingById(this.id).then((response) => {
      this.climbing_gym = response.data;
    });
    console.log("Loading Data!!");
    /////////// Image Climbing Gym Data  ////////////
    console.log("Loading Image...");
    this.climbing_gym_Service
      .findAllImagesById(this.id)
      .then((response) => {
        this.images = response.data;
        console.log(this.images, "Here Images");
      })
      .catch((e) => {
        console.log(e);
      });
    /////////// Feature Climbing Gym Data  ////////////

    this.climbing_gym_Service
      .findFeatureById(this.id)
      .then((response) => {
        this.feature= response.data;
        console.log(this.feature);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("Ready Image!!");

    /////////// News Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .findNewsById(this.id)
      .then((response) => {
        this.news = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
    ///////////// Competition Climbing Gym Data ////////////
    console.log("ranking");
    /////////// Ranking Climbing Gym Data  //////////// Revision de la data
    /*
    this.climbing_gym_Service
      .findCompetitionById(this.id)
      .then((response) => {
        this.competition = response.data;
        console.log(this.competition);
        this.ranking = this.competition.competition_gyms_ranking;
        this.ranking.forEach((element) => {
          this.scaler_Service
            .findById(element.scalerId)
            .then((response) => {
              this.participants.push(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });*/
    this.climbing_gym_Service.findCompetitionByClimbingGymId(this.id).then((response) => {
      this.nameCompetition = response.data;
      this.nameSelected = this.nameCompetition[this.nameCompetition.length - 1];
      this.GymCompetitionsData();
    });
    /////////// Comments Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .findCommentById(this.id)
      .then(response =>{
        this.comments = response.data;
        this.comments.forEach(element =>{
          this.scaler_Service
            .findById(element.scalerId).then(x=>{
              element.user = x.data;
          });
        });
        console.log(this.comments, "Comments");
      });
    /////////// Tag Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .findCategoryByClimbingGymId(this.id)
      .then( response =>{
        this.tags = response.data;
      });
    /////////////// Favorite ///////////////////

    this.scaler_Service
      .findFavoriteByClimbingGymIdAndscalersId(this.id, this.localTopWay.state.userInfo.id)
      .then((response) => {
        if(response.data.length > 0|| response.data != null){
          this.favorite = response.data;
          console.log(this.favorite, "Favorite is > 0");
        }else{
          console.log(this.favorite, "Favorite is 0");
          this.favorite = [];
        }

        console.log(this.favorite, "Favorite");
      });
  },
  methods: {
    convertDate(date) {
      let dateHour = new Date(date);
      let dateMinute = new Date(date);
      return dateHour.getHours()+":"+dateMinute.getMinutes();
    },
    GymCompetitionsData() {
      this.leagueCompetitions = [];
      this.climbing_gym_Service.findScaleRankingByCompetitionGymId(this.nameSelected.id).then((response) => {
        this.userCompetition = response.data;
        this.userCompetition.forEach((response) => {
          this.climbing_gym_Service.findCompetitionRankingByCompetitionGymIdAndScalerId(this.nameSelected.id, response.id).then((info) => {
            response.score=info.data.score;
          });
        });
        console.log(this.userCompetition, "userCompetition");
      });
    },
    informationObject(object) {
      if (
        object === undefined ||
        object === null ||
        Object.entries(object).length === 0
      ) {
        return false;
      }
      return true;
    },
    myLeague(name, id) {
      if (this.localTopWay.state.isLogin) {
        this.$router.push(`/${name}/${id}/MyLeagues`);
      } else {
        alert("Please Login First");
      }
    },
    newLeague(name, id) {
      if (this.localTopWay.state.isLogin) {
        this.$router.push(`/NewLeague/${name}/${id}`);
      } else {
        alert("Please Login First");
      }
    },
    joinLeague(name, id) {
      if (this.localTopWay.state.isLogin) {
        this.$router.push(`/${name}/${id}/JoinLeague`);
      } else {
        alert("Please Login First");
      }
    },
    listFavorites() {
          if (this.informationObject(this.favorite)) {
            console.log(this.favorite, "Favorite true");
            return true;
        }
      console.log(this.favorite, "Favorite list false");
        return false;
    },
    follow() {
      if(this.localTopWay.state.isLogin){
        let follow = {
        };
        this.scaler_Service.createFavorite(this.id,this.localTopWay.state.userInfo.id,follow).then((response) => {
          console.log(response.data);
          this.$router.go(0);
        });
      }else {
        alert("Please Login First");
      }
    },
    unfollow() {
      if(this.localTopWay.state.isLogin){
          this.scaler_Service
            .deleteFavorite(this.id, this.localTopWay.state.userInfo.id)
            .then((response) => {
              console.log(response.data);
          this.$router.go(0);
        });
      }
    }
  },
};
/*.x{
border: 1px solid red;
}*/
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Suez+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,500&display=swap");

.font {
  font-family: "Open Sans", sans-serif;
}
.bor {
  border: 1px solid black;
}

.button {
  border-bottom: 2px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>