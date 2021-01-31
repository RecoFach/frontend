<template>
  <el-row justify="space-between" :gutter="20" type="flex" class="activities">
    <Activity
      title="Interests"
      image="box"
      text="select computer science fields you interested in"
      button-text="Select my interests"
      :action="interests"
    />
    <Activity
      title="Settings"
      image="safe"
      text="personalise and manage your account settings"
      button-text="Change my settings"
      :action="settings"
    />
    <Activity
      title="Choose"
      image="bulb"
      text="find out what courses you may like to study"
      button-text="Recommend a course"
      :action="recommendation"
    />
    <Activity
      title="Log out"
      image="button"
      text="good luck and enjoy your journey at TU"
      button-text="I will come later"
      :action="logout"
    />
  </el-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { AUTH_LOGOUT } from '@/store/actions/auth';
import Activity from '@/components/ui/Activity.vue';

export default Vue.extend({
  name: 'Home',
  computed: mapState(['user']),
  components: {
    Activity
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
    },
    settings() {
      this.$router.push('/settings');
    },
    interests() {
      this.$router.push('/interests');
    },
    recommendation() {
      this.$router.push('/recommendation');
    }
  }
});
</script>
