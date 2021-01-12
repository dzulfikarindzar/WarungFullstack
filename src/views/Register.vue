<template>
<form @submit.prevent="submit">
    <div class="Register-container">
        <div class="Register-login-form">
            <div class="Register-img-container">
                <div class="Register-section">
                    <div class="logo">
                    </div>
                </div>
            </div>
        <div class="Register-input-container">
            <div class="Register-text-explain">
                <h2>Form Register</h2>
            </div>
            <div class="Register-input">
                <div class="Register-inp">
                    <input
                        type="text"
                        name="username"
                        @blur="onBlur"
                        @focus="onFocus"
                        v-model="register.username"
                        />
                        <span data-placeholder="Username"/>
                </div>
                <div class="Register-inp">
                    <input
                  
                        type="email"
                        name="email"
                        @blur="onBlur"
                        @focus="onFocus"
                        v-model="register.email"
                    />
                    <span data-placeholder="Email"/>
                </div>
                <div class="Register-inp">
                    <input
                        type="password"
                        name="password"
                        @blur="onBlur"
                        @focus="onFocus"
                        v-model="register.password" 
                    />
                    <span data-placeholder="Password"/>
                    
                </div>
                <h3>*Dengan mengklik Submit, Anda menyetujui Ketentuan, Kebijakan Data dan Kebijakan Cookie kami.</h3>
            </div>
            <div class="Register-btn-save">
                <div class="bottom-txt">
                    <p>Have account? <router-link to="/">Login here!</router-link></p>
                </div>
                    <button @click="formRegister(register)">Submit</button>
            </div>
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
            username: null,
            email: null,
            password: null,
            role: "users",
            },
            cacheKey:'token',
            roleKey:'role',
            userKey:'email'
        }
    },
    methods: {
    formRegister(value) {
        // this.$v.$touch();
        // if(value.$v.error) {return}
        if(value.username === '' || value.username === null){
        return alert('isikan nama')
      }
        if(value.email === '' || value.email === null){
        return alert('isikan email')
      }
       if(!this.evalid(value.email)){
        return alert('Email tidak valid!')
      }
        if(value.password === '' || value.password === null){
        return alert('isikan password')
      }
      
       axios
      .post(process.env.VUE_APP_USERS, value)
      .then((res) => {
        if(res.data.result[0].msg === "email has been registered"){
          alert('Username/email has been registered!');
        }else{
          alert('Register Success');
          this.register.username = null;
          this.register.email = null;
          this.register.password = null;
        }
      })
      .catch((err) => {
        alert('Register gagal');
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
 evalid(email) {
      const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      return emailRegex.test(email);
    }
        
    },
}
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
}

.Register-container {
    font-family: "Roboto", sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Register-login-form {
    width: 68%;
    height: 555px;
    background: rgba(236, 240, 241, 0.678);
    border-radius: 10px;
    box-shadow: 0px 0px 20px -9px #000000;
    display: flex;

    .Register-img-container {
        position: relative;
        width: 190px;
        height: 100%;
        z-index: -1;

    }
}

h3 {
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 10px;
    margin:15px;
  
}

.Register-text-explain {
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;

    h2 {
        font-size: 25px;
        margin-bottom: 0px;
        color: #0424d9;
        text-align:center;
    }
}

.Register-input-container {
    width: 62%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-top: 20px;

    .Register-input-name {
        margin-top: 10px;

        input {
            color: #333;
            background: none;
            outline: none;
            border: 1px solid #979797;
            width: 250px;
            padding-left: 5px;
            height: 35px;
            border-radius: 3px;
            font-size: 15px;
        }
    }
}
.Register-putin {
    margin-top: 20px;
}

.Register-btn-save {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 50px;
    margin-top: 45px;

    .botom-txt {
        margin-left: 40px;
    }

    button {
        outline: none;
        border: none;
        background-image: linear-gradient(120deg, #07038c, #2980b9);    
        border-radius: 3px;
        padding: 8px 25px;
        font-size: 15px;
        color: white;
        cursor: pointer;
        transition: 0.5;
    }
}

.Register-btn-save:hover {
    background-position: center;
}

.Register-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 62%;
    width: 100%;
}


.Register-inp {
    border-bottom: 2px solid #dadada;
    position: relative;
    margin: 20px 0;
    width: 65%;

    input {
        font-size: 15px;
        width: 100%;
        color: #333;
        border: none;
        background: none;
        outline: none;
        padding: 0 5px;
        height: 40px;
    }

    span {
        &::before {
            content: attr(data-placeholder);
            position: absolute;
            top: 50%;
            left: 5px;
            color: rgb(0, 0, 0);
            transform: translateY(-50%);
            z-index: -1;
            transition: 0.5s;
        }

        &::after {
            content: "";
            position: absolute;
            bottom: -5%;
            left: 0px;
            width: 0%;
            height: 2px;
            background-image: linear-gradient(120deg, #07038c, #2980b9);
            transition: 0.5s;
        }

            }
}

.focus + span::before {
    top: -10px;
    font-size: 9pt;
}

.focus + span::after {
    width: 100%;
}

.Register-custom-select {
    position: relative;
    display: inline-block;
    margin-top: 20px;
    right: 13%;

    select {
        border: none;
        border-bottom: 1px solid grey;
        outline: none;
        width: 200px;
        height: 30px;
        font-size: 15px;
        -moz-appearance: button; /* Firefox */
        -webkit-appearance: button; /* Safari and Chrome */
        appearance: none;
        appearance: none;
        color: #979797;
    }
}

.Register-custom-select::before {
    content: "\A";
    position: absolute;
    /* width: 20px;
    height: 20px; */
    display: inline-block;
    top: 13px;
    left: 90%;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid #bbb;
}

.Register-section {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>