<template>
  <div class="recommendations">
    <h2>Recommendations</h2>
    <p>Here you can select your <b>favorite topics</b> to study</p>
    <el-row :gutter="20" type="flex">
      <RecommendedSubject
        v-loading="loading"
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
import axios from 'axios';
import { mapState } from 'vuex';
import { RECOMMENDATION } from '@/store/routes';
import RecommendedSubject from '@/components/ui/RecommendedSubject.vue';

export default {
  name: 'Recommendation',
  computed: mapState(['user']),
  components: {
    RecommendedSubject
  },
  data() {
    return {
      loading: true,
      subjects: [
        {
          name: 'Some subject 1',
          url: 'http://google.com/',
          sws: 2,
          type: 'sem',
          tags: ['AI', 'low']
        },
        {
          name: 'Some subject 2',
          url: 'http://google.com/',
          sws: 3,
          type: 'lec',
          tags: ['swt', 'cyber']
        },
        {
          name: 'Some subject 3',
          url: 'http://google.com/',
          sws: 3,
          type: 'lec',
          tags: ['swt', 'cyber']
        },
        {
          name: 'Some subject 4',
          url: 'http://google.com/',
          sws: 3,
          type: 'lec',
          tags: ['swt', 'cyber']
        }
      ]
    };
  },
  mounted() {
    const listOfRecommendations = Array;
    axios.post(`${RECOMMENDATION}`, {
      params: {
        'Software engineering': this.user.profile.interests.includes('SOFTWARE') ? 1 : 0,
        AI: this.user.profile.interests.includes('AI') ? 1 : 0,
        'Low-level': this.user.profile.interests.includes('LOWLEVEL') ? 1 : 0,
        Security: this.user.profile.interests.includes('SECURITY') ? 1 : 0,
        Web: this.user.profile.interests.includes('WEB') ? 1 : 0,
        Theoretical: this.user.profile.interests.includes('THEORETICAL') ? 1 : 0
      }
    });
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
