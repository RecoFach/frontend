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
        placeholder="Username goes here"
        type="text"
        ref="text"
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
  name: 'DeleteAccountCF',
  computed: mapState(['user']),
  created() {
    this.$data.currentUsername = this.user.profile.username;
  },
  data() {
    const validateUsername = (rule: Record<string, unknown>, value: string, callback: Function) => {
      if (value.length > 0 && value !== this.$data.currentUsername) {
        callback(new Error('Confirm delete request with your username.'));
      } else if (value.length === 0) {
        callback(new Error('Cannot be empty.'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      currentUsername: '',
      form: {
        username: '',
        rules: {
          username: {
            required: true,
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
