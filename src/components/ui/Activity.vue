<template>
  <el-card shadow="hover" class="activity plan">
    <h2>{{ title }}</h2>
    <p>
      {{ text }}
    </p>
    <img :src="require('@/assets/' + image + '.jpg')" alt="image" />
    <el-button type="" @click="action" size="small">{{ buttonText }}</el-button>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ActivityC',
  props: {
    title: String,
    text: String,
    image: String,
    buttonText: String,
    action: Function
  },
  data() {
    return {
      loading: false,
      showPassword: true,
      autoComplete: 'true'
    };
  }
});
</script>

<style lang="scss">
.activity {
  display: block;
  height: auto;
  position: relative;
  z-index: 0;
  width: 450px;
  margin-right: 15px;
  margin-bottom: 15px;

  h2 {
    font-size: 50px;
    margin: 0;
    padding: 0;
  }

  p {
    max-width: 190px;
    font-size: 25px;
  }

  & > .el-card__body > img {
    position: absolute;
    z-index: 100;
    right: -40px;
    bottom: -25px;
    width: 250px;
  }
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
      bottom: -10px;
      width: 180px;
    }
  }
}
</style>
