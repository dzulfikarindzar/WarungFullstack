<template>
  <div class="items row">
    <div class="image">
      <img :src="data.image" :alt="data.name" />
    </div>
    <div class="content text-left">
      <h5>{{ data.name }}</h5>
      <div class="prices">
        <div class="plusminus form-group row">
          <button class="btn btn-danger btn-sm mr-1" @click="minus()">-</button>
          <input
            type="number"
            class="input-pm bg-light form-control p-0 text-center"
            :value="data.count"
          />
          <button class="btn btn-success btn-sm ml-1" @click="plus()">+</button>
        </div>
        <h5>{{ data.price }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart-item",
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.item,
.row {
  margin: 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.image {
  width: 6em;
  margin: 10px;
  padding: 0;
}
img {
  max-width: 100%;
  max-height: 100%;
}

.content {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.prices {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.plusminus {
  /* display: inline-block; */
  margin-right: 20px;
  width: 100px;
}
.input-pm {
  width: 40px;
  /* border-color: greenyellow; */
}

</style>