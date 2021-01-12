<template>
  <div class="container-fluid">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
    name: 'App',
}

</script>

<style>
#app,
#app::before,
#appafter {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  font-family: sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
