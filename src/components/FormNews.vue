<template>
  <form @submit.prevent="newsSubmit">
    <label>Input</label>
    <input type="email" required v-model="email">

    <label>Password</label>
    <input type="password" required v-model="password">
    <div v-if="passwordError " class="error">{{passwordError}}</div>

    <label>Role</label>
    <select v-model="role">
      <option value="developer">Web Developer</option>
      <option value="designer">Web Designer</option>
    </select>

    <label>Title</label>
    <input type="text" v-model="tempTitle" @keyup="addTitle">
    <div v-for="title in titles" :key="title" class="pill">
      <span @click="deleteTitle(title)"> {{ title }}</span>
    </div>

    <div class="terms">
      <input type="checkbox" v-model="terms" required>
      <label>Accept terms & conditions</label>
    </div>

    <div class="submit">
      <button>Submit</button>
    </div>

    <div id="app">
      <div v-if="!image">
        <button>Select an image</button>
        <input type="file" @change="onFileChange">
      </div>
      <div v-else>
        <img :src="image"/>
        <button @click="removeImage">Remove Image</button>
      </div>
    </div>

  </form>
</template>

<script>
export default {
  name: "FormNews",
  data(){
    return{
      image:'',
      email: '',
      password: '',
      role:'',
      terms: false,
      tempTitle: '',
      titles: [],
      passwordError: ''
    }
  },

  beforeMount(){
    var vm = this
    console.log('before Mounted')
    vm.get('img')
  },

  methods: {
    get(key){
      this.image=localStorage.getItem(key);
    },
    set(key){
      try{
        localStorage.setItem(key, this.image);
      }
      catch (e){
        console.log(`Storage failed: ${e}`);
      }
    },
    onFileChange(e){
      var files = e.target.files || e.dataTransfer.files;
      if(!files.length) return;
      this.createImage(files[0]);
    },

    createImage(file){
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) =>{
        vm.image = e.target.result;
        vm.set('img');
      };
      reader.readAsDataURL(file);
    },

    removeImage : function (e){
      this.image = '';
      localStorage.removeItem('img')
    },



    addTitle(e){
      if(e.key === ',' && this.tempTitle){
        if(!this.titles.includes(this.tempTitle)){

          this.titles.push(this.tempTitle)
        }
        this.tempTitle = ''
      }
    },

    deleteTitle(title){
      this.titles = this.titles.filter((item) => {

        return title !== item
      })
    },
    newsSubmit(){
      this.passwordError = this.password.length > 5 ?
        '' : 'Password must be at least 6 chars long'
      if (!this.passwordError){
        console.log('email', this.email)
        console.log('password', this.password)
        console.log('role', this.role)
        console.log('title', this.titles)
        console.log('Terms Accepted', this.terms)
      }
    }
  }
};
</script>

<style scoped>
form{
  max-width: 420px;
  margin: 30px;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label{
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input, select{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input[type="checkbox"]{
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}
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
.error{
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>