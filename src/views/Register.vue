<template>
  <el-main class="login">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-card shadow="always" align="left">
        <img src="@/assets/logo.png" width="100" align="center" />
        <h1>Welcome to RecoFach!</h1>
        <p>
          Already have an account?
          <el-link href="/login" type="primary" target="_self"> Login here! </el-link>
        </p>
        <register-form />
      </el-card>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import Vue from 'vue';
import RegisterForm from '@/components/forms/Register.vue';

export default Vue.extend({
  name: 'Register',
  components: {
    RegisterForm,
  },
});
</script>

<style lang="scss" scoped>
.login {
  background: url(https://source.unsplash.com/random?study);
  background-position: center;
  background-size: cover;
  padding: 0;

  h1 {
    margin: 0;
  }

  & > .el-row {
    height: 100vh;

    .el-card {
      padding: 10px 20px;
      .el-link,
      p {
        font-size: 14px;
      }
    }
  }
}
</style>
