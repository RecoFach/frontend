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

import { mapState } from 'vuex';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import { USER_DELETE } from '@/store/actions/user';

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
      const { form }: any = this.$refs;
      form.validate((valid: boolean) => {
        if (valid) {
          console.log('Submitting valid form..');
          this.sendForm();
        } else {
          console.log('Form is not valid');
        }
      });
    },

    sendForm() {
      this.$data.loading = true;
      this.$store
        .dispatch(USER_DELETE)
        .then(() => {
          this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
          this.$message.success({
            message: `Account of ${this.user.username} was successfully deleted`,
            duration: 7000,
            showClose: true
          });
        })
        .catch(() => {
          this.$message.error({
            message: `Something went wrong. Try again later.`,
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
