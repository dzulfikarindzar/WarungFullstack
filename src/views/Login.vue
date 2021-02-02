<template>
<form @submit.prevent="submit">
  <div class="container" >
    <div class="login-form">
      <h1>Login Form</h1>

      <div class="inpform">
          <input 
          type="text" 
          @blur="onBlur"
           @focus="onFocus" 
           v-model="loginInfo.email"
           label="Email"
           :class="{'is-invalid': $v.email.$error}"
           />
          <span data-placeholder="Email"></span>
      </div>

      <div class="inpform">
          <input 
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @blur="onBlur" 
          @focus="onFocus"
          v-model="loginInfo.password"
         />
          <span data-placeholder="Password"></span>
      </div>

      <input 
        type="submit" 
        class="login-btn" 
        value="Login" 
        @click="login(loginInfo)"/>

        

      <div class="bottom-txt">
            <p>Don't have account? <router-link to="/register">Sign up now!</router-link></p>
      </div>
    </div>
  </div>
</form>
</template>

<script>
import { required, minLength, maxLength, email, password } from 'vuelidate/lib/validators'
import Axios from 'axios'
import router from '../routes'
export default {
    name: "Login",
    data() {
        return {
          showPassword: false,
          loginInfo: {
            email: "",
            password: "",
          },
          cacheKey:'token',
          roleKey:'role',
          userKey:'name'
        }
    },
    validations : {
      email : {
          required,
          email,
          maxLength : maxLength(50),
      }
    },
    password : {
        required,
        password,
        minLength : minLength(2)
    },
    methods: {
        login(value) {
            Axios.post(process.env.VUE_APP_AUTH, value)
            .then((res) => {
        if(res.data.result[0].msg === 'Email belum terdaftar') {
          return alert('Email belum terdaftar');
        }
        if(res.data.result[0].msg === "Anda gagal Login, password salah"){
          return alert('Anda gagal Login, password salah');
        }
        if(res.data.result[0].msg === 'Token created'){
          localStorage.setItem(this.cacheKey, res.data.result[0].token);
          localStorage.setItem(this.roleKey, res.data.result[0].role);
          localStorage.setItem(this.userKey, res.data.result[0].email);
          router.push('Home');
        }
      })
      .catch((err) => {
        console.log(err)
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

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    /* font-family: 'Poppins', sans-serif; */
    font-family: "Montserrat", sans-serif;
}

.container {
    min-height: 100vh;
    background-image: url("../assets/warjok2.jpg");
    background-repeat: no-repeat;
    background-size: 700px;
    background-position: 20% 50%;
}

.login-form {
    width: 360px;
    background: rgba(236, 240, 241, 0.9);
    height: 480px;
    padding: 80px 40px;
    border-radius: 10px;
    position: absolute;
    left: 70%;
    top: 50%;
    box-shadow: 0px 0px 20px -9px #000000;
    transform: translate(-50%, -50%);
}

.login-form h1 {
    text-align: center;
    margin-bottom: 60px;
    font-size: 15pt;
    color: #0439d9;
}

.inpform {
    border-bottom: 2px solid #dadada;
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

.login-btn {
    display: block;
    margin: 50px 0;
    width: 100%;
    height: 40px;
    border: none;
    background-size: 200%;
    cursor: pointer;
    background-image: linear-gradient(120deg, #07038c, #2980b9);
    color: #fff;
    transition: 0.5s;
}

.login-btn:hover {
    background-position: right;
}

.botom-txt {
    text-align: center;
    font-size: 13px;
    color: #9e9e9e;
}
</style>

