<template>
  <header class="shadow-sm">
    <div class="title">
      <h2>{{ text }}</h2>
      <div class="search">
     <img src="../assets/search.png" alt="">
    </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "header-tittle",
  props: {
    searchicon: {
      type: Boolean,
      required: true,
    },
    text:{
      type: String,
      required: true,
    }
  },
};
</script>

<style scoped>
header {
  display: flex;
  position: sticky;
  background: white;
  top: 0;
  height: 80px;
}
h2 {
  margin: auto;
}

.icon {
  margin: 10px 20px;
}
.hide {
  display: none;
}
img{
  width: 40px;
  margin: 17px;
  padding: 0;
}
.title {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  font-size: 1rem;
}
</style>