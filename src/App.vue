<template>
  <div id="app">
    <transition name="el-fade-in" mode="out-in">
      <el-container v-if="this.$store.getters.isProfileLoaded">
        <header>
          <div class="flex-wrap">
            <div class="title">
              <h1 class="title" v-if="this.$store.getters.isDetailsFull">
                Hi, {{ user.profile.name }}
              </h1>
              <h1 class="title" v-else-if="this.$store.getters.isProfileLoaded">
                Hi, {{ user.profile.username }}
              </h1>
              <p v-if="this.$route.path !== '/home'">Home / {{ this.$route.name }}</p>
              <p v-else>here what can you do</p>
            </div>
            <div class="actions">
              <el-button v-if="this.$route.path !== '/home'" @click="back" icon="el-icon-back">
                Home
              </el-button>
              <el-button type="primary" @click="logout" icon="el-icon-switch-button">
                Logout
              </el-button>
            </div>
          </div>
        </header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>
          <p>Made by RecoFach. 2020-21.</p>
        </el-footer>
      </el-container>
      <router-view v-else />
    </transition>
  </div>
</template>

<script>
import { USER_REQUEST } from '@/store/actions/user';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import { mapState } from 'vuex';

export default {
  name: 'app',
  computed: mapState(['user']),
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
    },
    back() {
      this.$router.back();
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
  color: #2c3e50;
}
</style>
