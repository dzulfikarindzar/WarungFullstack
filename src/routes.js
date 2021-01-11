import Vue from 'vue' 
import VueRouter from "vue-router"
import Home from "./views/Home"
import Products from "./views/Products"
import History from "./views/History"
import Login from "./views/Login"
import Register from "./views/Register"

Vue.use(VueRouter)

const router = new VueRouter({
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


  ],
})

// mainRouter.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       if (!store.getters.loggedIn) {
//         next({
//           name: "Login",
//         });
//       } else {
//         next();
//       }
//     } else if (
//       store.getters.loggedIn &&
//       to.matched.some((record) => record.name == "Login")
//     ) {
//       next(router.replace(from));
//     } else {
//       next();
//     }
//   });
export default router