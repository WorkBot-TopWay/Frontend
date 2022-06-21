
<template>
  <header class="m-0 p-0">
    <div>
      <Menubar :model="items">
        <template #start>
          <img alt="logo" :src="msg" height="60" class="mr-2">
        </template>


        <template #end>
          <div v-if="localTopWay.state.isLogin" class="flex justify-content-center align-items-center ali m-1"
            style="width: 100%"
          >
            <div v-if="this.localTopWay.state.userInfo.type=='Scaler'">
            <Button icon="pi pi-refresh" class="p-button-sm p-button-rounded p-button-secondary"  @click="getNotifications()"/>
            <Button v-if="isTrue" icon="pi pi-circle-fill" class="p-button-rounded p-button-help p-button-text text-xs" />
            <Button v-else icon="pi pi-circle" class="p-button-rounded p-button-info p-button-text text-xs" />
            <Button icon="pi pi-bell" class="p-button-rounded p-button-info mr-4"  @click="openNotifications()"/>
            </div>

            <Avatar
              :image="urlPhoto(localTopWay.state.userInfo)"
              class="mr-2"
              size="xlarge"
              shape="circle"
            />
            <span class="text-center text-900  font-semibold">{{nameUser(localTopWay.state.userInfo)}}</span>
          </div>
        </template>
      </Menubar>
    </div>
  </header>
  <main>
    <RouterView/>
    <Dialog header="Notifications" v-model:visible="displayNotifications" :style="{width: '50vw'}" :modal="true">
      <DataTable v-if="isTrue"
        :value="notifications"
        dataKey="id"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} request"
        responsiveLayout="scroll">
        <Column field="message" header="Messages" style="min-width: 1rem">
          <template #body="slotProps">
            <span>{{ slotProps.data.message }}</span>
          </template>
        </Column>
        <Column header="Actions" style="min-width: 2rem">
          <template #body="slotProps">
            <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined" @click="deleteNotification(slotProps.data.id)" />
          </template>
        </Column>
      </DataTable>
      <div v-else>
        <span>No notifications</span>
      </div>
      <template #footer>
        <Button label="Ok" icon="pi pi-thumbs-up" @click="closeNotifications()" autofocus />
      </template>
    </Dialog>

  </main>

</template>

<script>
import { store } from "./store";
import { LocalStoreTopWay } from "./LocalStore/LocalStoreTopWay";
import { ScalerApiService } from "./topway/services/scaler-api.service";
export default {
  name: 'App',
  data:()=> {
    return {
      msg: "https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530",
      store:store,
      status:false,
      notifications:[],
      isTrue:false,
      user:{},
      displayNotifications: false,
      localTopWay: LocalStoreTopWay,
      scaler_Service: new ScalerApiService(),
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
          to:'/MyProfile',
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
          url: 'https://topway-bd33d.web.app/' //cambia a la ruta del servidor
        },
        {
          label: 'View mode',
          icon: 'pi pi-fw pi-eye',
          visible:false,
          to: '/ViewMode',
        },
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          visible:false,
          to: '/climbing-gym'
        }
        ,
        {
          label:'Profile',
          icon:'pi pi-fw pi-user',
          to:'/Profile',
          visible: false
        }]
    }
  },
  watch: {
    localTopWay: {
      handler: function () {
        if (this.localTopWay.state.userInfo.type==="Scaler") {
          this.items[1].visible=true
          this.items[2].visible=true
          this.items[3].visible=false
          this.items[4].visible=false
          this.items[5].visible=true
          this.items[6].visible=false
          this.items[7].visible=false
          this.items[8].visible=false
          console.log(this.localTopWay.state.userInfo)
          this.getNotifications();
        }else {
          this.items[0].visible=false
          this.items[1].visible=false
          this.items[2].visible=false
          this.items[3].visible=false
          this.items[4].visible=false
          this.items[5].visible=true
          this.items[6].visible=true
          this.items[7].visible=true
          this.items[8].visible=true
        }
      },
      deep: true
    },
    getNotifications: {
      handler: function () {
        if (this.notifications.length > 0) {
          this.displayNotifications = true
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
    nameUser(data){
      if(data.type=='Scaler'){
        return data.firstName + ' ' + data.lastName
      }else {
        return data.name
      }
    },
    urlPhoto(data){
      if(data.type=='Scaler'){
        return data.urlPhoto
      }else {
        return data.logoUrl
      }
    },
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
    },
    openNotifications() {
      this.displayNotifications = true;
    },
    closeNotifications() {
      this.displayNotifications = false;
    },
    getNotifications() {
      if(this.localTopWay.state.isLogin){
        // notifications
        this.scaler_Service.getAllNotificationsByScalerId(this.localTopWay.state.userInfo.id).then(response => {
          this.notifications = response.data;
          console.log(this.notifications.length, "Notifications")
          if (this.notifications.length > 0) {this.isTrue = true} else {this.isTrue = false}
        });
      }
    },
    deleteNotification(id) {
      this.scaler_Service.deleteNotification(id).then(response => {
        console.log(response.data, "Delete Notification");
        this.getNotifications();
      });
    }
  }
}

// "`https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530`"//
// <RouterLink to="">Home</RouterLink>
//<RouterLink to="">About</RouterLink>
</script>

<style>

</style>
