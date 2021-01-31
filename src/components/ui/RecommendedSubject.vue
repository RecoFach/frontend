<template>
  <el-card shadow="hover" class="activity plan">
    <h2>{{ subjectName }}</h2>
    <p>
      {{ sws }}
    </p>
    <p>
      {{ url }}
    </p>
    <p>
      {{ subjectType }}
    </p>
    <p>
      {{ area }}
    </p>
    <!--    <img :src="require('@/assets/' + image + '.jpg')" alt="image" />-->
    <!--    <el-button type="" @click="action" size="small">{{ buttonText }}</el-button>-->
  </el-card>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'RecommendedSubjectC',
  props: {
    // subjectName: String,
    // url: String,
    // // image: String,
    // buttonText: String,
    // action: Function
    subjectName: String,
    url: String,
    sws: String,
    subjectType: String,
    area: Array
  },
  data() {
    return {
      // subjectName: String,
      // url: String,
      // sws: String,
      // subjectType: String,
      // area: Array
    };
  }
  // methods() {
  //   onload() {
  //     this.$data.
  //   }
  // }
});
</script>

<!--<style scoped>-->

<!--</style>-->
