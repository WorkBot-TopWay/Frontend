<template>
  <div class="stepsdemo-content flex justify-content-center align-items-center bg-black-alpha-10" style="height: 85vh">
    <Card class="col-12 md:col-6 lg:col-10">
      <template v-slot:title> Competition </template>
      <template v-slot:subtitle> Tell us about your competition </template>
      <template v-slot:content>
        <div class="p-fluid">
          <div class="field">
            <label for="name"> Comp. Name </label>
            <InputText id="name" v-model="name"/>
          </div>
        </div>
        <div class="p-fluid grid formgrid">
          <div class="field col-12 md:col-4">
            <label for="date">Date</label>
            <Calendar id="date" v-model="date"  dateFormat="dd-mm-yy" />
          </div>
          <div class="field col-12 md:col-4">
            <label for="time">Time / 12h</label>
            <Calendar id="time" v-model="time" :timeOnly="true" hourFormat="12"/>
          </div>
        </div>
        <div class="p-fluid">
          <div class="field">
            <label for="type"> Type of Climbing Comp. </label>
            <InputText id="type" v-model="type"/>
        </div>
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
      </template>
      <template v-slot:footer>
        <div class="grid grid-nogutter justify-content-between submit">
          <i></i>
          <Button label="Submit" @click="CompSubmit()"/>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "FormCompetition",
  data(){
    return{
      name:'',
      date:null,
      time: null,
      type:'',
      price:''
    }
  },
  methods:{
    CompSubmit(){
      console.log('name', this.name)
      console.log('description', this.description)
      console.log('date', this.date)
      console.log('time', this.time)
      console.log('type', this.type)
      console.log('price', this.price)
    }
  }
};
</script>

<style scoped>
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