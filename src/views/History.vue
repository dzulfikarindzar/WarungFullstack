<template>
  <div class="history">
    <side-nav :modalAdd="false"/>

    <section class="main-section">
      <header-item :text="'HISTORY'" :search-img="false" />
      <main class="container">
      </main>
    </section>
  </div>
</template>

<script>
import HeaderItem from "../components/HeaderTittle.vue";
import SideNav from "../components/Navbar";
export default {
  name: "History",
  components: {
    HeaderItem,
    SideNav,
  },
}
</script>

<style scoped>
.history {
  margin: 0;
  padding: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: 80px auto;
}
</style>