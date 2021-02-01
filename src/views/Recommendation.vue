<template>
  <div class="recommendations">
    <h2>Recommendations</h2>
    <p>Here you can see some recommendations based on your <b>interests</b>.</p>
    <el-row :gutter="20" type="flex" v-if="this.$store.getters.isProfileLoaded">
      <RecommendedSubject
        v-loading="loading"
        v-for="(subject, index) in subjects"
        :index="index"
        :key="subject.name"
        :name="subject.name"
        :url="subject.url"
        :sws="subject.sws"
        :type="subject.type"
        :tags="subject.tags"
        :semester="subject.semester"
        :lang="subject.lang"
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
          type: 'Lecture',
          tags: ['ai', 'low'],
          lang: 'DE',
          semester: 'SS 21'
        },
        {
          name: 'Some subject 2',
          url: 'http://google.com/',
          sws: 3,
          type: 'Lecture',
          lang: 'EN',
          tags: ['swt', 'cyber'],
          semester: 'SS 21'
        },
        {
          name: 'Some subject 3',
          url: 'http://google.com/',
          sws: 3,
          type: 'Seminar',
          lang: 'DE',
          tags: ['swt', 'cyber'],
          semester: 'SS 21'
        },
        {
          name: 'Some subject 4',
          url: 'http://google.com/',
          sws: 3,
          type: 'Lecture',
          lang: 'DE',
          tags: ['swt', 'cyber'],
          semester: 'SS 21'
        }
      ]
    };
  },
  created() {
    axios
      .post(`${RECOMMENDATION}`, {
        SOFTWARE: this.user.profile.interests.includes('SOFTWARE') ? 1 : 0,
        AI: this.user.profile.interests.includes('AI') ? 1 : 0,
        LOWLEVEL: this.user.profile.interests.includes('LOWLEVEL') ? 1 : 0,
        SECURITY: this.user.profile.interests.includes('SECURITY') ? 1 : 0,
        WEB: this.user.profile.interests.includes('WEB') ? 1 : 0,
        THEORETICAL: this.user.profile.interests.includes('THEORETICAL') ? 1 : 0
      })
      .then((resp) => {
        console.log(resp);
        console.log(this.mapper(resp.data));
        this.$data.subjects = this.mapper(resp.data);
      })
      .finally(() => {
        this.$data.loading = false;
      });
  },
  methods: {
    mapper(d) {
      const data = [];
      Object.entries(d).forEach((c) => {
        const course = c[1];
        data.push({
          name: course['Course name'].normalize(),
          url: course.Link,
          sws: course.sws,
          type: this.detectType(course),
          tags: this.detectTags(course),
          semester: this.detectSemester(course),
          lang: this.detectLang(course)
        });
      });
      return data;
    },
    detectType(course) {
      if (course.Vorlesung === 1) return 'Lecture';
      if (course.Seminar === 1) return 'Seminar';
      return 'Praxis';
    },
    detectTags(course) {
      const tags = [];
      if (course.AI === 1) tags.push('Artificial Intelligence');
      if (course['Low-level'] === 1) tags.push('Assembler Level');
      if (course['Software engineering'] === 1) tags.push('Software');
      if (course.Security === 1) tags.push('Cyber Security');
      if (course.Web === 1) tags.push('Web Dev');
      if (course.Theoretical === 1) tags.push('Web Dev');
      return tags;
    },
    detectSemester(course) {
      return course.Sommersemester === 1 ? 'SoSe' : 'WiSe';
    },
    detectLang(course) {
      return course.english === 1 ? 'EN' : 'DE';
    }
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
