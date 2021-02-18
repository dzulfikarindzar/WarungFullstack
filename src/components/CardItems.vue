<template>
  <div class="card-main d-flex justify-content-center pb-5">
    <div class="card-hover" style="width: 19rem;">
      <img :src="images" :alt="name" class="card-img-top"/>
      <div class="card-body">
        <div class="text-right">
        <h5 style="font-family: sans-serif; font-size: 1rem;">{{ name }}</h5>
        <h3 style="font-family: sans-serif; font-size: 0.9rem;" class="font-weight-bold">{{toRupiah (price) }}</h3>
        <b-button style="font-family: sans-serif;" @click="addCart(product)" class="m-2" variant="outline-success"
        >Add</b-button>
      </div> 
    </div>
   </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Card",
  props: {
    images: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type:Number,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
    data() {
        return {
            show : false
        }
    }
  },
  methods: {
    ...mapActions(['addCart', 'delCart']),
  toRupiah(value) {
      return (
        "Rp. " +
        Math.round(value)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.")
      );
    },
  }
}
</script>

<style scoped>
.card-hover:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  transition: all 0.3s ease;
  background-color: #2a6496;
  color: white;
  transform: scale(1.05)
  
}
</style>