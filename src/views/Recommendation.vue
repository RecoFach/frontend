<template>
  <el-row justify="space-between" :gutter="20" type="flex" class="activities">
    <RecommendedSubject
      v-for="item in items :key='item.subjectName'"
      :subjectName="item.subjectName"
      :url="item.url"
      :sws="item.sws"
      :subjectType="item.subjectType"
      :area="item.area"
    />
    <!--    <RecommendedSubject-->
    <!--      subjectName="Subject2 "-->
    <!--      url="http://2323.com"-->
    <!--      :sws="this.sws"-->
    <!--      subjectType="2"-->
    <!--      area="Array"-->
    <!--    />-->
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
    // items:[
    //   { subjectName: '' },
    //   { url: '' },
    //   { sws: '' },
    //   { subjectType: '' },
    //   { area: '' }
    // ]
    return {
      items: [{ subjectName: '' }, { url: '' }, { sws: '' }, { subjectType: '' }, { area: '' }]
      // subjectName: '',
      // url: '',
      // sws: '',
      // subjectType: '',
      // area: ''
    };
  },
  mounted() {
    // const listOfRecommendations = Array;
    axios
      .get(`${RECOMMENDATION}`)
      .then((response) => {
        console.log(response);
        this.items = response.data;
      })
      .catch((e) => {
        //   this.$message.error({
        //     message: 'No fields of interest were specified, please provide some',
        //     duration: 10000,
        //     showClose: true
        //   });
        console.log(e.message);
      })
      .finally(() => {
        // this.$data.loading = false;
      });
  }
};
</script>

<!--<style scoped>-->

<!--</style>-->
