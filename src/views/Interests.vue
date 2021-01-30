<template>
  <div class="Interests">
    <h1>Users interests</h1>
    <div style="margin-top: 20px">
      <div class="Interest_checkbox" style="margin-top: 20px">
        <el-checkbox v-model="softwareEngineering" label="softwareEngineering" border size="medium"
          >Software Engineering</el-checkbox
        >
        <el-checkbox v-model="aI" label="aI" border size="medium">AI</el-checkbox>
        <el-checkbox v-model="lowLevel" label="lowLevel" border size="medium"
          >Low level</el-checkbox
        >
        <el-checkbox v-model="security" label="security" border size="medium">Security</el-checkbox>
        <el-checkbox v-model="web" label="web" border size="medium">Web</el-checkbox>
        <el-checkbox v-model="theoretical" label="theoretical" border size="medium"
          >Theoretical computer sciecnce</el-checkbox
        >
      </div>
    </div>
    <div style="margin-top: 20px">
      <div class="Save_interests">
        <el-button type="primary" @click="saveInterests">Save</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { INTERESTS } from '@/store/routes';

export default {
  name: 'Interests',
  data() {
    return {
      softwareEngineering: false,
      aI: false,
      lowLevel: false,
      security: false,
      web: false,
      theoretical: false
    };
  },
  computed: mapState(['user']),
  methods: {
    saveInterests() {
      const interestsDict = {
        softwareEngineering: this.softwareEngineering,
        aI: this.aI,
        lowLevel: this.lowLevel,
        security: this.security,
        web: this.web,
        theoretical: this.theoretical
      };
      console.log(JSON.stringify(interestsDict));
      const interestsDictStr = JSON.stringify(interestsDict);
      // const {
      // //   form: { softwareEngineering, aI, lowLevel, security, web, theoretical }
      // // } = this.$data;
      // console.log(`saved interests ${this.softwareEngineering}`);
      // console.log(`saved interests ${this.aI}`);
      // console.log(`saved interests ${this.lowLevel}`);
      // console.log(`saved interests ${this.security}`);
      // console.log(`saved interests ${this.web}`);
      // console.log(`saved interests ${this.theoretical}`);
      axios
        .post(`${INTERESTS}`, { interestsDictStr })
        .then((response) => {
          console.log(response);
          this.$message.success({
            message: `Saved checkpoints for user!`,
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
          // this.$data.loading = false;
        });
    }
  }
};
</script>

<!--<style scoped>-->

<!--</style>-->
