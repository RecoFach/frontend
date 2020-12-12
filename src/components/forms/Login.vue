<template>
  <el-form label-position="top" :model="form">
    <el-form-item
      prop="email"
      label="E-Mail"
      :autocomplete="autoComplete"
      :rules="form.rules.email"
      class="is-no-asterisk"
    >
      <el-input v-model="form.email" type="email" ref="email"></el-input>
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
    <el-button type="primary" @click="onSubmit">Login</el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'LoginCF',
  data() {
    return {
      showPassword: true,
      autoComplete: 'true',
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
    onSubmit(submitEvent: any) {
      const {
        form: { email, password }
      } = this.$data;

      axios
        .post('http://localhost:8080/users', {
          email,
          password
        })
        .then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data));
          window.location.href = '/';
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
});
</script>
