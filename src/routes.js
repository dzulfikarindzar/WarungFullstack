import Vue from 'vue' 
import VueRouter from "vue-router"
import Home from "./views/Home.vue"
import History from "./views/History.vue"


Vue.use(VueRouter)

const mainRouter = new VueRouter({
    routes: [
    {
        path: "/",
        name : "Home",
        component: Home
    },
    {
        path: "/history",
        name: "History",
        component: History,
    },  
  ],
})

export default mainRouter