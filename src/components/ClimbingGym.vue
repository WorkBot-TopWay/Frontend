<template>
<div class="flex align-content-center justify-content-center m-3">

    <InputText class="mr-2" placeholder="Search" type="text" style="width: 20em"/>
    <Button icon="pi pi-search" class="mr-2" />

</div >
  <div class="flex align-content-end justify-content-center">
    <div class="flex flex-wrap m-3 bg-black-alpha-10" style=" width: 85% ">
      <Card class="m-3 col-12 md:col-6 lg:col-3" v-for="gym of climbing_gyms" :key="gym" style="width:17em; ">

        <template #header>
          <img alt="user header" :src="gym.logo_url">
        </template>

        <template #title>
         {{ gym.name }}
        </template>

        <template #content>
          <Rating v-model="val" :cancel="false"/>
        </template>

        <template #subtitle>
          {{ gym.district }}
        </template>

        <template #footer>
          <Button @click="seeMore(gym.id,gym.name)" label="Primary" > See more </Button>
        </template>
    </Card>
    </div>
  </div>
</template>

<script>
import { ClimbingGymsApiService } from "../topway/services/climbing-gyms-api.service";

export default {
  name: "ClimbingGym",
  data:() =>{
    return{
      val: 0,
      climbing_gyms:[],
      climbing_gym:{},
      scalers:[],
      climbing_gym_Service: new ClimbingGymsApiService()
    }
  },
  mounted() {
    this.climbing_gym_Service.getAll().then(response => {
      this.climbing_gyms = response.data;
      console.log(response.data);
    });
  },

  methods: {
    findIndexById(id) {
      return this.climbing_gyms.findIndex(climbing_gym => climbing_gym.id === id);
    },
    saveClimbingGym() {
      if (this.climbing_gyms.id) {
        this.climbing_gym_Service.update(this.climbing_gym.id, this.climbing_gym)
          .then(response => {
            this.climbing_gyms[this.findIndexById(this.climbing_gym.id)] =
              this.climbing_gym;
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Climbing Gyms Updated",
              life: 3000,
            });
            console.log(response);
          });
      }
    },
    createClimbingGym() {
      this.climbing_gym_Service.create(this.climbing_gym)
        .then(response => {
          this.climbing_gyms.push(this.climbing_gym);
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Climbing Gyms Created",
            life: 3000,
          });
          console.log(response);
        });
    },
    seeMore(id, name) {
      console.log(id, "See more");
      this.$router.push(`/features/${id}/${name}`);
      }
    }
  };

</script>

<style scoped>
  .bg {
    background-color: black;
  }
</style>