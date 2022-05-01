<template>
  <Toolbar>
    <template #start>
      <Button
        label="My league"
        icon="pi pi-heart"
        class="p-button-success mr-2"
      />
      <Button label="Competencies" icon="pi pi-flag" class="p-button-warning" />
    </template>
    <template #end>
      <Button label="New league" icon="pi pi-plus" class="mr-2" />
      <Button
        label="Join league"
        icon="pi pi-reply"
        class="p-button-secondary mr-2"
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
            <img alt="user header" :src="newc.url_photo" />
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
      style="width: 50%"
    >
      <div
        class="flex justify-content-center align-items-center m-1 mt-5"
        style="width: 100%"
      >
        <Avatar
          :image="climbing_gym.logo_url"
          class="mr-2"
          size="xlarge"
          shape="circle"
        />
        <span class="text-center text-900 text-5xl font-semibold">{{
          climbing_gym.name
        }}</span>
      </div>
      <div class="m-3">
        <p class="font text-justify text-base font-medium line-height-2">
          {{ feature.description }}
        </p>
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
                :value="images.url_photo"
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
                    :src="slotProps.item.url"
                    :alt="slotProps.item.title"
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
            <span>Features</span>
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
              <span class="font font-medium">{{ feature.n_routes }}</span>
            </p>
            <p class="font text-justify text-base font-semibold">
              Max height:
              <span class="font font-medium"
                >{{ feature.max_height }} meters</span
              >
            </p>
            <p class="font text-justify text-base font-semibold">
              bolting:
              <span
                class="font font-medium"
                v-for="bol of feature.bolting"
                :key="bol"
              >
                {{ bol }}-</span
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
              <span class="font font-medium">{{ feature.days_week }}</span>
            </p>
            <p class="font text-justify text-base font-semibold">
              Hours:
              <span class="font font-medium">{{ feature.office_hours }}</span>
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
              v-if="informationObject(users)"
              class="
                flex
                align-content-start
                justify-content-center
                flex-column
              "
              style="width: 80%"
            >
              <span>{{ userCommentName() }}</span>
              <div class="mt-3 ml-3" v-for="data of users" :key="data">
                <div class="flex align-content-start justify-content-start">
                  <Avatar
                    class="flex align-content-center justify-content-center m-2"
                    :image="data.url_photo"
                    size="large"
                    shape="circle"
                  />
                  <span
                    class="font flex align-items-center justify-content-center"
                    >{{ data.first_name }} {{ data.last_name }}</span
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
                  <span class="font">{{ data.comment }}</span>
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
        align-content-start
        justify-content-center
        flex-column
      "
      style="width: 25%"
    >
      <h1 class="font text-xl font-semibold text-center">Ranking section</h1>
      <div
        class="flex flex-row align-content-start justify-content-center bor"
        style="width: 90%; margin: auto; margin-bottom: 0"
      >
        <p class="text-center font" style="width: 15%">N°</p>
        <p class="text-center font" style="width: 60%">Competitor</p>
        <p class="text-center font" style="width: 25%">Score</p>
      </div>
      <div
        class="tabla flex flex-row b"
        style="
          width: 90%;
          height: 80vh;
          overflow: auto;
          margin: auto;
          margin-top: 0;
        "
      >
        <div class="pos flex flex-column" style="width: 15%">
          <div
            class="flex align-content-center justify-content-center button"
            v-for="rank of ranking"
            :key="rank"
            style="height: 60px"
          >
            <p class="font">{{ rank.position }}</p>
          </div>
        </div>
        <div class="participant flex flex-column" style="width: 60%">
          <div
            class="flex align-content-center justify-content-center button"
            v-for="user of participants"
            :key="user"
            style="height: 60px"
          >
            <Avatar
              class="flex align-content-center justify-content-center m-2"
              :image="user.url_photo"
              size="large"
              shape="circle"
            />
            <p class="text-center font">
              {{ user.first_name }} {{ user.last_name }}
            </p>
          </div>
        </div>
        <div class="score flex flex-column" style="width: 25%">
          <div
            class="flex align-content-center justify-content-center button"
            v-for="rank of ranking"
            :key="rank"
            style="height: 60px"
          >
            <p class="font flex align-content-center justify-content-center">
              {{ rank.score }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";
import { ScalerApiService } from "../topway/services/scaler-api.service";
export default {
  name: "ClimbingWallDetails",
  data: () => {
    return {
      id: 0,
      cont: 0,
      data: [],
      competition: {},
      participants: [],
      ranking: [],
      comments: [],
      users: [],
      feature: {},
      news: [],
      climbing_gym: {},
      gallery: [],
      images: {},
      features: [],
      climbing_gym_Service: new ClimbingGymsApiService(),
      scaler_Service: new ScalerApiService(),
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
    this.id = this.$route.params.id;
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
        this.gallery = response.data;
        this.images = this.gallery[0];
      })
      .catch((e) => {
        console.log(e);
      });
    /////////// Feature Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .findFeatureById(this.id)
      .then((response) => {
        this.data = response.data;
        this.feature = this.data[0];
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
    /////////// Ranking Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .findCompetitionById(1)
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
      });
    /////////// Comments Climbing Gym Data  ////////////
    this.climbing_gym_Service
      .findCommentById(this.id)
      .then(response => {
        this.comments = response.data;
        console.log(this.comments);
        this.comments.forEach( element => {
          this.scaler_Service
            .findById(element.scalerId)
            .then((response) => {
              this.users.push(response.data);
              console.log(this.users);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    informationObject(object) {
      if (Object.entries(object).length === 0) {
        return false;
      }
      return true;
    },
    userCommentName() {
      for (let i = 0; i < this.users.length; i++) {
        Object.assign(this.users[i], this.comments[i]);
      }
      console.log(this.users);
    },
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