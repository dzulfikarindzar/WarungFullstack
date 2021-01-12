<template>
  <div class="row">
    <header
      class="col-12 sticky-top bg-white d-flex justify-content-between py-4 shadow"
    >
      <Navbar />
      <h2 class="text-center">History</h2>
      <h2></h2>
    </header>
    <main class="col-12 mt-3">
      <div class="row mt-3">
        <div class="col-6 col-md-4">
          <img src="../assets/history/Card.svg" alt="" class="card-img-top" />
        </div>
        <div class="col-6 col-md-4">
          <img src="../assets/history/Card 2.svg" alt="" class="card-img-top" />
        </div>
        <div class="col-6 col-md-4">
          <img src="../assets/history/Card 3.svg" alt="" class="card-img-top" />
        </div>
      </div>
      <div  class="row mt-3">
        <div class="col-6">
          <img src="../assets/history/Chart.svg" alt="" class="card-img-top" />
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12 table-responsive card shadow">
          <h2 class="mt-3 ml-3">Recent Order</h2>
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">No. ID</th>
                <th scope="col">Cashier</th>
                <th scope="col">Orders</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="history in histories" :key="history.id">
                <th scope="row">{{history.id}}</th>
                <td>{{history.cashier}}</td>
                <td>
                  <div class="" v-for="order in history.orders" :key="order" >
                    {{order}}
                  </div>
                </td>
                <td>Rp.{{history.amount}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";
import router from '../routes';

export default {
  name: "history",
  components: {
    Navbar,
  },
  data(){
    return{
      histories:[],
      cacheKey: 'token',
      roleKey: 'role',
      role: '',
    }
  },
  methods:{
    loadHistory(){
      axios.get(process.env.VUE_APP_HISTORY, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then((res) => {
        if(res.data.result.name === 'TokenExpiredError'){
          alert('Token Expired! Silahkan Login Lagi');
          router.push({ path: '/' });
        }else
        if(res.data.result[0].msg === 'Login dulu!'){
          alert('Login Dulu!');
          router.push({ path: '/' });
        }else
        if(res.data.result[0].msg === 'Not Found'){
          alert('404 | Not Found');
          router.push('404');
        }else{
          this.histories = res.data.result;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
  mounted(){
    this.loadHistory()
    this.role = localStorage.getItem(this.roleKey)
  }
};
</script>
