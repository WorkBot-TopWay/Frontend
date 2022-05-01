
<template>
  <header class="m-0 p-0">
    <div>
      <Menubar :model="items">
        <template #start>
          <img alt="logo" :src="msg" height="60" class="mr-2">
        </template>

      </Menubar>

    </div>
  </header>
  <main>
    <RouterView/>
  </main>

</template>

<script>
export default {
  name: 'App',
  data:()=> {
    return {
      msg: "https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530",
      items: [

        {
          label:'Home',
          icon:'pi pi-fw pi-home',
          to:'/'
        },
        {
          label: 'Favorite',
          icon: 'pi pi-fw pi-star',
          url:"https://www.google.com/"
        },
        {
          label:'Profile',
          icon:'pi pi-fw pi-user',
          url:"https://www.google.com/"
        },
        {
          label:'LogIn',
          icon:'pi pi-fw pi-sign-in',
          url:"https://www.google.com/"
        },
        {
          label:'SingUp',
          icon:'pi pi-fw pi-envelope',
          to:'/singUp'
        },
        {
          label: 'SignOff',
          icon: 'pi pi-fw pi-power-off ',

        }]
    }
  },
  methods:{

  }
}

// "`https://firebasestorage.googleapis.com/v0/b/fir-dataapp-c6043.appspot.com/o/logo-topwey.png?alt=media&token=10eb25b7-0a19-4b1e-89ca-d3ca9f177530`"//
// <RouterLink to="">Home</RouterLink>
//<RouterLink to="">About</RouterLink>
</script>

<style>

</style>
