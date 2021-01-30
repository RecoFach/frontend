<template>
  <el-container>
    <el-main>
      <div class="flex-wrap">
        <div class="title">
          <h1 class="title">Hi, {{ user.profile.username }}</h1>
          <p>here what can you do</p>
        </div>
        <div class="actions">
          <el-button type="primary" @click="logout">Logout</el-button>
        </div>
      </div>
      <el-row justify="space-between" gutter="20" type="flex" class="activities">
        <Activity
          title="Interests"
          image="box"
          text="select computer science fields you interested in"
          button-text="Select my interests"
        />
        <Activity
          title="Settings"
          image="safe"
          text="personalise and manage your account settings"
          button-text="Change my settings"
        />
        <Activity
          title="Choose"
          image="bulb"
          text="find out what courses you may like to study"
          button-text="Recommend a course"
        />
        <Activity
          title="Log out"
          image="button"
          text="good luck and enjoy your journey at TU"
          button-text="I will come later"
          :action="logout"
        />
      </el-row>
    </el-main>
    <el-footer>
      <p>Made by RecoFach. 2020-21.</p>
    </el-footer>
  </el-container>
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
  data() {
    return {
      activeIndex: 'home'
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'));
    }
  }
});
</script>

<style lang="scss">
.activities {
  flex-wrap: wrap;
}
</style>
