<template>
  <div v-if="user.profile" class="interests">
    <h2>User Interests</h2>
    <p>Here you can select your <b>favorite topics</b> to study</p>
    <el-row :gutter="20" class="mb-60">
      <el-col :span="12" :xs="24" v-for="topic in topics" :key="topic.ref">
        <Interest :ref="topic.ref" :title="topic.title" :image="topic.image" :desc="topic.desc" />
      </el-col>
      <el-col :span="24" :xs="24" class="actions">
        <el-button type="primary" @click="saveInterests"> Save my Interests </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { INTERESTS } from '@/store/routes';

import Interest from '@/components/ui/Interest.vue';

export default {
  name: 'Interests',
  components: {
    Interest
  },
  data() {
    return {
      showButton: false,
      softwareEngineering: false,
      ai: false,
      lowLevel: false,
      security: false,
      web: false,
      theoretical: false,
      topics: [
        {
          ref: 'ai',
          title: 'Artificial Intelligence',
          image: 'duck',
          desc:
            'Artificial Intelligence is a field where smth is being researched.' +
            ' As an example can be considered Lecture "Machine Learning"'
        },
        {
          ref: 'low',
          title: 'Assembler Level',
          image: 'battery',
          desc:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' +
            ' varius diam molestie mauris facilisis ultrices. Proin quis ' +
            ' gravida neque. Donec in tristique nibh. Etiam fringilla gravida ' +
            ' mauris sed pretium. Aliquam erat volutpat. Vivamus et nisl eu' +
            ' arcu tincidunt vestibulum. Nulla imperdiet condimentum convallis.'
        },
        {
          ref: 'sec',
          title: 'Cyber Security',
          image: 'lock',
          desc:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' +
            ' varius diam molestie mauris facilisis ultrices. Proin quis ' +
            ' gravida neque. Donec in tristique nibh. Etiam fringilla gravida ' +
            ' mauris sed pretium. Aliquam erat volutpat. Vivamus et nisl eu' +
            ' arcu tincidunt vestibulum. Nulla imperdiet condimentum convallis.'
        },
        {
          ref: 'swt',
          title: 'Software Development',
          image: 'computer',
          desc:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' +
            ' varius diam molestie mauris facilisis ultrices. Proin quis ' +
            ' gravida neque. Donec in tristique nibh. Etiam fringilla gravida ' +
            ' mauris sed pretium. Aliquam erat volutpat. Vivamus et nisl eu' +
            ' arcu tincidunt vestibulum. Nulla imperdiet condimentum convallis.'
        },
        {
          ref: 'theo',
          title: 'Theoretical Informatics',
          image: 'shape',
          desc:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' +
            ' varius diam molestie mauris facilisis ultrices. Proin quis ' +
            ' gravida neque. Donec in tristique nibh. Etiam fringilla gravida ' +
            ' mauris sed pretium. Aliquam erat volutpat. Vivamus et nisl eu' +
            ' arcu tincidunt vestibulum. Nulla imperdiet condimentum convallis.'
        },
        {
          ref: 'web',
          title: 'Web Development',
          image: 'sphere',
          desc:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' +
            ' varius diam molestie mauris facilisis ultrices. Proin quis ' +
            ' gravida neque. Donec in tristique nibh. Etiam fringilla gravida ' +
            ' mauris sed pretium. Aliquam erat volutpat. Vivamus et nisl eu' +
            ' arcu tincidunt vestibulum. Nulla imperdiet condimentum convallis.'
        }
      ]
    };
  },
  computed: mapState(['user']),
  methods: {
    saveInterests() {
      const interestsDict = {
        ai: this.$refs.ai[0].$data.isActive,
        low: this.$refs.low[0].$data.isActive,
        sec: this.$refs.sec[0].$data.isActive,
        swt: this.$refs.swt[0].$data.isActive,
        theo: this.$refs.theo[0].$data.isActive,
        web: this.$refs.web[0].$data.isActive
      };
      console.log(JSON.stringify(interestsDict), 'ref', this.$refs);
      const interestsDictStr = JSON.stringify(interestsDict);
      axios
        .post(`${INTERESTS}`, { interestsDictStr })
        .then((response) => {
          console.log(response);
          this.$message.success({
            message: `Saved fields of interest for `,
            duration: 5000,
            showClose: true
          });
        })
        .catch((e) => {
          this.$message.error({
            message: 'No fields of interest were specified, please provide some',
            duration: 10000,
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

<style lang="scss">
.interests {
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

  @media (max-width: 500px) {
    .activity {
      width: 100%;
      margin-right: 15px;
      height: auto;
      margin-bottom: 15px;

      h2 {
        margin: 0;
        padding: 0;
      }

      p {
        font-size: 25px;
        max-width: 56%;
      }

      & > .el-card__body > img {
        right: -50px;
        bottom: 0px;
        width: 180px;
      }
    }
  }
}
</style>
