<template>
  <el-form label-position="top" :model="form" ref="form">
    <el-form-item
      prop="username"
      label="Username"
      :autocomplete="autoComplete"
      :rules="form.rules.username"
      class="is-no-asterisk"
    >
      <el-input v-model="form.username" type="text" ref="username"></el-input>
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
        ref="password"
      ></el-input>
    </el-form-item>
    <el-button type="primary" :loading="loading" @click="onSubmit">Login</el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';

import { AUTH_REQUEST } from '@/store/actions/auth';

export default Vue.extend({
  name: 'LoginCF',
  data() {
    return {
      loading: false,
      showPassword: true,
      autoComplete: 'true',
      form: {
        username: '',
        password: '',
        rules: {
          username: { required: true, message: 'Please input username', trigger: 'blur' },
          password: { required: true, message: 'Please input your password', trigger: 'blur' }
        }
      }
    };
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elform: any = this.$refs.form;
      elform.validate((valid: boolean) => {
        if (valid) {
          console.log('Submiting valid form..');
          this.sendForm();
        } else {
          console.log('Form is not valid');
        }
      });
    },

    sendForm() {
      this.$data.loading = true;
      const { username, password } = this.$data.form;
      this.$store
        .dispatch(AUTH_REQUEST, { username, password })
        .then(() => this.$router.push('/home'))
        .catch(() => {
          this.$message.error({
            message: `Username or password is incorrect.`,
            duration: 5000,
            showClose: true
          });
        })
        .finally(() => {
          this.$data.loading = false;
        });
    }
  }
});
</script>
