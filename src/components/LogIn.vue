<template>
  <div
    class="
      stepsdemo-content
      flex
      justify-content-center
      align-items-center
      bg-black-alpha-10
    "
    style="height: 85vh"
  >
    <Card class="col-12 md:col-6 lg:col-10">
      <template v-slot:title> LogIn </template>
      <template v-slot:subtitle> Initial session </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="email"
              :class="{ 'p-invalid': validationErrors.email && submitted }"
            />
            <small v-show="validationErrors.email && submitted" class="p-error"
              >email is required.</small
            >
          </div>
          <div class="field">
            <label class="label">Create a password</label>
            <Password
              type="text"
              v-model="password"
              placeholder="Please enter a password"
              :class="{ 'p-invalid': validationErrors.password && submitted }"
              toggleMask
            ></Password>
            <small
              v-show="validationErrors.password && submitted"
              class="p-error"
              >requires entering a password</small
            >
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between">
          <i></i>
          <Button
            label="Next"
            @click="nextPage()"
            icon="pi pi-angle-right"
            iconPos="right"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { ScalerApiService } from "../topway/services/scaler-api.service";
import { store } from "../store";
import { useToast } from "primevue/usetoast";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";

export default {
  name: "LogIn",
  data: () => {
    return {
      emits: ["nextPage"],
      password: "",
      id: 0,
      submitted: false,
      validationErrors: {},
      scaler_Service: new ScalerApiService(),
      user: [],
      email: "",
      re: "",
      store: store,
      localTopWay: LocalStoreTopWay,
    };
  },
  setup() {},
  mounted() {},
  methods: {
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        let data={};
        data.email=this.email;
        data.password=this.password;
          this.scaler_Service.signIn(data)
            .then((res) => {
              if(res.data != null||res.data != undefined|| res.data.length > 0){
                this.localTopWay.state.isLogin = true;
                this.localTopWay.state.userInfo =res.data;
                localStorage.user = JSON.stringify(res.data);
                this.$router.push("/");
              }
            }).catch((err) => {
              console.log(err, "errorn here");
            alert("Invalid email or password");
            this.validationErrors.email = true;
            this.validationErrors.password = true;
            this.submitted = false;
            });
      }
    },
    validateForm() {
      if (!this.password.trim()) this.validationErrors["password"] = true;
      else delete this.validationErrors["password"];
      if (!this.email.trim()) {
        this.validationErrors["email"] = true;
      } else {
        if (!this.validEmail(this.email)) {
          this.validationErrors["email"] = true;
        } else {
          delete this.validationErrors["email"];
        }
      }
      return !Object.keys(this.validationErrors).length;
    },
    validEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        email
      );
    },
    showError() {
      console.log("Error, llego a Toast");
      const toast = useToast();
      if (!this.validateForm())
        toast.add({
          severity: "error",
          summary: "Error Message",
          detail: "Message Content",
          life: 3000,
        });
    },
  },
};
</script>

<style scoped>
</style>