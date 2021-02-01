<template>
  <div class="settings" v-if="this.$store.getters.isProfileLoaded">
    <el-row :gutter="20" class="mb-60">
      <el-col :span="8" :xs="24">
        <img src="../assets/safe.jpg" width="200" alt="User Settings" />
      </el-col>
      <el-col :span="16" :xs="24">
        <h2>User Settings</h2>
        <SettingsForm />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mb-60">
      <el-col :span="8" :xs="24">
        <img src="../assets/key.jpg" width="200" alt="User Settings" />
      </el-col>
      <el-col :span="16" :xs="24">
        <h2>Change Password</h2>
        <ChangePasswordForm />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mb-60">
      <el-col :span="8" :xs="24">
        <img src="../assets/bomb.jpg" width="200" alt="User Settings" />
      </el-col>
      <el-col :span="16" :xs="24">
        <h2>Delete Account</h2>
        <DeleteAccountForm />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import SettingsForm from '@/components/forms/Settings.vue';
import ChangePasswordForm from '@/components/forms/ChangePassword.vue';
import DeleteAccountForm from '@/components/forms/DeleteAccount.vue';

export default Vue.extend({
  name: 'Settings',
  components: {
    SettingsForm,
    ChangePasswordForm,
    DeleteAccountForm
  }
});
</script>

<style scoped lang="scss">
.settings {
  h2 {
    font-size: 50px;
  }
}
</style>
