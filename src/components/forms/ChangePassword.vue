<template>
  <el-form label-position="top" :model="form" ref="form">
    <el-form-item
      prop="password"
      label="Enter your new Password"
      :rules="form.rules.password"
      class="is-no-asterisk"
    >
      <el-input
        v-model="form.password"
        :showPassword="showPassword"
        placeholder="Some very secure password"
        type="password"
        ref="password"
      ></el-input>
    </el-form-item>

    <el-form-item
      prop="passwordConfirm"
      label="Confirm new password"
      auto-complete="off"
      :rules="form.rules.passwordConfirm"
      class="is-no-asterisk"
    >
      <el-input
        v-model="form.passwordConfirm"
        :showPassword="showPassword"
        placeholder="Confirmation of very secure password"
        auto-complete="off"
        type="password"
        ref="password"
      ></el-input>
    </el-form-item>
    <el-button type="primary" :loading="loading" @click="onSubmit('form')">
      Change my password
    </el-button>
  </el-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { USER_UPDATE_PASSWORD } from '@/store/actions/user';

export default Vue.extend({
  name: 'ChangePasswordCF',
  computed: mapState(['user']),
  created() {
    this.$data.currentUsername = this.user.profile.username;
  },
  data() {
    const validatePass = (rule: Record<string, unknown>, value: string, callback: Function) => {
      if (value === '') {
        callback(new Error('Please input your password again'));
      } else if (value === this.$data.currentUsername) {
        callback(new Error('Password cannot be your username.'));
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
      currentUsername: '',
      form: {
        password: '',
        passwordConfirm: '',
        rules: {
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
      const { form }: any = this.$refs;
      form.validate((valid: boolean) => {
        if (valid) {
          console.log('Submitting password form..');
          this.sendForm();
        } else {
          console.log('Form is not valid');
        }
      });
    },

    sendForm() {
      const {
        form: { password },
        currentUsername
      } = this.$data;

      this.$data.loading = true;
      this.$store
        .dispatch(USER_UPDATE_PASSWORD, { username: currentUsername, password })
        .then((response) => {
          console.log(response);
          this.$message.success({
            message: `Hey, ${response.data.username}, your is password updated`,
            duration: 5000,
            showClose: true
          });
        })
        .catch((e) => {
          this.$message.error({
            message: 'Sorry, something went wrong :(',
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
