<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="button-container">
      <a href="/settings">Settings</a>
      <br />
    </div>
    <el-button type="primary" @click="onSubmit">Logout</el-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  methods: {
    onSubmit() {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }
});
</script>
