<template>
  <el-card shadow="hover" class="interest mb-20" :class="{ active: isActive }">
    <el-row :gutter="20">
      <el-col :span="10" :xs="24">
        <img :src="require('@/assets/' + image + '.jpg')" width="165" alt="image" />
      </el-col>
      <el-col :span="14" :xs="24">
        <h2>{{ title }}</h2>
        <el-tag v-if="isActive" type="primary" disable-transitions>This topic is selected </el-tag>
        <el-tag v-else type="info" disable-transitions>Topic is avalibale </el-tag>
        <div class="actions">
          <el-button
            v-if="isActive"
            @click="makeActive"
            size="big"
            type="danger"
            icon="el-icon-folder-delete"
            plain
          >
            Remove topic
          </el-button>
          <el-button
            v-else
            @click="makeActive"
            size="big"
            type="primary"
            icon="el-icon-folder-add"
            plain
          >
            Select topic
          </el-button>
          <el-button @click="centerDialogVisible = true" size="big"> Info </el-button>
        </div>
      </el-col>
    </el-row>
    <el-dialog :title="title" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="details">
        <img :src="require('@/assets/' + image + '.jpg')" width="200" alt="image" />
        <h2>{{ title }}</h2>
        <p>{{ desc }}</p>
      </div>
      <span></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false" icon="el-icon-close">Close</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'InterestC',
  props: {
    name: String,
    title: String,
    desc: String,
    image: {
      type: String,
      default: 'bomb'
    }
  },
  computed: mapState(['user']),
  created() {
    this.isActive = this.user.profile.interests.includes(this.name);
  },
  data() {
    return {
      isActive: false,
      centerDialogVisible: false
    };
  },
  methods: {
    makeActive() {
      this.$data.isActive = !this.$data.isActive;
    }
  }
});
</script>

<style lang="scss">
.interest {
  width: auto;
  position: relative;

  &.active {
    border: 1px solid #5d9cec;
  }

  .actions {
    display: flex;
    justify-content: space-between;
  }

  .el-tag {
    display: block;
    margin-bottom: 10px;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    font-size: 37px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .el-dialog {
    margin-top: 7vh !important;
  }

  .el-dialog__body {
    padding-left: 90px;
    padding-right: 90px;
    word-break: break-word;

    p {
      font-size: 22px;
      white-space: normal;
      line-height: 1.5;
    }

    h2 {
      font-size: 45px;
    }

    img {
      margin: auto;
    }
  }
}

@media (max-width: 500px) {
  .el-dialog.el-dialog--center {
    margin-top: 0 !important;
    width: 100% !important;
  }

  .interest {
    width: auto;

    .el-dialog__body {
      padding-right: 0;
      padding-left: 0;
      h2,
      p {
        padding-left: 50px;
        padding-right: 50px;
      }

      p {
        font-size: 15px;
      }
    }
  }
}

@media (max-width: 340px) {
  .interest .el-dialog__body {
    padding-right: 0;
    padding-left: 0;
    h2 {
      font-size: 35px;
    }
  }
}
</style>
