
<template>
  <header class="m-0 p-0">
    <div>
      <Menubar :model="items">
        <template #start>
          <img alt="logo" :src="msg" height="60" class="mr-2">
        </template>


        <template #end>
          <div v-if="localTopWay.state.isLogin"
            class="flex justify-content-center align-items-center m-1"
            style="width: 100%"
          >
            <Avatar
              :image="localTopWay.state.userInfo.url_photo"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
            <span class="text-center text-900  font-semibold">{{localTopWay.state.userInfo.first_name }} {{localTopWay.state.userInfo.last_name }}</span>
          </div>
        </template>
      </Menubar>
    </div>
  </header>
  <main>
    <RouterView/>
  </main>

</template>

<script>
import { store } from "./store";
import { LocalStoreTopWay } from "./LocalStore/LocalStoreTopWay";
export default {
  name: 'App',
  data:()=> {
    return {
      msg: "https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530",
      store:store,
      status:false,
      user:{},
      localTopWay: LocalStoreTopWay,
      items: [
        {
          label:'Home',
          icon:'pi pi-fw pi-home',
          to:'/'
        },
        {
          label: 'Favorite',
          icon: 'pi pi-fw pi-star',
          to: '/Favorite',
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
          visible:false,
          command: () => {
            localStorage.removeItem('user');
            localStorage.clear();
          },

          url: 'http://localhost:3001/' //cambia a la ruta del servidor
        },
        {
          label: 'News',
          icon: 'pi pi-file',
          to:'/News',
          visible: true
        },
        {
          label: 'Feat',
          icon: 'pi pi-file',
          to:'/FormFeature',
          visible: true
        },
        {
          label: 'Comp',
          icon: 'pi pi-file',
          to:'/FormCompetition',
          visible: true
        }
        ]
    }
  },
  watch: {
    localTopWay: {
      handler: function () {
        if (this.localTopWay.state.isLogin) {
          this.items[1].visible=true
          this.items[2].visible=true
          this.items[3].visible=false
          this.items[4].visible=false
          this.items[5].visible=true
        }
      },
      deep: true
    }
  },
  mounted() {
    if(localStorage.user){
      this.localTopWay.state.userInfo = JSON.parse(localStorage.user);
      this.localTopWay.state.isLogin = true;
    }
    console.log(this.store.state.isLogin)
    this.isLogin();
  },
  methods:{
    isLogin() {
      this.status= this.localTopWay.state.isLogin
      console.log(this.localTopWay.state.isLogin,"Arrival here")
      if(this.localTopWay.state.isLogin){
        this.items[1].visible=true
        this.items[2].visible=true
        this.items[3].visible=false
        this.items[4].visible=false
        this.items[5].visible=true
      }
    }
  }
}

// "`https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530`"//
// <RouterLink to="">Home</RouterLink>
//<RouterLink to="">About</RouterLink>
</script>

<style>

</style>
