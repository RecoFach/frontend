<template>
  <el-form label-position="top" :model="form" ref="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item
          prop="name"
          label="Name"
          auto-complete="off"
          :rules="form.rules.name"
          class="is-no-asterisk"
        >
          <el-input v-model="form.name" type="text" ref="text" placeholder="Your name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          prop="surname"
          label="Surname"
          auto-complete="off"
          :rules="form.rules.surname"
          class="is-no-asterisk"
        >
          <el-input
            v-model="form.surname"
            type="text"
            ref="text"
            placeholder="Your surname"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item prop="uuid" label="UUID" class="is-no-asterisk">
          <el-input
            readonly
            disabled
            v-model="form.uuid"
            :value="user.profile.id"
            :placeholder="user.profile.id.toUpperCase()"
            type="text"
            ref="text"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="username" label="Username" class="is-no-asterisk">
          <el-input
            readonly
            disabled
            v-model="form.username"
            :value="user.profile.username"
            :placeholder="user.profile.username"
            type="text"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      prop="email"
      label="E-Mail"
      auto-complete="off"
      :rules="form.rules.email"
      class="is-no-asterisk"
    >
      <el-input
        v-model="form.email"
        auto-complete="off"
        type="email"
        ref="email"
        placeholder="Your E-Mail address here"
      ></el-input>
    </el-form-item>
    <el-button type="primary" :loading="loading" @click="onSubmit('form')">
      Update profile details
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
    const validateName = (rule: Record<string, unknown>, value: string, callback: Function) => {
      const format = /^[a-zA-Z]+$/;

      if (value.length > 0 && !format.test(value)) {
        callback(new Error('Contains special characters.'));
      } else {
        callback();
      }
    };

    const validateEmail = (rule: Record<string, unknown>, value: string, callback: Function) => {
      const format = /\S+@\S+\.\S+/;

      if (value.length > 0 && !format.test(value)) {
        callback(new Error('Invalid E-Mail address.'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      showPassword: true,
      autoComplete: 'true',
      form: {
        name: '',
        surname: '',
        username: '',
        uuid: '',
        email: '',
        rules: {
          name: { required: false, validator: validateName, trigger: 'blur' },
          surname: { required: false, validator: validateName, trigger: 'blur' },
          username: { required: true, message: 'Please input a username', trigger: 'blur' },
          email: {
            required: false,
            validator: validateEmail,
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
