<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="user.profile">
      <h1 v-if="user.profile">Hi, {{ user.profile.username }}</h1>
      <p>
        Your id is <br />
        <code>{{ user.id }}</code>
      </p>
    </div>
    <h1 v-else>Hi, ...!</h1>
    <div class="button-container">
      <a href="/settings">Settings</a>
      <br />
    </div>
    <el-button type="primary" @click="logout">Logout</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { AUTH_LOGOUT } from '@/store/actions/auth';

export default Vue.extend({
  name: 'Home',
  computed: mapState(['user']),
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
    }
  }
});
</script>
