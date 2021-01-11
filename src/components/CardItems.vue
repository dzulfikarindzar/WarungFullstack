<template>
  <div class="d-flex justify-content-center pb-3">
    <div class="shadow" style="width: 18rem;" @click="addProduct(items)">
      <img :src="images" :alt="name" class="card-img-top" />
      <div class="card-body border-top">
        <h5>{{ name }}</h5>
        <h3 class="font-weight-bold">Rp.{{ price }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
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
    items:{
      type: Object,
      required: true,
    },
    methods: {
      addProduct(value) {
        this.$emit ("prods", value)
      }
    },
  },
};
</script>
