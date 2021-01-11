<template>
  <div class="card mb-1">
    <div class="row">
      <div class="col-4">
        <img :src="image" class="card-img py-4 ml-3" :alt="name" />
      </div>
      <div class="col-8">
        <div class="">
          <p class="card-text pt-2">{{ name }}</p>
          <div class="btn border" @click="less()">-</div>
          <div class="btn border">{{ jumlah }}</div>
          <div class="btn border" @click="plus()">+</div>
          <h5 class="card-title pt-3">Rp.{{ price * jumlah }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  props: {
    image: {
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
  },
  data() {
    return {
      jumlah: 1,
    };
  },
  methods: {
    plus() {
      if (this.jumlah >= 1) {
        this.jumlah += 1;
      }
    },
    less() {
      if (this.jumlah == 1) {
        // this.jumlah -= 1;
      } else {
        this.jumlah -= 1;
      }
    },
  },
};
</script>
