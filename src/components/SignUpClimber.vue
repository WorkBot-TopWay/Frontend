<template>
  <div class="stepsdemo-content flex justify-content-center align-items-center bg-black-alpha-10" style="height: 120vh">
    <Card class="col-12 md:col-6 lg:col-10 ">
      <template v-slot:title>
        Personal Information
      </template>
      <template v-slot:subtitle>
        Enter your personal information
      </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="first_name">First Name</label>
            <InputText id="first_name" v-model="first_name" :class="{'p-invalid': validationErrors.first_name && submitted}" />
            <small v-show="validationErrors.first_name && submitted" class="p-error">first name is required.</small>
          </div>

          <div class="field">
            <label for="last_name">Last Name</label>
            <InputText id="last_name" v-model="last_name" :class="{'p-invalid': validationErrors.last_name && submitted}" />
            <small v-show="validationErrors.last_name && submitted" class="p-error">last name is required.</small>
          </div>

          <div class="field">
            <label for="address">Address</label>
            <InputText id="address" v-model="address" :class="{'p-invalid': validationErrors.address && submitted}" />
            <small v-show="validationErrors.address && submitted" class="p-error">address is required.</small>
          </div>

          <div class="field">
            <label for="url_photo">Url Photo</label>
            <InputText id="url_photo" v-model="url_photo" :class="{'p-invalid': validationErrors.url_photo && submitted}" />
            <small v-show="validationErrors.url_photo && submitted" class="p-error">url photo is required.</small>
          </div>

          <div class="field">
            <div class="field">
              <label for="class">District</label>
              <Dropdown inputId="class" v-model="districtSelected" :options="classes" @change="setType($event)" optionLabel="name" placeholder="Select a type" />
              <small v-show="validationErrors.districtSelected && submitted" class="p-error">district you to select one</small>
            </div>
          </div>

          <div class="field">
            <label for="phone">Phone</label>
            <InputNumber id="phone" v-model="phone" :useGrouping="false" :class="{'p-invalid': validationErrors.phone && submitted}"/>
            <small v-show="validationErrors.phone && submitted" class="p-error">phone is required.</small>
          </div>

        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between">
          <Button label="Back" @click="prevPag()" icon="pi pi-angle-left" />
          <Button label="Next" @click="nextPage(),showSuccess()"  icon="pi pi-angle-right" iconPos="right" />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { store } from "../store";
import { ScalerApiService } from "../topway/services/scaler-api.service";
export default {
  name: "SingUpClimber",
  data:()=>{
    return {
      info:[],
      store:store,
      last_name: "",
      first_name: "",
      districtSelected: "",
      address: "",
      submitted: false,
      validationErrors: {},
      classes: [
        {name: "Miraflores", value: "Miraflores"},
        {name: "San Isidro", value: "San Isidro"},
        {name: "San Miguel", value: "San Miguel"},
        {name: "San Juan de Miraflores", value: "San Juan de Miraflores"},
        {name: "San Luis", value: "San Luis"},
        {name: "San Borja", value: "San Borja"},
        {name: "Cercado de Lima", value: "Cercado de Lima"},
        {name: "La Victoria", value: "La Victoria"},
        {name: "La Molina", value: "La Molina"},
        {name: "La Punta", value: "La Punta"},
      ],
      url_photo: "",
      phone: 0,
      scaler_Service: new ScalerApiService(),
      newClimber:{
        id:0,
        first_name: '',
        last_name: '',
        email: 0,
        password: "",
        district: '',
        address: '',
        url_photo: '',
        phone: 0,
        type: '',
      }
    }
  },
  computed:{
    Data(){
      console.log(this.districtSelected.value)
      return this.$store.state
    }
  },
  mounted() {
    console.log(this.store.state.password)
    console.log(this.store.state.email)
    console.log(this.store.state.id)
    console.log("nada")
  },
  methods: {
    nextPage() {
      this.submitted = true;
      console.log(this.districtSelected.value)
      if (this.validateForm()) {
        this.newClimber.id = this.store.state.id
        this.newClimber.first_name = this.first_name;
        this.newClimber.last_name = this.last_name;
        this.newClimber.email = this.store.state.email;
        this.newClimber.password = this.store.state.password;
        this.newClimber.district = this.districtSelected.value;
        this.newClimber.address = this.address;
        this.newClimber.url_photo = this.url_photo;
        this.newClimber.phone = this.phone;
        this.newClimber.type = this.store.state.type;
        this.createClimbing(this.newClimber);
        this.$router.push("/");
      }
    },
    prevPag(){
      this.$router.push('/singUp');
    },
    validateForm(){
      if (this.districtSelected.length == 0)
        this.validationErrors['districtSelected'] = true;
      else
        delete this.validationErrors['districtSelected'];

      if (!this.first_name.trim())
        this.validationErrors['first_name'] = true;
      else
        delete this.validationErrors['first_name'];


      if (!this.last_name.trim())
        this.validationErrors['last_name'] = true;
      else
        delete this.validationErrors['last_name'];

      if (!this.address.trim())
        this.validationErrors['address'] = true;
      else
        delete this.validationErrors['address'];

      if (!this.url_photo.trim())
        this.validationErrors['url_photo'] = true;
      else
        delete this.validationErrors['url_photo'];

      if (!this.phone >0 && this.phone < 9999999999)
        this.validationErrors['phone'] = true;
      else
        delete this.validationErrors['phone'];

      return !Object.keys(this.validationErrors).length;
    }
    ,
    setType(event) {
      if (this.districtSelected && event.value) {
        console.log(event.value)
        this.districtSelected=event.value;
      }
    },
    createClimbing(climber){
      this.scaler_Service.create(climber)
          .then(response => {
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Climbing Created",
              life: 3000,
            });
            console.log(response);
          }).catch((e) => {
        console.log(e);
      });;
    },
    showSuccess() {
      this.$toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
    }
  }

};
</script>

<style scoped>

</style>