<template>
  <nav class="dropdown">
    <button
      class="btn"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
    >
      <img src="../assets/icon/menu.png" alt="" />
    </button>
    <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
      <router-link to="/home" class="dropdown-item my-4">
        <img src="../assets/icon/fork.png" alt="" />
      </router-link>
      <router-link to="/history" class="dropdown-item my-4">
        <img src="../assets/icon/clip.png" alt="" />
      </router-link>
      <div 
    v-if="role == 'developer'"
      class="v dropdown-item my-4">
        <router-link to="/products">
          <img src="../assets/icon/tulis.png" alt="" />
        </router-link>
      </div>
      <!-- <router-link to="/products" class="dropdown-item my-4">
        <img src="../assets/profil.png" alt="" />
      </router-link> -->
      <router-link to="/" class="dropdown-item my-4">
        <img src="../assets/metu.png" alt="" @click="exit()" />
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data(){
    return{
      cacheKey: 'token',
      roleKey: 'role',
      userKey: 'email',
      role: '',
    }
  },
  methods:{
    exit(){
      localStorage.setItem(this.cacheKey, '');
      localStorage.setItem(this.roleKey, '');
      localStorage.setItem(this.userKey, '');
    },
  },
  mounted(){
    this.role = localStorage.getItem(this.roleKey)
  }
};
</script>

<style scoped>
.dropdown-menu {
  min-width: 4rem;
  margin: 1.5rem 0 0;
}

.dropdown-item {
  padding: 0;
}
</style>
