<template>
  <div class="Interests">
    <h1>Users interests</h1>
    <div style="margin-top: 20px">
      <div class="Interest_checkbox" style="margin-top: 20px">
        <el-checkbox v-model="checked3" label="af" border size="medium">{{
          user.profile.username
        }}</el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Interests',
  computed: mapState(['user'])
};
</script>

<!--<style scoped>-->

<!--</style>-->
