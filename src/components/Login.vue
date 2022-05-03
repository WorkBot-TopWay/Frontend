<template>
  <h1 class="text-6xl" style="text-align: center">Welcome to TopWay</h1>
  <div class="flex">
    <div class="flex-3">
      <img
        src=""
        alt="logo"
        height="600"
        class="mr-2"
      />
    </div>
    <form class="flex-3 bg-yellow-500" style="height: 350px">
      <h2 class="flex align-content-center justify-content-left m-2">LOG IN</h2>
      <h3 class="flex align-content-center justify-content-left m-2">Email</h3>
      <InputText placeholder="Email" v-model="email" type="text" style="width: 12.5em" />
      <h3 class="flex align-content-center justify-content-left m-2">Password</h3>
      <Password v-model="password" :feedback="true"  placeholder="Password" />
      <Button @click="handleSubmit" label="Login" style="width: 12.5em" class="flex align-content-center justify-content-right m-2">
        Log in
      </Button>
     <p>If you are not a user, register <Button label="Link" class="p-button-link" style="color: #181818">HERE</Button></p>
    </form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    handleSubmit() {
      console.log(this.email, this.password)
    }
  },

  validation: {
    email: {},
  },
};
</script>

<style scoped></style>
