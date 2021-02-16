<template>
   <div class="row">
    <div class="col-sm-12 col-xl-9">
      <header class="row sticky-top bg-white py-2 shadow">
        <div class="col-3 col-md-1">
          <Navbar />
        </div>
        <div class="col-12 col-md-7 justify-content-between">
          <h2 style="font-size: 33px;" class="text-center py-1 font-weight-bold">Daftar Menu</h2>
        </div>
        <div class="col-6 col-md-4 d-flex justify-content-end">
          <form action="#" class="form-inline my-2 my-lg-0">
            <input
              v-model="srcName.name"
              class="form-control mr-sm-2"
              type="search"
              @keyup="searchName()"
              @keyup.delete="searchName()"
            />
          </form> 
          <button class="btn" @click="searchName()">
            <img src="../assets/searc2.png" alt="" />
          </button>
          <button style= "height: 3.9rem;" class="btn" @click="filterOn()">
            <img src="../assets/icon/filter1.png" alt="" />
          </button>
        </div>
        <div v-if="filter" class="col-12 text-center border-top">
          <div class="row m-2 py-1">
            <div class="col-6 col-md-4 d-flex justify-content-center mt-3">
              <h5>Sort</h5>
              <select class="form-select ml-2" aria-label="Default select example" v-model="sorted.name" @click="sortedProduct()">
                <option selected></option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </select>
            </div>  
    
            <div class="col-6 col-md-4 d-flex justify-content-center mt-3">
              <h5>OrderBy</h5>
              <select class="form-select ml-2" aria-label="Default select example" v-model="sorted.price" @click="sortedProduct()">
                <option selected></option>
                <option value="price">PRICE</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      <main class="row pt-4 bg-light">
        <article
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="items in datas"
          :key="items.id"
        >
          <Card :images="items.image" :name="items.name" :price="items.price" :product="items"/>
        </article>
      </main>
    </div>
    <aside class="col-xl-3 bg-white border-left">
      <div
        class="row sticky-top bg-white py-3 d-flex justify-content-center border-bottom"
      >
        <h2 class="text-center font-weight-bold">
          Cart
          <span class="p-cart-0 bg-primary text-white rounded-circle">
            {{ quantity }}
          </span>
        </h2>
      </div>
      <div class="row pt-3" v-if="allCart.length > 0">
        <div
          v-for="(item, index) in allCart"
          :key="item.id"
          class="col-12 col-xl-6 col-md-6 col-lg-4 col-xl-12"
        >
          <Cart class="d-flex border-0"
          :id="index" 
          :image="item.product.image" 
          :name="item.product.name" 
          :price="item.product.price"
          :qty="item.qty"
          :cart="item.product"/>
        </div>

        <div class="col-12 pt-4">
          <div class="d-flex justify-content-between">
            <h3>Total:</h3>
            <h3>{{toRupiah (calculate) }}*</h3>
          </div>
          <!-- Button trigger modal -->
          <h7>*belum termasuk PB1</h7>
          <button
            type="button"
            class="col btn btn-primary mt-2"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            Checkout
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalLong"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header bg-light">
                  <h3 class="modal-title" id="exampleModalLongTitle">
                    Checkout
                  </h3>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body bg-light">
                  <p class="font-weight-bold text-right">Receipt no:{{randomInvoice(invoices)}}</p>
                  <p class="fst-normal text-left">Cashier: {{ cashier }}</p>
                  <div
                    class="d-flex justify-content-between"
                    v-for="item of allCart"
                    :key="item.product.id"
                  >
                 
                    <p class="font-weight-bold">{{ item.product.name}} x {{item.qty}}</p>
                    <p class="font-weight-bold">{{toRupiah (item.product.price) }}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p class="font-weight-bold">PB1 10% </p>
                    <p class="font-weight-bold">{{toRupiah(ppn)}}</p>
                  </div>
                  <p class="font-weight-bold text-right">
                    Total : {{toRupiah (calculate + ppn) }} 
                  </p>
                  <p class="font-weight-bold text-left pt-2">Payment:Cash</p>
                  
                </div>

                <div class="modal-footer bg-light">
                  <button type="button" class="col btn btn-success" data-dismiss="modal" @click="addCheckout(allCart, (calculate+ppn), cashier, userName, invoices) & cartNull()">
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="col btn btn-danger mt-2"
            @click="cartNull()"
          >
            Cancel
          </button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col container text-center">
          <img class="mb-2" style="height: 9rem; width: 11rem;" src="../assets/icon/food-and-restaurant.png" alt="" />
          <h4>Your cart is empty</h4>
          <p class="text-muted" style="font-size: 0.9rem;">
            Please add some items from the menu
          </p>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import axios from "axios";
import Card from "../components/CardItems.vue";
import Navbar from "../components/Navbar.vue";  
import Cart from "../components/Cart.vue"
import router from "../routes"
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "Home",
   components: {
    Navbar,
    Card,
    Cart,
  },
  data() {
    return {
      datas: null,
      chart: [],
      checkout:{
        cashier:null,
        orders:null,
        amount:null,
        users:null,
        invoices:null,
      },
      cashier: "Dzulfikar",
      sorted:{
        name:'',
        price:'',
      },
      srcName:{
        name:'',
      },
      filter: false,
      cacheKey: 'token',
      userKey: 'name',
      userName: '',
      invoices: '',

      
    };
  },
  methods: {
    randomInvoice(value) {
      return "#" + Math.round(Math.random(value) * 50000 + 1);
    },
    toRupiah(value) {
      return (
        "Rp. " +
        Math.round(value)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
      );
    },
    ...mapActions(['cartNull']),
    loadProducts(){
      axios.get(process.env.VUE_APP_URL + "product", {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then((res) => {
        if(res.data.result.email === 'TokenExpiredError'){
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
          this.datas = null
          this.datas = res.data.result;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    sortedProduct(){
      axios
      .get(process.env.VUE_APP_URL + "product" + "/sort" + `?orderBy=${this.sorted.price}&sort=${this.sorted.name}`,{
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
          this.datas = null;
          this.datas = res.data.result;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    searchName(){
      axios
      .get(process.env.VUE_APP_URL + "product" + `/search?search=${this.srcName.name}`, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then((res) => {
        this.datas = null;
        this.datas = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addCheckout(valueOrders,valueTotal, valueCashier, valueUser, valueInvoices){
      this.checkout.orders = ''
      for(let i = 0; i < valueOrders.length; i++) {
        if(valueOrders.length == 1){
          this.checkout.orders += `${valueOrders[i].product.name}`
        }else{
          if(i == 0){
            this.checkout.orders += `${valueOrders[i].product.name}`
          }else{
            this.checkout.orders += `,${valueOrders[i].product.name}`
          }

        }
      }
      this.checkout.cashier = valueCashier;
      this.checkout.orders += ''
      this.checkout.amount = valueTotal;
      this.checkout.users = valueUser;
      this.Invoices = valueInvoices
      this.checkout.invoices += '';
      // this.checkout.invoices = valueInvoices;
      
    
      console.log(this.checkout)
      
      axios.post(process.env.VUE_APP_URL + "history", this.checkout, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then(() => {
        this.chart = [];
        alert('Terimakasih!')
      })
      .catch((err) => {
        console.log(err);
        alert('Gagal Checkout!')
      });
    },
    addChart(value) {
      if (this.chart.length == 0) {
        this.chart.push(value);
      } else {
        if (this.chart.includes(value)) {
          // this.chart.push(prod);
        } else {
          this.chart.push(value);
        }
      }
    },
    cancel() {
      this.chart = [];
    },
    filterOn() {
      this.filter = !this.filter;
      this.sorted.name= '';
      this.sorted.price = '';
      this.sortedProduct();
    },
  },
  computed: {
    ...mapGetters(['allCart', 'calculate', 'quantity', 'ppn'])
  },
  mounted() {
    this.loadProducts()
    this.sortedProduct()
    this.searchName()
    this.userName = localStorage.getItem(this.userKey)
    // this.Invoices = localStorage.getItem(this.randomInvoices)

  },
};
</script>

<style scoped>
.p-cart-0 {
  padding: 0 0.7rem 0.2rem 0.7rem;
}

.dropdown-menu {
  border: 0;
  padding: 0;
}
</style>