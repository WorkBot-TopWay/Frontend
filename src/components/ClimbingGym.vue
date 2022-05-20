<template>
<div class="flex align-content-center justify-content-center m-3 flex-column">
<div  class="flex align-content-center justify-content-center">
  <InputText @keyup.enter="insertShip" class="mr-2" v-model="tag" placeholder="Search" type="text" style="width: 20em"/>
  <Button @click="insertShip" icon="pi pi-search" class="mr-2" />
</div>
  <div class="flex align-content-center justify-content-center">
  <div v-for="ship of chips" :key="ship" class="flex align-items-center justify-content-center flex-wrap mt-2 mr-1 ml-1">
    <Chip @click="removeShip(ship)"  :label="ship" class="mb-2" removable/>
  </div>
</div>
</div >
  <div class="flex align-content-end justify-content-center">
    <div class="flex flex-wrap m-3 bg-black-alpha-10" style=" width: 85% ">
      <Card class="m-3 col-12 md:col-6 lg:col-3" v-for="gym of filterByCategory" :key="gym" style="width:17em; ">

        <template #header>
          <img  alt="user header" :src="gym.logo_url">
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
import { store } from "../store";

export default {
  name: "ClimbingGym",
  data:() =>{
    return{
      val: 0,
      tag: "",
      filter:[],
      filterTo:[],
      chips: [],
      store:store,
      status:false,
      category: [],
      climbing_gyms:[],
      gyms:[],
      climbing_gym:{},
      scalers:[],
      climbing_gym_Service: new ClimbingGymsApiService()
    }
  },
  computed: {
    isLoggedIn() {
      console.log(this.store.state.isLogin,"isLogin");
      return this.store.state.isLogin;
    },

    // eslint-disable-next-line vue/no-async-in-computed-properties,vue/no-dupe-keys,vue/return-in-computed-property
    filterByCategory() {
      if (this.tag === "") {
        return this.climbing_gyms;
      }
      if(this.chips.length <= 0){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.gyms= [];
      }
      if(this.chips.length === 0){
        console.log("/////////////////////////////////////// === 0");
        this.category.forEach(value => {
          if (value.name.toLowerCase() === this.tag.toLowerCase()) {
            this.climbing_gyms.forEach( element =>{
              for (const x of element.category_gyms){
                if(x.categoryId === value.id){
                  this.gyms.push(element);
                }
              }
            });
          }
        });
      }
      if(this.chips.length >= 2){
        console.log("///////////////////////////////////////> 1");
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.filter = [];
          this.category.forEach(value => {
            if (value.name.toLowerCase() === this.chips[this.chips.length-1].toLowerCase()) {
              this.gyms.forEach( element =>{
                for (const x of element.category_gyms){
                  if(x.categoryId === value.id){
                    this.filter.push(element);
                  }
                }
              });
            }
          });
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.gyms = this.filter;
        return new Set(this.gyms);
      }
      if(this.chips.length >0){
        console.log("//////////////////////////////////////// >0");
        this.chips.forEach(chip => {
          this.category.forEach(value => {
            if (value.name.toLowerCase() === chip.toLowerCase()) {
              this.climbing_gyms.forEach( element =>{
                for (const x of element.category_gyms){
                  if(x.categoryId === value.id){
                    this.gyms.push(element);
                  }
                }
              });
            }
          });
        });
        return new Set(this.gyms);
      }
      if(this.gyms.length > 0){
       return new Set(this.gyms);
      }else {
        return this.climbing_gyms.filter(
          climbing_gym => climbing_gym.name.toLowerCase().indexOf(this.tag.toLowerCase()) > -1
        );
      }
    }
  }
    ,
    mounted() {
      console.log(this.isLoggedIn);
      this.climbing_gym_Service.getAll().then(response => {
        this.climbing_gyms = response.data;
        console.log(this.climbing_gyms);
      });
      this.climbing_gym_Service.getAllCategory().then(response => {
        this.category = response.data;
        console.log(this.category);
      });
    },

    methods: {
      seeMore(id, name) {
        console.log(id, "See more");
        this.$router.push(`/features/${id}/${name}`);
      },
     insertShip(){
        if(this.tag != "") {
          this.chips.push(this.tag);
        }
        this.tag = " ";
        console.log(this.chips);
        //remove chip removed with remove event
     },
     removeShip(word){
        this.chips.forEach( (value, index) => {
          if(value === word){
            this.chips.splice(index, 1);
          }
        });
     }
    }
  };

</script>

<style scoped>
  .bg {
    background-color: black;
  }
</style>