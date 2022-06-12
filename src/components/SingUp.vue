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
      <template v-slot:title> Personal Information </template>
      <template v-slot:subtitle> Enter your personal information </template>
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
          <div class="field">
            <label for="class">Type</label>
            <Dropdown
              inputId="class"
              v-model="selectedType"
              :options="classes"
              @change="setType($event)"
              optionLabel="name"
              placeholder="Select a type"
            />
            <small
              v-show="validationErrors.selectedType && submitted"
              class="p-error"
              >Requires you to select one</small
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

export default {
  name: "SingUp",
  data: () => {
    return {
      selectedType: "",
      prop: ["selectedType"],
      classes: [
        { name: "Climber", type: "Scaler" },
        { name: "Climbing Gym", type: "Gym" },
      ],
      emits: ["nextPage"],
      password: "",
      id: 0,
      lastname: "",
      age: null,
      submitted: false,
      validationErrors: {},
      scaler_Service: new ScalerApiService(),
      user: [],
      type_click: [],
      email: "",
      re: "",
      emailValid:
        '/^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,24}))$/',
      store: store,
    };
  },
  mounted() {
    this.scaler_Service.getAll().then((response) => {
      this.user = response.data;
      this.id = this.user.length + 1;
    });
  },
  methods: {
    nextPage() {
      this.submitted = true;
      if (this.validateForm()) {
        console.log("Todo bien");
        this.store.state.id = this.id;
        this.store.state.password = this.password;
        this.store.state.email = this.email;
        this.store.state.type = this.selectedType.type;

        this.$router.push("/singUpClimber");
      }
    },
    validateForm() {
      if (this.selectedType.length == 0)
        this.validationErrors["selectedType"] = true;
      else delete this.validationErrors["selectedType"];
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
    setType(event) {
      if (this.selectedType && event.value) {
        this.selectedType = event.value;
      }
    },
  },
};
</script>

<style scoped>
</style>