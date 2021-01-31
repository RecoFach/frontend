<template>
  <el-row justify="space-between" :gutter="20" type="flex" class="activities">
    <RecommendedSubject
      :subjectName="this.subjectName"
      :url="this.url"
      :sws="this.sws"
      :subjectType="this.subjectType"
      :area="this.area"
    />
    <RecommendedSubject
      subjectName="Subject2 "
      url="http://2323.com"
      :sws="this.sws"
      subjectType="2"
      area="Array"
    />
  </el-row>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import RecommendedSubject from '@/components/ui/RecommendedSubject.vue';
import axios from 'axios';
import { RECOMMENDATION } from '@/store/routes';

export default {
  name: 'Recommendation',
  computed: mapState(['user']),
  components: {
    RecommendedSubject
  },
  data() {
    return {
      subjectName: '',
      url: '',
      sws: '',
      subjectType: '',
      area: ''
    };
  },
  mounted() {
    const listOfRecommendations = Array;
    axios.get(`${RECOMMENDATION}`);
  }
};
</script>

<!--<style scoped>-->

<!--</style>-->
