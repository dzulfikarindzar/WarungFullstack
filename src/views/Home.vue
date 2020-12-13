<template>
  <div class="home">
    <side-nav :modalAdd="true" />
    <section class="main-section">
      <header-item :text="'COFEE SHOP'" :searchicon="true" />
      <main class="container">
        <div class="modalShow">
          <b-modal id="modal-add" hide-footer>
            <template #modal-title> Add Item </template>
            <b-form class="m-3">
              <b-row>
                <b-col sm="3">
                  <label for="input-name">Name :</label>
                </b-col>
                <b-col sm="9">
                  <b-form-input id="input-name" v-model="form.name">
                  </b-form-input>
                </b-col> </b-row
              ><br />
              <b-row>
                <b-col sm="3">
                  <label class="mr-sm-4" for="input-image">Image : </label>
                </b-col>
                <b-col sm="9">
                  <b-form-input id="input-image" v-model="form.image">
                  </b-form-input>
                </b-col> </b-row
              ><br />
              <b-row>
                <b-col sm="3">
                  <label class="mr-sm-4" for="input-price">Prices : </label>
                </b-col>
                <b-col sm="9">
                  <b-form-input id="input-price" v-model="form.price">
                  </b-form-input>
                </b-col> </b-row
              ><br />
              <b-row>
                <b-col sm="3">
                  <label class="mr-sm-4" for="input-category">category</label>
                </b-col>
                <b-col sm="9">
                  <b-form-select
                    id="input-name"
                    v-model="form.id_category"
                    :options="options"
                  >
                  </b-form-select> </b-col></b-row
              ><br />
              <b-button
                type="submit"
                class="btn-block"
                variant="danger"
                @click="addData()"
                >Print</b-button
              >
              <p class="text-center m-0"><b>OR</b></p>
              <b-button
                type="reset"
                class="btn-block"
                variant="info"
                @click="resetData()"
                >Reset</b-button
              >
            </b-form>
          </b-modal>
        </div>

        <div
          class="button-item"
          @click="addCart(item)"
          v-for="item in dataproduct"
          :key="item.id"
        >
          <card-product
            :name="item.name"
            :price="Number(item.price)"
            :image="item.image"
          />
        </div>
      </main>
    </section>
    <aside class="shadow-sm">
      <div class="shadow-sm header-cart">
        <h2>
          Cart <span class="span-cart">{{ dataCart.length }}</span>
        </h2>
      </div>
      <article v-if="dataCart && dataCart.length > 0">
        <div class="cart-wrap">
          <cart-item v-for="item in dataCart" :key="item.id" :data="item" />
        </div>
        <article class="cart-order">
          <div class="order-total">
            <h4>Total</h4>
            <h4>Rp. 150.000</h4>
          </div>
          <p class="text-left">*Belum termasuk ppn</p>
          <b-button class="mt-3" variant="info" block>Checkout</b-button>
           <b-button class="mt-2" variant="danger" @click="cancelCart()" block>
            Cancel </b-button
          ><br /><br />
        </article>
      </article>
      <article v-else class="cart-empty">
        <img
          src="../assets/icon/food-and-restaurant.png"
          class="icon-cartempty"
          alt=""
        />
        <h4>Your cart is empty</h4>
        <p class="empty-desc">Please add some items from the menu</p>
      </article>
    </aside>
  </div>
</template>

<script>
import CardProduct from "../components/Card.vue";
import HeaderItem from '../components/HeaderTittle.vue'
import SideNav from "../components/Navbar";
import axios from "axios";
import CartItem from "../components/AddCart.vue";

export default {
  name: "Home",
  data() {
    return {
      dataproduct: [],
      dataCart: [],
      form: {
        image: "",
        name: "",
        price: null,
        id_category: "",
      },
      options: [],
    };
  },
  components: {
    HeaderItem, 
    SideNav,
    CardProduct,
    CartItem,
  },
  methods: {
    addCart(data) {
      let hasil = this.dataCart.find((res) => {
        if (res.name == data.name) {
          return res.name;
        }
      });
      if (hasil) {
        for (let i = 0; i < this.dataCart.length; i++) {
          if (this.dataCart[i].name == data.name) {
            this.dataCart[i].count++;
          }
        }
      } else {
        data.count = 1;
        this.dataCart.push(data);
      }
    },
    cancelCart() {
      this.dataCart = [];
    },
    addData() {
      if (
        this.form.name &&
        this.form.price &&
        this.form.id_category &&
        this.form.image
      ) {
        axios({
          method: "post",
          url: 'http://localhost:9100/product',
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.parse(JSON.stringify(this.form)),
        })
          .then((res) => {
            alert(res.data.description);
            location.reload();
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        alert("Masukkan data item dengan lengkap !");
      }
    },
  },
  mounted() {
    axios
      .get('http://localhost:9100/product')
      .then((res) => {
        this.dataproduct = res.data.result;
      })
      .catch((err) => {
        alert(err);
      });
    axios
      .get('http://localhost:9100/category')
      .then((res) => {
        this.options = [];
        res.data.result.forEach((item) => {
          this.options.push({
            value: item.id,
            text: item.name,
          });
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  },
};
</script>

<style scoped>
.main-section {
  background: rgba(190, 195, 202, 0.3);
  box-sizing: border-box;
  height: 100vh;
  overflow: auto;
}
.home {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 80px auto 400px;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.button-item {
  cursor: pointer;
}
aside {
  position: relative;
}
article {
  padding: 10px;
}
.header-cart {
  display: flex;
  position: sticky;
  top: 0;
  padding: 7px;
  background: white;
  height: 80px;
}
.cart-empty {
  position: sticky;
  top: 60px;
}
h2 {
  margin: auto;
}

.cart-order {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.order-total {
  display: flex;
  justify-content: space-between;
}
h4 {
  font-size: 1.3rem;
}
p {
  font-size: 1rem;
}
.span-cart {
  background-color: rgb(45, 243, 6);
  border-radius: 100%;
  padding: 3px 13px;
  color: rgb(248, 244, 244);
  font-size: 1.5rem;
}
.cart-wrap {
  height: 60vh;
}


</style>
