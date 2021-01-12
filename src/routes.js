import Vue from 'vue' 
import VueRouter from "vue-router"
import Home from "./views/Home"
import Products from "./views/Products"
import History from "./views/History"
import Login from "./views/Login"
import Register from "./views/Register"
import notFound from "./components/404"

Vue.use(VueRouter)

const mainRouter = new VueRouter({
    mode:'history',
    routes: [
        {
            path:"/",
            redirect: '/login'
        },
    {
        path: "/login",
        name : "Login",
        component: Login
    },
   
    {
        path: "/history",
        name: "History",
        component: History,
},
    {
        path: "/home",
        name: "Home",
        component: Home,
    },
    {
        path: "/products",
        name: "Products",
        component: Products,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
  },
  {
    path : "/*",
    component : notFound,  
  }

  ],
})

export default mainRouter