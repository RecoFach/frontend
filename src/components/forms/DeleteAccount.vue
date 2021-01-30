<template>
  <el-form label-position="top" :model="form" ref="form">
    <el-form-item
      prop="password"
      label="Enter your username to delete your Account"
      :rules="form.rules.username"
      class="is-no-asterisk"
    >
      <el-input
        v-model="form.password"
        :showPassword="showPassword"
        placeholder="Username goes here"
        type="password"
        ref="password"
      ></el-input>
    </el-form-item>
    <el-button type="danger" :loading="loading" @click="onSubmit('form')">
      Yes, delete my account completely
    </el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

import { SIGNUP } from '@/store/routes';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'SettingsCF',
  computed: mapState(['user']),
  data() {
    const validateUsername = (rule: Record<string, unknown>, value: string, callback: Function) => {
      if (value === '') {
        callback(new Error('Please input your username'));
      } else if (value !== this.user.profile.username) {
        callback(new Error('Password cannot be your username.'));
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
        rules: {
          username: {
            required: true,
            message: 'Please input a username',
            validator: validateUsername,
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

<style lang="scss">
.p-0 {
  padding: 0;
}
.el-input--suffix .el-input__inner {
  padding-right: 10px;
}
</style>
