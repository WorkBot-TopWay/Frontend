<template>
<div class="container flex flex-row" style="width: 100%">
  <div class="flex align-items-center justify-content-start flex-column" style="width: 30%">
    <h2 class="font font-semibold">Profile</h2>
    <Image :src="localTopWay.state.userInfo.urlPhoto" alt="Image" width="300" />
  </div>
  <div class="
      flex
      justify-content-center
      align-items-center
      bg-black-alpha-10
    "
      style="width:70%">

      <Card class="col-12 md:col-6 lg:col-10 mt-5" style="width: 80%">
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
              <label class="label">New Password</label>
              <Password
                type="text"
                v-model="password1"
                placeholder="Please enter a password"
                :class="{ 'p-invalid': validationErrors.password1 && submitted }"
                toggleMask
              ></Password>
              <small
                v-show="validationErrors.password1 && submitted"
                class="p-error"
              >requires entering a password</small
              >
            </div>
            <div class="field">
              <label class="label">Confirm Password</label>
              <Password
                type="text"
                v-model="password2"
                placeholder="Please enter a password"
                :class="{ 'p-invalid': validationErrors.password2 && submitted }"
                toggleMask
              ></Password>
              <small
                v-show="validationErrors.password2 && submitted"
                class="p-error"
              >requires entering a password</small
              >
            </div>
            <div class="field">
              <label for="first_name">First Name</label>
              <InputText
                id="first_name"
                v-model="first_name"
                :class="{ 'p-invalid': validationErrors.first_name && submitted }"
              />
              <small
                v-show="validationErrors.first_name && submitted"
                class="p-error"
              >first name is required.</small
              >
            </div>

            <div class="field">
              <label for="last_name">Last Name</label>
              <InputText
                id="last_name"
                v-model="last_name"
                :class="{ 'p-invalid': validationErrors.last_name && submitted }"
              />
              <small
                v-show="validationErrors.last_name && submitted"
                class="p-error"
              >last name is required.</small
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
            <i></i>
            <Button
              label="Save"
              @click="nextPage()"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { ScalerApiService } from "../topway/services/scaler-api.service";
import { LocalStoreTopWay } from "../LocalStore/LocalStoreTopWay";

export default {
  name: "My_Profile",
  data:()=>{
    return {
      scaler_Service: new ScalerApiService(),
      localTopWay: LocalStoreTopWay,
      last_name: "",
      first_name: "",
      districtSelected: "",
      address: "",
      password1: "",
      password2: "",
      same: true,
      email: "",
      url_photo: "",
      phone: 0,
      validationErrors: {},
      submitted: false,
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
    }
  },
  mounted() {
    this.email= this.localTopWay.state.userInfo.email;
    this.phone = this.localTopWay.state.userInfo.phone;
    this.password = "";
    this.first_name = this.localTopWay.state.userInfo.firstName;
    this.last_name = this.localTopWay.state.userInfo.lastName;
    this.districtSelected = {name:this.localTopWay.state.userInfo.district, value:this.localTopWay.state.userInfo.district};
    this.address = this.localTopWay.state.userInfo.address;
    this.url_photo = this.localTopWay.state.userInfo.urlPhoto;
  },
  methods: {
    nextPage() {
      this.submitted = true;
      console.log(this.districtSelected.value);
      if (this.validateForm()&&this.same) {
        let data ={};
        data.firstName = this.first_name;
        data.lastName = this.last_name;
        data.password = this.password1;
        data.city= "Lima";
        data.district= this.districtSelected.value;
        data.address= this.address;
        data.phone= String(this.phone);
        data.urlPhoto= this.url_photo;
        data.email= this.email;
        console.log(data);
        this.scaler_Service.update(this.localTopWay.state.userInfo.id, data).then(response => {
          console.log(response);
          alert("Information updated successfully, you will see the changes when you log back in");
        });
      }
    },
    setType(event) {
      if (this.districtSelected && event.value) {
        console.log(event.value);
        this.districtSelected = event.value;
      }
    },
  validateForm() {
      if(this.password1!=="" || this.password2!==""){
        if (!this.password1.trim()||this.password1!==this.password2) this.validationErrors["password1"] = true;
        else delete this.validationErrors["password1"];

        if (!this.password2.trim()||this.password1!==this.password2) this.validationErrors["password2"] = true;
        else delete this.validationErrors["password2"];

        this.same = this.password1 === this.password2;
      }else {
        delete this.validationErrors["password1"];
        delete this.validationErrors["password2"];
      }
    if (!this.email.trim()) {
      this.validationErrors["email"] = true;
    } else {
      if (!this.validEmail(this.email)) {
        this.validationErrors["email"] = true;
      } else {
        delete this.validationErrors["email"];
      }
    }
    if (this.districtSelected.length == 0)
      this.validationErrors["districtSelected"] = true;
    else delete this.validationErrors["districtSelected"];

    if (!this.first_name.trim()) this.validationErrors["first_name"] = true;
    else delete this.validationErrors["first_name"];

    if (!this.last_name.trim()) this.validationErrors["last_name"] = true;
    else delete this.validationErrors["last_name"];

    if (!this.address.trim()) this.validationErrors["address"] = true;
    else delete this.validationErrors["address"];

    if (!this.url_photo.trim()) this.validationErrors["url_photo"] = true;
    else delete this.validationErrors["url_photo"];

    if (!this.phone > 0 && this.phone < 9999999999)
      this.validationErrors["phone"] = true;
    else delete this.validationErrors["phone"];

    return !Object.keys(this.validationErrors).length;
  },
    validEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
        email
      );
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Suez+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,500&display=swap");

.font {
  font-family: "Open Sans", sans-serif;
}
</style>