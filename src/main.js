import '@babel/polyfill'
// import 'mutationobserver-shim'
import Vue from 'vue'
// import './plugins/bootstrap-vue'
import App from './App.vue'
import routers from "./routes"
import Vuelidate from 'vuelidate'
// import home from "./views/home"

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router : routers,
  render: h => h(App),
}).$mount('#app')
