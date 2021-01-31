<template>
  <div class="recommendations">
    <h2>Recommendations</h2>
    <p>Here you can select your <b>favorite topics</b> to study</p>
    <el-row :gutter="20" type="flex">
      <RecommendedSubject
        v-for="(subject, index) in subjects"
        :index="index"
        :key="subject.name"
        :subjectName="subject.name"
        :url="subject.url"
        :sws="subject.sws"
        :subjectType="subject.type"
        :tags="subject.tags"
      />
    </el-row>
  </div>
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
      subjects: [
        {
          name: 'Komplexpraktikum Computer- und robotergestÔøΩtzte Chirurgie',
          url: 'http://google.com/',
          sws: 2,
          type: 'sem',
          tags: ['AI', 'low']
        },
        { name: 'Test 1', url: 'http://google.com/', sws: 3, type: 'lec', tags: ['swt', 'cyber'] },
        { name: 'Test 2', url: 'http://google.com/', sws: 3, type: 'lec', tags: ['swt', 'cyber'] },
        { name: 'Test 3', url: 'http://google.com/', sws: 3, type: 'lec', tags: ['swt', 'cyber'] }
      ]
    };
  },
  mounted() {
    // const listOfRecommendations = Array;
    // axios.get(`${RECOMMENDATION}`);
  }
};
</script>

<style lang="scss">
.recommendations {
  .actions {
    text-align: center;
  }

  & > h2 {
    font-size: 50px;
    margin-bottom: 0;
  }

  & > p {
    margin-bottom: 40px;
  }

  .el-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
