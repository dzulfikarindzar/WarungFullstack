import Axios from 'axios'
import router from '../../routes.js'

const state = {
    cacheKey:'token',
    roleKey:'role',
    userKey:'email'
}
const getters = {
        getToken : (state) => {
            return state
        }
}

const actions = {
    login({commit}, value) {
            Axios.post(process.env.VUE_APP_AUTH, value)
            .then((res) => {
        if(res.data.result[0].msg === 'Email belum terdaftar') {
          return alert('Email belum terdaftar');
        }
        if(res.data.result[0].msg === "Anda gagal Login, password salah"){
          return alert('Anda gagal Login, password salah');
        }
        if(res.data.result[0].msg === 'Token created'){
         commit('setToken', res.data.result[0])
          localStorage.setItem(commit.cacheKey, res.data.result[0].token);
          localStorage.setItem(commit.roleKey, res.data.result[0].role);
          localStorage.setItem(commit.userKey, res.data.result[0].email);
          router.push('Home');
        }
      })
      .catch((err) => {
        console.log(err)
      });
      
    }
    }

const mutations = {
    setToken(state, data) {
            state.user = data.userKey
            state.token = data.cacheKey
            state.role = data.roleKey
        },
}



export default {
state,
getters,
actions,
mutations
}