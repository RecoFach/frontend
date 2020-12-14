<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/Settings">Settings</router-link>
    </div> -->
    <transition name="next" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { USER_REQUEST } from '@/store/actions/user';

export default {
  name: 'app',
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  }
};
</script>

<style lang="scss">
#app,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}
</style>
