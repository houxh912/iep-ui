<template>
  <el-dialog class="iep-dialog" :width="width" :visible="dialogShow" :before-close="handleClose" @close="close" :fullscreen="fullscreen" append-to-body :close-on-click-modal="closeOnClickModal" v-bind="$attrs" v-on="$listeners">
    <div slot="title" class="dialog-title-box">
      <span class="dialog-title">{{title}}</span>
      <el-button v-if="isNeedRestore" class="text-icon" type="text" @click="toggleFullscreen">
        <i class="icon-huanyuan"></i>
      </el-button>
    </div>
    <el-scrollbar v-if="dialogShow" wrap-class="wrap-dialog" view-class="view-dialog">
      <slot></slot>
    </el-scrollbar>
    <div slot="footer" class="dialog-footer">
      <OperationWrapper>
        <slot name="footer"></slot>
      </OperationWrapper>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'IepDialog',
  inheritAttrs: false,
  props: {
    dialogShow: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '标题',
      type: String,
      required: true,
    },
    width: {
      default: '30%',
      type: String,
    },
    closeOnClickModal: {
      default: false,
      type: Boolean,
    },
    isNeedConfirm: {
      default: false,
      type: Boolean,
    },
    isNeedRestore: {
      default: false,
      type: Boolean,
    },
    reminderText: {
      default: '数据还没保存',
      type: String,
      required: false,
    },
  },
  data () {
    return {
      fullscreen: false,
    }
  },
  methods: {
    toggleFullscreen () {
      this.fullscreen = !this.fullscreen
    },
    handleClose (done) {
      if (this.isNeedConfirm) {
        this.$confirm(`${this.reminderText}，确定关闭？`)
          .then(() => {
            done()
          })
          .catch(() => { })
      } else {
        done()
      }
    },
    close () {
      this.$emit('close', false)
    },
  },
  watch: {
    dialogShow (n) {
      if (n) {
        this.$emit('slot-mounted')
      }
    },
  },
}
</script>
<style lang="css" scoped>
.iep-dialog >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.iep-dialog >>> .el-dialog__body {
  padding: 10px 25px;
}
.iep-dialog >>> .el-dialog__footer {
  padding: 10px;
}
</style>

<style lang="scss" >
.dialog-title {
  float: none;
  height: inherit;
  color: #000;
  overflow: hidden;
  margin: 0;
  padding-left: 0;
  font-weight: 700;
  line-height: 26px;
  font-size: 14px;
}
.dialog-title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 24px;
  height: 24px;
  padding-right: 20px;
}
.wrap-dialog {
  max-height: 54vh;
  padding: 8px 0;
  overflow-x: hidden;
}
.view-dialog {
  padding-bottom: 10px;
  padding-right: 10px;
}
.text-icon {
  color: #333;
}
.el-dialog__wrapper >>> .is-fullscreen .el-dialog__body {
  text-align: initial;
  max-height: 88vh !important;
}
</style>
