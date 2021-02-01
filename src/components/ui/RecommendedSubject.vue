<template>
  <el-card shadow="hover" class="subject" :class="{ recommended: index === 0 }">
    <h2>{{ name }}</h2>
    <div class="stick-bottom">
      <div class="tags">
        <el-tag v-if="index === 0">Recommended</el-tag>
        <el-tag v-for="tag in tags" :type="tag" :key="tag.text">{{ tag }}</el-tag>
      </div>
      <img :src="require('@/assets/' + image + '.jpg')" width="245" alt="image" />
      <div class="details">
        <div class="big-number">
          <div class="desc">Type:</div>
          {{ type }}
        </div>
        <div class="big-number">
          <div class="desc">Size:</div>
          {{ sws }} sws
        </div>
        <div class="big-number">
          <div class="desc">Semester:</div>
          {{ semester }}
        </div>
        <div class="big-number">
          <div class="desc">Language:</div>
          {{ lang }}
        </div>
      </div>
      <el-button @click="open" size="small" icon="el-icon-office-building">
        Open subject's homepage
      </el-button>
    </div>
  </el-card>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'RecommendedSubjectC',
  props: {
    tags: Array,
    name: String,
    url: String,
    sws: Number,
    type: String,
    index: Number,
    semester: String,
    lang: String
  },
  computed: {
    image() {
      console.log('in', this.index);
      if (this.index === 0) {
        return 'coin';
      }
      return `spiral-${Math.floor(Math.random() * Math.floor(7)) + 1}`;
    }
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
  z-index: 40;

  h2 {
    font-size: 37px;
    width: 89%;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #2c3e50;
  }

  .tags {
    padding-top: 5px;
    padding-bottom: 20px;
    .el-tag {
      margin-top: 5px;
    }
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 50px;
    width: 50%;

    div.big-number {
      display: inline-block;
      font-size: 25px;
      padding: 0 10px 5px 0;

      .desc {
        font-size: 13px;
      }
    }
  }

  img {
    position: absolute;
    bottom: -42px;
    right: -50px;
    z-index: -14;
  }

  .el-button {
    position: absolute;
    bottom: 20px;
  }

  &.recommended {
    border: 1px solid #eac374;

    h2 {
      color: #eac374;
      width: 89%;
    }

    .big-number {
      color: #eac374;
      .desc {
        color: #2c3e50;
      }
    }

    .el-tag,
    .el-button:hover {
      border: 1px solid #eac374;
      background-color: #eac3743d;
      color: #ab7300;
    }
  }
  @media (max-width: 500px) {
    .el-tag {
    }

    img {
      width: 180px;
      bottom: -25px;
      right: -20px;
    }

    &.recommended {
      img {
        bottom: -30px;
        right: -30px;
      }
    }

    .details {
      width: 64%;
    }
  }

  .el-tag {
    margin-right: 5px;
  }
}
</style>
