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
      prop="firstname"
      label="First Name"
      :autocomplete="autoComplete"
      :rules="form.rules.firstname"
      class="is-no-asterisk"
    >
      <el-input v-model="form.firstname" type="string" ref="firstname"></el-input>
    </el-form-item>
    <el-form-item
      prop="lastname"
      label="Last Name"
      :autocomplete="autoComplete"
      :rules="form.rules.lastname"
      class="is-no-asterisk"
    >
      <el-input v-model="form.lastname" type="string" ref="lastname"></el-input>
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
    <el-button type="primary" @click="onSubmit">Register</el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'RegisterCF',
  data() {
    return {
      showPassword: true,
      autoComplete: 'true',
      form: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        rules: {
          email: [
            { required: true, message: 'Please input email address', trigger: 'blur' },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ],
          password: { required: true, message: 'Please input your password', trigger: 'blur' },
          firstname: { required: true, message: 'Please input your first name', trigger: 'blur' },
          lastname: { required: true, message: 'Please input your last name', trigger: 'blur' },
        },
      },
    };
  },
  methods: {
    onSubmit(submitEvent: any) {
      const {
        form: { email, password, firstname, lastname },
      } = this.$data;

      axios
        .put('http://localhost:8080/users', {
          email,
          password,
          firstname,
          lastname,
        })
        .then((response) => {
          window.location.href = '/login';
        })
        .catch((e) => {
          alert(e.message);
        });
    },
  },
});
</script>
