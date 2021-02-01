<template>
  <div v-if="user.profile" class="interests">
    <h2>User Interests</h2>
    <p>Here you can select your <b>favorite topics</b> to study</p>
    <el-row :gutter="20" class="mb-60">
      <el-col :span="12" :xs="24" v-for="topic in topics" :key="topic.ref">
        <Interest
          :ref="topic.ref"
          :name="topic.ref"
          :title="topic.title"
          :image="topic.image"
          :desc="topic.desc"
        />
      </el-col>
      <el-col :span="24" :xs="24" class="actions">
        <el-button type="primary" @click="saveInterests" :loading="loading">
          Save my Interests
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Interest from '@/components/ui/Interest.vue';
import { USER_UPDATE_INTEREST } from '@/store/actions/user';

export default {
  name: 'Interests',
  components: {
    Interest
  },
  data() {
    return {
      loading: false,
      showButton: false,
      softwareEngineering: false,
      ai: false,
      lowLevel: false,
      security: false,
      web: false,
      theoretical: false,
      topics: [
        {
          ref: 'AI',
          title: 'Artificial Intelligence',
          image: 'duck',
          desc:
            'Artificial Intelligence - is a field where practical and ' +
            'theoretical concepts of artificial intelligence will be ' +
            'explained. As an example can be considered Lecture ' +
            '"Machine Learning"'
        },
        {
          ref: 'LOWLEVEL',
          title: 'Assembler Level',
          image: 'battery',
          desc:
            'Assembler-Level - is a field where low lewel concepts of ' +
            'computer science will be taught.  As an example can be' +
            'considered Lecture Scheduling theory'
        },
        {
          ref: 'SECURITY',
          title: 'Cyber Security',
          image: 'lock',
          desc:
            'Cyber Security - is a field where will be presented ' +
            'privacy concepts and cryptography. As an example can ' +
            'be considered Lecture "Cryptography and Cryptanalysis"'
        },
        {
          ref: 'SOFTWARE',
          title: 'Software Development',
          image: 'computer',
          desc:
            'Software engineering is a field where you will learn ' +
            'software development and proper architecture. As an ' +
            'example can be considered Lecture “Systems engineering 1”'
        },
        {
          ref: 'THEORETICAL',
          title: 'Theoretical Informatics',
          image: 'shape',
          desc:
            'Theoretical Informatics - is a field where theorem proofs ' +
            'will be shown. As an example can be considered Lecture ' +
            '"Theory of Weighted Tree Automata"'
        },
        {
          ref: 'WEB',
          title: 'Web Development',
          image: 'sphere',
          desc:
            'Web Dev - is a field where will be taught concepts of web ' +
            'development and frontend. As an example can be considered ' +
            'Lecture "Data Visualization"'
        }
      ]
    };
  },
  computed: mapState(['user']),
  methods: {
    saveInterests() {
      this.$data.loading = true;
      const interests = [];
      // eslint-disable-next-line no-restricted-syntax,guard-for-in
      for (const ref in this.$refs) {
        if (this.$refs[ref]) {
          if (this.$refs[ref][0].$data.isActive) {
            interests.push(ref.toString().toUpperCase());
          }
        }
      }
      this.$store
        .dispatch(USER_UPDATE_INTEREST, { interests })
        .then((response) => {
          console.log(response);
          this.$message.success({
            message: `Hey, ${response.data.username}, your interests are updated`,
            duration: 5000,
            showClose: true
          });
        })
        .catch((e) => {
          this.$message.error({
            message: 'Sorry, something went wrong :(',
            duration: 5000,
            showClose: true
          });
          console.log(e.message);
        })
        .finally(() => {
          this.$data.loading = false;
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
