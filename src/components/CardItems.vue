<template>
  <div class="d-flex justify-content-center pb-5">
    <div class="p-0" style="width: 18rem; " @click="addCart(product)">
      <img :src="images" :alt="name" class="card-img-top border-0" />
      <div class="card-body">
        <h5>{{ name }}</h5>
        <h3 class="font-weight-bold">{{toRupiah (price) }}</h3>
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
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    }
  },
  methods: {
    ...mapActions(['addCart']),
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