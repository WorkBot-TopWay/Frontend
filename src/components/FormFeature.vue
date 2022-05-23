<template>
  <div class="stepsdemo-content flex justify-content-center align-items-center bg-black-alpha-10"
    style="height: 85vh">
    <Card class="col-12 md:col-6 lg:col-10">
      <template v-slot:title> Gym Features </template>
      <template v-slot:subtitle> What makes your gym special? </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="description"> Description </label>
            <InputText id="description" v-model="description"/>
          </div>

          <div class="field">
            <label for="type_climbing"> Type(s) of Climbing </label>
            <InputText id="type_climbing" v-model="tempType_C" placeholder="Ex: Bouldering, Lead, etc" @keyup="addType_Climbing"/>
            <div v-for="type_c in type_Climbing" :key="type_c" class="pill">
              <span @click="deleteType_C(type_c)"> {{ type_c }}</span>
            </div>
          </div>

          <div class="p-fluid grid formgrid">
            <div class="field col-12 md:col-4">
              <label for="days_week"> Openings </label>
              <InputText id="days_week" v-model="days_week" placeholder="Ex: Monday to Friday"/>
            </div>
            <div class="field col-12 md:col-4">
              <label for="office_hours">Hours</label>
              <InputText id="office_hours" v-model="office_hours" placeholder="Ex: 8:00 - 20:00"/>
            </div>
          </div>

          <div class="field">
            <label for="routes"> Number of routes </label>
            <InputNumber id="routes" v-model="routes"/>
          </div>
          <div class="field">
            <label for="max_height"> Maximum Height </label>
            <InputText id="max_height" v-model="max_height" placeholder="Ex: 20 meters"/>
          </div>
          <div class="field">
            <label for="rock_type"> Rock Type </label>
            <InputText id="rock_type" v-model="rock_type" placeholder="Ex: Polyurethane, wood, etc"/>
          </div>
          <div class="field">
            <label for="bolting"> Bolting </label>
            <InputText id="bolting" v-model="bolting" placeholder="Ex: Sport climb-bouldering-Traditional climbing"/>
          </div>
          <div class="grid p-fluid">
            <div class="col-12 md:col-4">
              <label for="price"> Price </label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">$</span>
                <InputNumber id="price" v-model="price" placeholder="Price"/>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between submit">
          <i></i>
          <Button label="Submit" @click="featureSubmit()"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "FormFeature",
  data(){
    return{
      description:'',
      tempType_C:'',
      days_week:'',
      office_hours:'',
      routes: null,
      max_height: '',
      rock_type: '',
      bolting:'',
      price: null,
      type_Climbing:[]
    }
  },
  methods: {
    addType_Climbing(e){
      if(e.key === ',' && this.tempType_C){
        if(!this.type_Climbing.includes(this.tempType_C)){
            this.type_Climbing.push(this.tempType_C)
        }
        this.tempType_C = ''
      }
    },
    deleteType_C(type_c){
      this.type_Climbing = this.type_Climbing.filter((item) =>{
        return type_c !== item
      })
    },
    featureSubmit(){
      console.log('description', this.description)
      console.log('days_week',this.days_week)
      console.log('office_hours',this.office_hours)
      console.log('routes',this.routes)
      console.log('max_height',this.max_height)
      console.log('rock_type',this.rock_type)
      console.log('bolting',this.bolting)
      console.log('price',this.price)
      console.log('type_climbing', this.type_Climbing)
    }
  }
};
</script>

<style scoped>
.pill{
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}
button{
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.submit{
  text-align: center;
}
</style>