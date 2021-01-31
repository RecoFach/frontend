<template>
  <el-card shadow="hover" class="subject" :class="{ recommended: index === 0 }">
    <h2>{{ subjectName }}</h2>
    <el-tag v-if="index === 0">Recommended</el-tag>
    <el-tag v-for="tag in tags" :type="tag" :key="tag.text">{{ tag }}</el-tag>
    <img :src="require('@/assets/' + image + '.jpg')" width="245" alt="image" />
    <p>Number of SWS: {{ sws }}</p>
    <p>Type: {{ subjectType }}</p>
    <el-button @click="open" size="small" icon="el-icon-office-building">
      Open subject's homepage
    </el-button>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'RecommendedSubjectC',
  props: {
    tags: Array,
    subjectName: String,
    url: String,
    sws: Number,
    subjectType: String,
    index: Number
  },
  computed: {
    image() {
      console.log('in', this.index);
      if (this.index === 0) {
        return 'coin';
      }
      return `spiral-${Math.floor(Math.random() * Math.floor(4)) + 1}`;
    }
  },
  data() {
    return {
      // subjectName: String,
      // url: String,
      // sws: String,
      // subjectType: String,
      // area: Array
    };
  },
  methods: {
    open() {
      window.open(this.url, '_blank');
    }
  }
});
</script>

<style lang="scss">
.subject {
  width: 450px;
  position: relative;
  h2 {
    font-size: 37px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  &.recommended {
    border: 1px solid #eac374;

    h2 {
      color: #eac374;
    }

    .el-tag,
    .el-button:hover {
      border: 1px solid #eac374;
      background-color: #eac3743d;
      color: #ab7300;
    }
  }

  img {
    position: absolute;
    bottom: -42px;
    right: -50px;
  }

  @media (max-width: 500px) {
    img {
      width: 120px;
      bottom: -22px;
      right: -50px;
    }
  }

  .el-tag {
    margin-right: 5px;
  }
}
</style>
