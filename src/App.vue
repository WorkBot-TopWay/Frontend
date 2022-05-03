
<template>
  <header class="m-0 p-0">
    <div>
      <Menubar :model="items">
        <template #start>
          <img alt="logo" :src="msg" height="60" class="mr-2">
        </template>
        <template #end>
          <Button v-if="!status" @click="isLogin"><i class="pi pi-replay mr-2"></i></Button>
          <div v-else
            class="flex justify-content-center align-items-center m-1"
            style="width: 100%"
          >
            <Avatar
              :image="user.url_photo"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
            <span class="text-center text-900  font-semibold">{{user.first_name }} {{user.last_name }}</span>
          </div>
        </template>
      </Menubar>
    </div>
  </header>
  <main>
    <RouterView/> pi-replay
  </main>

</template>

<script>
import { store } from "./store";
import { ScalerApiService } from "./topway/services/scaler-api.service";

export default {
  name: 'App',
  data:()=> {
    return {
      msg: "https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530",
      store:store,
      status:false,
      user:{},
      service_Scaler: new ScalerApiService(),
      items: [

        {
          label:'Home',
          icon:'pi pi-fw pi-home',
          to:'/'
        },
        {
          label: 'Favorite',
          icon: 'pi pi-fw pi-star',
          url:"https://www.google.com/",
          visible: false
        },
        {
          label:'Profile',
          icon:'pi pi-fw pi-user',
          url:"https://www.google.com/",
          visible: false
        },
        {
          label:'LogIn',
          icon:'pi pi-fw pi-sign-in',
          to:'/LogIn',
          visible:true
        },
        {
          label:'SingUp',
          icon:'pi pi-fw pi-envelope',
          to:'/singUp',
          visible:true
        },
        {
          label: 'SignOff',
          icon: 'pi pi-fw pi-power-off ',
          url: "https://topway-bd33d.web.app/",
          visible:false

        }]
    }
  },
  mounted() {
    console.log(this.store.state.isLogin)

  },
  methods:{
    isLogin() {
      this.status= this.store.state.isLogin
      console.log(this.store.state.isLogin,"Llega el dato")
      if(this.store.state.isLogin){
        this.items[1].visible=true
        this.items[2].visible=true
        this.items[3].visible=false
        this.items[4].visible=false
        this.items[5].visible=true
      }

  this.service_Scaler.findById(this.store.state.id).then(response=>{
    this.user=response.data
  });
      return this.store.state.isLogin
    }
  }
}

// "`https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530`"//
// <RouterLink to="">Home</RouterLink>
//<RouterLink to="">About</RouterLink>
</script>

<style>

</style>
