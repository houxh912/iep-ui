<template>
  <el-popover popper-class="msg-popover" placement="bottom" width="336" v-model="visible" trigger="click">
    <iep-top-message-box class="msg-tabs" :message-list="emailList" :type="2" @visible="visible=false"></iep-top-message-box>
    <el-badge :hidden="!emailNum" :value="emailNum || 0" slot="reference" class="item">
      <el-tooltip effect="dark" content="邮件" placement="bottom">
        <iep-button><i class="el-icon-message"></i></iep-button>
      </el-tooltip>
    </el-badge>
  </el-popover>
</template>
<script>
import { mapState } from 'vuex'
import IepTopMessageBox from './Components/MessageBox'
export default {
  components: { IepTopMessageBox },
  data () {
    return {
      visible: false,
    }
  },
  computed: {
    ...mapState({
      emailList: state => state.notify.emailList,
      emailNum: state => state.notify.emailNum,
    }),
  },
}
</script>
<style lang="css" scoped>
.item >>> .el-badge__content.is-fixed {
  z-index: 1;
  top: 20px;
  right: 22px;
}
.msg-popover >>> .el-popover {
  right: 0;
}
.msg-tabs >>> .el-card__body {
  overflow: auto;
}
</style>
<style lang="scss" scoped>
.item {
  position: relative;
  margin-right: 20px;
  button {
    border: 0;
    height: 60px;
    i {
      font-size: 20px;
    }
    &:focus,
    &:hover {
      background-color: #eee;
      color: #333;
    }
  }
}
.list-clear {
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-top: 1px solid #eceef5;
  color: #999;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #666;
  }
}
</style>
