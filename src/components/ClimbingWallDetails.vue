<template>
  <Toolbar>
    <template #start>
      <Button label="New league" icon="pi pi-plus" class="mr-2" />
      <Button
        label="Join league"
        icon="pi pi-reply"
        class="p-button-secondary mr-2"
      />
      <Button label="My league" icon="pi pi-heart" class="p-button-success" />
    </template>
  </Toolbar>
  <div
    class="flex align-content-center justify-content-center"
    style="width: 100%"
  >
    <div class="news x" style="width: 25%">
      <p>Seccion de noticias</p>
    </div>

    <div
      class="features x flex align-content-center justify-content-center flex-column"
      style="width: 50%"
    >
      <div
        class="flex justify-content-center align-items-center m-2"
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
          </div>
        </TabPanel>

        <TabPanel>
          <template #header>
            <i class="pi pi-info-circle mr-2"></i>
            <span>Features</span>
          </template>
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
        </TabPanel>
        <TabPanel>
          <template #header>
            <i class="pi pi-calendar-minus mr-2"></i>
            <span>office hours</span>
          </template>
          <p class="font text-justify text-base font-semibold">
            Days of the week:
            <span class="font font-medium">{{ feature.days_week }}</span>
          </p>
          <p class="font text-justify text-base font-semibold">
            Hours:
            <span class="font font-medium">{{ feature.office_hours }}</span>
          </p>
        </TabPanel>
      </TabView>
    </div>

    <div class="ranking x" style="width: 25%">
      <p>Seccion de ranking</p>
    </div>
  </div>
</template>

<script>
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";
export default {
  name: "ClimbingWallDetails",
  data: () => {
    return {
      id: 0,
      data: [],
      feature: {},
      climbing_gym: {},
      gallery: [],
      images: {},
      features: [],
      climbing_gym_Service: new ClimbingGymsApiService(),
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
  mounted() {
    this.id = this.$route.params.id;
    console.log(this.id, "Here");
    this.climbing_gym_Service.findClimbingById(this.id).then((response) => {
      this.climbing_gym = response.data;
    });
    console.log("Loading Data!!");

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
  },

  /*
      mounted(){
        this.id = this.$route.params.id;
        this.climbing_gym_Service.getClimbingWall(this.id).then(response => {
          this.feature = response.data;
        });
      }
      this.climbing_gym_Service.findAllImagesById(this.id).then(response => {
        this.climbing_gyms = response.data;
        console.log(response.data);
        console.log(this.climbing_gyms[0].logo_url);
      });
    }  font-family: 'Open Sans', sans-serif;
  }*/
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Suez+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,500&display=swap");

.font {
  font-family: "Open Sans", sans-serif;
}
.x {
  border: 1px solid red;
}
</style>
