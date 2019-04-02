<template>
  <div class="title-wrapper">
    <div class="title-col">
      <div class="left">
        <span class="page-title" :style="{fontSize: `${titleSize}px`,fontWeight: titleWeight}">{{title}}</span>
        <span class="page-desc">{{desc}}</span>
      </div>
      <div class="right">
        <operation-wrapper>
          <slot></slot>
          <iep-button v-if="backOption.isBack" @click="handleBack">返回</iep-button>
        </operation-wrapper>
      </div>
    </div>
    <div class="sub-col">
      <slot name="sub"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true,
      default: '标题',
    },
    titleSize: {
      type: Number,
      default: 20,
    },
    titleWeight: {
      type: Number,
      default: 400,
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
          backFunction: () => { },
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
      let path = '/'
      if (this.backOption.backPath) {
        path = this.backOption.backPath
      }
      if (this.backOption.backPath === null) {
        this.backOption.backFunction()
        return
      }
      this.$router.push({
        path,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.title-wrapper {
  margin-bottom: 20px;
  .title-col {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
}
</style>
