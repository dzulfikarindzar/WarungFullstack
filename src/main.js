import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
// import sample from "./sample"
import routes from './routes'

Vue.config.productionTip = false

new Vue({
  router : routes,
  render: h => h(App),
}).$mount('#app')

