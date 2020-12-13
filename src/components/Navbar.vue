<template>
  <aside class="shadow-sm">
    <div class="header-nav">
      <img src="../assets/menu.png" alt="">
    </div>
    <nav>
      <router-link to="/" class="router button">
        <img src="../assets/fork.png" alt="">
      </router-link>

      <router-link to="/history" class="router button">
       <img src="../assets/clipboard.png" alt="">
      </router-link>
      <div v-b-modal="'modal-add'" class="button" v-if="modalAdd == true">
        <img src="../assets/add.png" alt="">
      </div>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "navbar",
  props: {
    modalAdd: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  height: auto;
  background: white;
  position: sticky;
  top: 100px;
}
.button {
  margin: 15px;
  cursor: pointer;
  outline: none;
}
.header-nav {
  margin: 10px 0;
  position: sticky;
  top: 18px;
}
.router {
  color: black;
}
</style>