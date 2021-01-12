<template>
   <div class="row">
    <div class="col-sm-12 col-xl-9">
      <header class="row sticky-top bg-white py-4 shadow">
        <div class="col-3 col-md-1">
          <Navbar />
        </div>
        <div class="col-9 col-md-7 justify-content-between">
          <h1 class="text-center font-weight-bold">WARUNG POJOK</h1>
          <h1></h1>
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-end">
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
            <img src="../assets/searc.png" alt="" />
          </button>
          <button class="btn" @click="filterOn()">
            <img src="../assets/icon/filter1.png" alt="" />
          </button>
        </div>
        <div v-if="filter" class="col-12 text-center border-top">
          <div class="row">
            <div class="col-6 col-md-4 d-flex justify-content-center mt-3">
              <h5>Sort</h5>
              <select class="form-select ml-2" aria-label="Default select example" v-model="sorted.name" @click="sortedProduct()">
                <option selected></option>
                <option value="ASC">1 - 1.000.000</option>
                <option value="DESC">1.000.000 - 1</option>
              </select>
            </div>  
    
            <div class="col-6 col-md-4 d-flex justify-content-center mt-3">
              <h5>OrderBy</h5>
              <select class="form-select ml-2" aria-label="Default select example" v-model="sorted.price" @click="sortedProduct()">
                <option selected></option>
                <option value="price">harga</option>
              </select>
            </div>
            <!-- <div class="col-6 col-md-4 d-flex justify-content-center mt-3">
              <h5>Category</h5>
              <select class="form-select ml-3" aria-label="Default select example" v-model="sorted.category" @click="sortedProduct()">
                <option selected></option>
                <option value="ASC">Drinks</option>
                <option value="DESC">Foods</option>
              </select>
            </div> -->
            <!-- <div class="col-6 col-md-3 d-flex justify-content-center  mt-3">
              <h5>Products</h5>
              <select class="form-select ml-3" aria-label="Default select example" v-model="sorted.id" @click="sortedProduct()">
                <option selected></option>
                <option value="DESC">New</option>
                <option value="ASC">Old</option>
              </select>
            </div> -->
          </div>
        </div>
      </header>
      <main class="row pt-4 bg-light">
        <article
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="items in datas"
          :key="items.id"
          @click="addChart(items)"
        >
          <Card :images="items.image" :name="items.name" :price="items.price" @prods="addChart" />
        </article>
      </main>
    </div>
    <aside class="col-xl-3 bg-white border-left">
      <div
        class="row sticky-top bg-white py-4 d-flex justify-content-center border-bottom"
      >
        <h2 class="text-center font-weight-bold">
          Cart
          <span class="p-cart-0 bg-warning text-white rounded-circle">
            {{ chart.length }}
          </span>
        </h2>
      </div>
      <div class="row pt-2" v-if="chart.length > 0">
        <div
          v-for="item of addItem"
          :key="item.id"
          class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-12"
        >
          <Cart :image="item.image" :name="item.name" :price="item.price" />
        </div>

        <div class="col-12 pt-4">
          <div class="d-flex justify-content-between">
            <h3>Total:</h3>
            <h3>Rp.{{ calculate }}</h3>
          </div>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="col btn btn-primary"
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
                <div class="modal-header">
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
                <div class="modal-body">
                  <div
                    class="d-flex justify-content-between"
                    v-for="item of addItem"
                    :key="item.id"
                  >
                    <p class="font-weight-bold">{{ item.name }}</p>
                    <p class="font-weight-bold">Rp.{{ item.price }}</p>
                  </div>
                  <p class="font-weight-bold text-right">
                    Total : Rp.{{ calculate }}
                  </p>
                  <p class="font-weight-bold text-left">
                    Cashier : {{ cashier }}
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="col btn btn-secondary" data-dismiss="modal" @click="addCheckout(addItem, calculate, cashier)">
                    Print
                  </button>
                  <button type="button" class="col btn btn-primary" data-dismiss="modal" @click="addCheckout(addItem, calculate, cashier)">
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="col btn btn-danger mt-2"
            @click="cencel()"
          >
            Cancel
          </button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col container text-center">
          <img src="../assets/icon/food-and-restaurant.png" alt="" />
          <h3>Your cart is empty</h3>
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
        name:null,
        cashier:null,
        total:null,
      },
      cashier: "Dzul",
      sorted:{
        name:'',
        price:'',
        names:'',
      },
      srcName:{
        name:'',
      },
      filter: false,
      cacheKey: 'token',
      userKey: 'name',
      username: '',
    };
  },
  methods: {
    loadProducts(){
      axios.get(process.env.VUE_APP_PRODUCT, {
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
      .get(process.env.VUE_APP_SORT+ `?orderBy=${this.sorted.price}&sort=${this.sorted.name}`,{
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
      .get(process.env.VUE_APP_PRODUCT+ `/search?search=${this.srcName.name}`, {
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
    addCheckout(valueNama, valueTotal, valueOrder){
      for(let i = 0; i < valueNama.length; i++) {
        if(valueNama.length == 1){
          this.checkout.name += `${valueNama[i].name}`
        }else{
          if(i == 0){
            this.checkout.name += `${valueNama[i].name}`
          }else{
            this.checkout.name += `,${valueNama[i].name}`
          }
        }
      }
      this.checkout.amount = valueTotal;
      this.checkout.orders = valueOrder;
      console.log(this.checkout)
      
      axios.post(process.env.VUE_APP_HISTORY, this.checkout, {
        headers: {
          authtoken: localStorage.getItem(this.cacheKey)
        }
      })
      .then(() => {
        this.chart = [];
        alert('Success Checkout!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Add Product!')
      });
    },
    addChart(items) {
      if (this.chart.length == 0) {
        this.chart.push(items);
      } else {
        if (this.chart.includes(items)) {
          //   this.chart.pop();
        } else {
          this.chart.push(items);
        }
      }
    },
    cencel() {
      this.chart = [];
    },
    filterOn() {
      this.filter = !this.filter;
      this.sorted.name = '';
      this.sorted.price = '';
      this.sortedProduct();
    },
  },
  computed: {
    addItem() {
      let item = this.chart;
      return item;
    },
    calculate() {
      let price = 0;
      for (const data of this.chart) {
        price = Number(data.price) + price;
      }
      return price.toFixed(2);
    },
  },
  mounted() {
    this.loadProducts()
    this.sortedProduct()
    this.searchName()
    this.username = localStorage.getItem(this.userKey)
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