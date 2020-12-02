<template>
  <el-main class="login">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-card shadow="always" align="left">
        <img src="@/assets/logo.png" width="100" align="center" />
        <h1>Welcome to RecoFach!</h1>
        <p>
          Don't have an account?
          <el-link href="/about" type="primary" target="_blank"> Create new one! </el-link>
        </p>
        <el-form label-position="top" :model="form">
          <el-form-item
            prop="email"
            label="E-Mail"
            :autocomplete="autoComplete"
            :rules="form.rules.email"
            class="is-no-asterisk"
          >
            <el-input v-model="form.email" type="email"></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="Password"
            :rules="form.rules.password"
            class="is-no-asterisk"
          >
            <el-input
              v-model="form.password"
              :autocomplete="autoComplete"
              :showPassword="showPassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">Login</el-button>
        </el-form>
      </el-card>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      showPassword: true,
      autoComplete: true,
      form: {
        email: '',
        password: '',
        rules: {
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change']
            }
          ],
          password: { required: true, message: 'Please input your password', trigger: 'blur' }
        }
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
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
