<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="vertical"
      @select="handleSelect"
    >
      <el-menu-item index="0"></el-menu-item>
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-location"></i>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
    </el-menu>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

import { SIGNUP } from '@/store/routes';

export default Vue.extend({
  name: 'HeaderC',
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

      this.$data.loading = true;
      axios
        .put(`${SIGNUP}`, { username, password })
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
