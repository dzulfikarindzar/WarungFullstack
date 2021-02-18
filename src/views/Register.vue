<template>
<form class="register-page" @submit.prevent="submit">
  <div class="container">
    <div class="register-form">
    <h1>Register Form</h1>

      <div class="inpform">
          <input 
          type="text" 
          @blur="onBlur"
           @focus="onFocus" 
          required v-model="register.name"
           label="username"
           />
          <span data-placeholder="Username"></span>
      </div>

      <div class="inpform">
          <input 
          type="email" 
          @blur="onBlur"
           @focus="onFocus" 
           required v-model="register.email"
           />
          <span data-placeholder="Email"></span>
      </div>

      <div class="inpform">
          <input 
          type="Password"
          @blur="onBlur" 
          @focus="onFocus"
          required v-model="register.password"
         />
          <span data-placeholder="Password"></span>
      </div>

        <input 
        type="submit" 
        class="register-btn" 
        value="Sign Up" 
        @click="formRegister(register)"/>

      <div class="bottom-txt">
            <p>Have an account? <router-link class="font-weight-bold" to="/">Log in</router-link></p>
      </div>
    </div>  
  </div>
</form>
</template>


<script>
import axios from "axios"
export default {
    name: "Register",
    data() {
        return {
            register:{
            name: null,
            email: null,
            password: null,
            role: "users",
            },
            cacheKey:'token',
            roleKey:'role',
            userKey:'name'
        }
      },
    methods: {
        valid(email) {
             const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
             return emailRegex.test(email);
    },
     formRegister(value) {
        if(!this.valid(value.email)){
        return alert('Email not valid!')
      }
      if(value.name.length < 3){
        return alert("Username must be at least 3 letters")
      }
        if(value.name === '' || value.name === null){
        return alert('fill the name')
      }
        if(value.email === '' || value.email === null){
        return alert('fill the email')
      }
        if(value.password === '' || value.password === null){
        return alert('fill the password')
      }
       if(value.password.length < 6) {
         return alert('Password must be at least 6 letters')
       }
      
       axios
      .post(process.env.VUE_APP_USERS, value)
      .then((res) => {
        if(res.data.result[0].msg === "username has been registered"){
          alert('Username has been registered');
        } 
        else if(res.data.result[0].msg === "email has been registered") {
            alert('Email has been registered')
        }
        else{
          alert('Thanks for Register');
          this.register.name = null;
          this.register.email = null;
          this.register.password = null;
        }
      })
      .catch((err) => {
        this.reset
        alert('Sorry, Register failed');
        console.log(err);
      });
        },
        onFocus(event) {
            event.target.classList.add("focus")
        },
        onBlur(event) {
            if (event.target.value === "") {
                event.target.classList.remove("focus")
            }
        },
        
    },
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
}
.register-page {
    width: 100%;
    height: 100vh;
    /* background-image: url("../assets/icon/resto(2).png"); */
    background-color: rgba(5, 5, 5, 0.397);
    background-size: cover;
}
.register-form {
    width: 360px;
    background: rgba(236, 240, 241, 0.9);
    height: 500px;
    padding: 80px 40px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    box-shadow: 0px 0px 20px -9px #000000;
    transform: translate(-50%, -50%);
}
.register-form h1 {
    text-align: center;
    margin-bottom: 60px;
    font-size: 15pt;
    color: #0439d9;
}
.inpform {
   border-bottom: 1px solid rgb(160, 159, 159);
    position: relative;
    margin: 30px 0;
}
.inpform input {
    font-size: 15px;
    width: 100%;
    color: #333;
    border: none;
    background: none;
    outline: none;
    padding: 0 5px;
    height: 40px;
}
.inpform span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: #adadad;
    transform: translateY(-50%);
    z-index: -1;
    transition: 0.5s;
}
.inpform span::after {
    content: "";
    position: absolute;
    bottom: -5%;
    left: 0px;
    width: 0%;
    height: 2px;
    background-image: linear-gradient(120deg, #07038c, #2980b9);
    transition: 0.5s;
}
.focus + span::before {
    top: -10px;
    font-size: 9pt;
}
.focus + span::after {
    width: 100%;
}
.register-btn {
    display: block;
    margin: 15px 0;
    width: 100%;
    height: 35px;
    outline: none;
    border: none;
    background-size: 200%;
    cursor: pointer;
    background-image: linear-gradient(120deg, #07038c, #2980b9);
    color: #fff;
    border-radius: 5px;
    transition: 1s;
}
.register-btn:hover {
    background-position: right;
}
.bottom-txt {
    text-align: center;
    font-size: 15px;
    color: #9e9e9e;
}
@media  (max-width: 540px) {
  .container {
    width: 100%;
    height: 100vh;
    /* background-image: url("../assets/icon/resto(2).png"); */
    background-size: cover;
}
  .register-form {
    width: 80%;
    background: rgba(236, 240, 241, 0.9);
    padding: 80px 40px;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    box-shadow: 0px 0px 20px -9px #000000;
    transform: translate(-50%, -50%);
}
.register-form h1 {
    text-align: center;
    margin-bottom: 60px;
    font-size: 15pt;
    color: #0439d9;
}
}
@media  (max-width: 768px) {
  .container {
    min-height: 100vh;
    /* background-image: url("../assets/icon/resto(2).png"); */
    background-repeat: no-repeat;
    background-size: cover;;
}
  .register-form {
    background: rgba(236, 240, 241, 0.9);
    height: 480px;
    padding: 80px 40px;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    box-shadow: 0px 0px 20px -9px #000000;
    transform: translate(-50%, -50%);
}
.register-form h1 {
    text-align: center;
    margin-bottom: 60px;
    font-size: 15pt;
    color: #0439d9;
}
}
@media  (max-width: 1200px) {
  .container {
    min-height: 100vh;
    /* background-image: url("../assets/icon/resto(2).png"); */
    background-repeat: no-repeat;
    background-size: cover;
}
  .register-form {
    background: rgba(236, 240, 241, 0.9);
    height: 480px;
    padding: 80px 40px;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    box-shadow: 0px 0px 20px -9px #000000;
    transform: translate(-50%, -50%);
}
.register-form h1 {
    text-align: center;
    margin-bottom: 60px;
    font-size: 15pt;
    color: #0439d9;
}
}
</style>