<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: "Airbnb Cereal App";
  src: url("/asset/font/AirbnbCerealMedium.ttf") format("truetype");
}
#app,
#app::before,
#appafter {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Airbnb Cereal App";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h4 {
  font-size: 1.3rem;
}
p {
  font-size: 1rem;
}
</style>
