<template>
  <div
    class="
      stepsdemo-content
      flex
      justify-content-center
      align-items-center
      bg-black-alpha-10

    "
  >
    <Card class="col-12 md:col-6 lg:col-10 mt-5 mb-5">
      <template v-slot:title> Personal Information </template>
      <template v-slot:subtitle> Enter your personal information</template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="Name">Name</label>
            <InputText
              id="Name"
              v-model="Name"
              :class="{ 'p-invalid': validationErrors.Name && submitted }"
            />
            <small
              v-show="validationErrors.Name && submitted"
              class="p-error"
            >Name is required.</small
            >
          </div>
          <div class="field">
            <label for="address">Address</label>
            <InputText
              id="address"
              v-model="address"
              :class="{ 'p-invalid': validationErrors.address && submitted }"
            />
            <small
              v-show="validationErrors.address && submitted"
              class="p-error"
            >address is required.</small
            >
          </div>

          <div class="field">
            <label for="url_photo">Url Photo</label>
            <InputText
              id="url_photo"
              v-model="url_photo"
              :class="{ 'p-invalid': validationErrors.url_photo && submitted }"
            />
            <small
              v-show="validationErrors.url_photo && submitted"
              class="p-error"
            >url photo is required.</small
            >
          </div>

          <div class="field">
            <div class="field">
              <label for="class">District</label>
              <Dropdown
                inputId="class"
                v-model="districtSelected"
                :options="classes"
                @change="setType($event)"
                optionLabel="name"
                placeholder="Select a type"
              />
              <small
                v-show="validationErrors.districtSelected && submitted"
                class="p-error"
              >district you to select one</small
              >
            </div>
          </div>

          <div class="field">
            <label for="phone">Phone</label>
            <InputNumber
              id="phone"
              v-model="phone"
              :useGrouping="false"
              :class="{ 'p-invalid': validationErrors.phone && submitted }"
            />
            <small v-show="validationErrors.phone && submitted" class="p-error"
            >phone is required.</small
            >
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button label="Back" @click="prevPag()" icon="pi pi-angle-left" />
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
import { store } from "../../../store";
import { ClimbingGymsApiService } from "../../services/climbing-gyms-api.service";

export default {
  name: "SignUpClimberGym",
  data: () => {
    return {
      info: [],
      store: store,
      last_name: "",
      Name: "",
      districtSelected: "",
      address: "",
      submitted: false,
      validationErrors: {},
      classes: [
        { name: "Miraflores", value: "Miraflores" },
        { name: "San Isidro", value: "San Isidro" },
        { name: "San Miguel", value: "San Miguel" },
        { name: "San Juan de Miraflores", value: "San Juan de Miraflores" },
        { name: "San Luis", value: "San Luis" },
        { name: "San Borja", value: "San Borja" },
        { name: "Cercado de Lima", value: "Cercado de Lima" },
        { name: "La Victoria", value: "La Victoria" },
        { name: "La Molina", value: "La Molina" },
        { name: "La Punta", value: "La Punta" },
      ],
      url_photo: "",
      phone: 0,
      climbing_gym_Service: new ClimbingGymsApiService(),
      newClimber: {
        id: 0,
        Name: "",
        last_name: "",
        email: 0,
        password: "",
        district: "",
        address: "",
        url_photo: "",
        phone: 0,
        type: "",
        status: false,
      },
    };
  },
  computed: {
    Data() {
      console.log(this.districtSelected.value);
      return this.$store.state;
    },
  },
  mounted() {
    console.log(this.store.state.password);
    console.log(this.store.state.email);
    console.log(this.store.state.id);
    console.log("nada");
  },
  methods: {
    nextPage() {
      this.submitted = true;
      console.log(this.districtSelected.value);
      if (this.validateForm()) {
        let data ={};
        data.name = this.Name;
        data.password = this.store.state.password;
        data.email= this.store.state.email;
        data.city= "Lima";
        data.district= this.districtSelected.value;
        data.address= this.address;
        data.phone= String(this.phone);
        data.logoUrl= this.url_photo;
        this.createClimbing(data);
        console.log(data);
        this.$router.push("/LogIn");
      }
    },
    prevPag() {
      this.$router.push("/singUp");
    },
    validateForm() {
      if (this.districtSelected.length == 0)
        this.validationErrors["districtSelected"] = true;
      else delete this.validationErrors["districtSelected"];

      if (!this.Name.trim()) this.validationErrors["Name"] = true;
      else delete this.validationErrors["Name"];

      if (!this.address.trim()) this.validationErrors["address"] = true;
      else delete this.validationErrors["address"];

      if (!this.url_photo.trim()) this.validationErrors["url_photo"] = true;
      else delete this.validationErrors["url_photo"];

      if (!this.phone > 0 && this.phone < 9999999999)
        this.validationErrors["phone"] = true;
      else delete this.validationErrors["phone"];

      return !Object.keys(this.validationErrors).length;
    },
    setType(event) {
      if (this.districtSelected && event.value) {
        console.log(event.value);
        this.districtSelected = event.value;
      }
    },
    createClimbing(climber) {
      this.climbing_gym_Service
        .create(climber)
        .then((response) => {
          console.log(response);
          alert("Registered Successfully");
        })
        .catch((e) => {
          console.log(e);
          alert("Please complete all fields");
        });
    },
  },
};
</script>

<style scoped>

</style>