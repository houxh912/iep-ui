<template>
  <div class="title-wrapper">
    <div class="left">
      <span class="page-title">{{title}}</span>
      <span class="page-desc">{{desc}}</span>
    </div>
    <div class="right">
      <iep-button v-if="backOption.isBack" @click="handleBack">返回</iep-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    replaceText: {
      type: Function,
      required: false,
      default: () => { },
    },
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
    backOption: {
      type: Object,
      default: () => {
        return {
          isBack: false,
          backPath: '',
        }
      },
    },
  },
  computed: {
    desc () {
      return this.replaceText(this.data)
    },
  },
  methods: {
    handleBack () {
      this.$router.push({
        path: this.backOption.backPath,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.title-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .page-title {
    font-size: 20px;
  }
  .page-desc {
    font-size: 14px;
  }
  .el-button--default.is-plain:nth-child(1) {
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    &:hover {
      border-color: #ea8d03;
      background-color: #fff7ec;
      color: #ea8d03;
    }
  }
}
</style>
