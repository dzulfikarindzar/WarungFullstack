<template>
  <div class="item text-left">
    <div class="image shadow-sm">
      <img :src="image" :alt="name" />
    </div>
    <p class="title">{{ name }}</p>
    <p class="value">Rp. {{ price }}</p>
  </div>
</template>

<script>
export default {
  name: "card-product",
  data() {
    return {
      datas: {},
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.item img {
  max-width: 100%;
  max-height: 100%;
}
.item .title {
  font-size: 1rem;
  margin: 0;
}

.item .value {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}
.image {
  width: 200px;
}
img {
  border-radius: 10px 10px 0px 0px;
  -moz-border-radius: 10px 10px 0px 0px;
  -webkit-border-radius: 10px 10px 0px 0px;
  border: 0px solid #000000;
}
.item {
  margin: 10px;
}
</style>