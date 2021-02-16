import Vue from 'vue'
import Vuex from 'vuex'
// import auth from './modules/auth'
import Cart from './modules/cart'


Vue.use(Vuex)

export default new Vuex.Store({
    modules :{
        Cart,
    },
})