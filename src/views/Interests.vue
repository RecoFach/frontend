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
            'Artificial Intelligence is a field where smth is being researched.' +
            ' As an example can be considered Lecture "Machine Learning"'
        },
        {
          ref: 'LOWLEVEL',
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
          ref: 'SECURITY',
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
          ref: 'SOFTWARE',
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
          ref: 'THEORETICAL',
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
          ref: 'WEB',
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
      this.$store.dispatch(USER_UPDATE_INTEREST, { interests }).finally(() => {
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
