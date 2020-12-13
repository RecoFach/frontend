<template>
  <el-form label-position="top" :model="form" ref="form">
    <el-form-item
      prop="username"
      label="Username"
      auto-complete="off"
      :rules="form.rules.username"
      class="is-no-asterisk"
    >
      <el-input v-model="form.username" type="text" ref="text"></el-input>
    </el-form-item>
    <el-form-item
      prop="password"
      label="Password"
      :rules="form.rules.password"
      class="is-no-asterisk"
    >
      <el-input
        v-model="form.password"
        :showPassword="showPassword"
        type="password"
        ref="password"
      ></el-input>
    </el-form-item>
    <el-form-item
      prop="passwordConfirm"
      label="Confirm password"
      auto-complete="off"
      :rules="form.rules.passwordConfirm"
      class="is-no-asterisk"
    >
      <el-input
        v-model="form.passwordConfirm"
        :showPassword="showPassword"
        auto-complete="off"
        type="password"
        ref="password"
      ></el-input>
    </el-form-item>
    <el-button type="primary" :loading="loading" @click="onSubmit('form')">Sign Up</el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'RegisterCF',
  data() {
    const validatePass = (rule: Record<string, unknown>, value: string, callback: Function) => {
      if (value === '') {
        callback(new Error('Please input your password again'));
      } else if (value !== this.$data.form.password) {
        callback(new Error("Passwords doesn't match!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      showPassword: true,
      autoComplete: 'true',
      form: {
        username: '',
        password: '',
        passwordConfirm: '',
        rules: {
          username: { required: true, message: 'Please input a username', trigger: 'blur' },
          password: { required: true, message: 'Please input your password', trigger: 'blur' },
          passwordConfirm: {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          }
        }
      }
    };
  },
  methods: {
    onSubmit() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const elform: any = this.$refs.form;
      console.log(typeof elform);
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
      const {
        form: { username, password }
      } = this.$data;

      const BACKEND = `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`;
      this.$data.loading = true;
      axios
        .put(`${BACKEND}/users/signup`, { username, password })
        .then((response) => {
          console.log(response);
          this.$message.success({
            message: `Congrats, ${response.data.username}, your account was created!`,
            duration: 5000,
            showClose: true
          });
        })
        .catch((e) => {
          this.$message.error({
            message: 'Sorry, this username was already taken :(',
            duration: 5000,
            showClose: true
          });
          console.log(e.message);
        })
        .finally(() => {
          this.$data.loading = false;
        });
    }
  }
});
</script>
