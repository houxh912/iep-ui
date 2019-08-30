<template>
  <iep-app-layout>
    <breadcrumb></breadcrumb>
    <div class="version-con">
      <div class="version-sidebar">
        <el-tree ref="tree" node-key="id" :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" icon-class="el-icon-arrow-right" :default-expanded-keys="defaultExpandedKeys" :default-checked-keys="defaultCheckedKeys"></el-tree>
      </div>
      <div class="version-con-list">
        <span class="title">
          <span class="num">当前版本号：{{form.versionNumber}}</span>
        </span>
        <span class="time">更新时间：{{form.createTime}}</span>
        <div class="piece" v-for="(item,i) in versionList" :key="i">
          <span class="name">{{item}}</span>
        </div>
      </div>
    </div>
  </iep-app-layout>
</template>
<script>
import Breadcrumb from './Breadcrumb'
import { getVersionTree } from '@/api/admin/version'
import { getVersionById } from '@/api/admin/version'
export default {
  components: {
    Breadcrumb,
  },
  data () {
    return {
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      versionList: [],
      form: {
        createTime: '2019-06-13 00:00:00',
        publisherName: '超级管理员',
        updateTime: '2017-06-11 10:06:41',
        versionDesc: '1.新增财富模块；新增国脉贝获取规则及相关功能；↵2.新增投资模块；↵3.新增在线工资发放功能；↵4.新增财务管理模块；新增组织财务与资产管理相关模块；新增集团账务管理模块；↵5.新增报销申请、开票、打赏、提现等功能；↵6.新增国脉贝发行，资金调拨相关功能；↵7.新增合同关联客户修改为联想输入功能；修复合同编辑页面异常的问题；↵8.修复会议纪要统计数据不准确的问题；↵9.修复劳动合同保存异常的问题；↵10.新增说说列表；新增相关评论和点赞功能；↵11.修复建议收取异常的问题；↵12.修复客户模块的拜访日志异常的问题；↵13.修复客户联系人导入验证异常的问题；↵14.新增客户联系人与相关客户添加完善的功能；↵15.新增未读邮件的独立提醒功能；↵16.新增操作手册、挖贝攻略、常见问题、各类管理制度规范等；新增版本日志；↵17.其它已知问题的修复与各类交互功能的优化。',
        versionNumber: '2.0.1',
        versionTitle: '小更新',
      },
    }
  },
  created () {
    this.loadTree()
  },
  methods: {
    loadPage () {
      getVersionById(this.defaultCheckedKeys[0]).then(({ data }) => {
        this.form = data.data
        this.versionList = this.form.versionDesc.split('\n')
      })
    },
    handleNodeClick (data, node) {
      if (node.level === 2) {
        this.defaultCheckedKeys = [data.id]
        this.$refs.tree.setCheckedKeys(this.defaultCheckedKeys)
        this.loadPage()
      }
    },
    loadTree () {
      getVersionTree().then(({ data }) => {
        this.data = data.data
        this.defaultExpandedKeys = [this.data[0].id]
        this.defaultCheckedKeys = [this.data[0].children[0].id]
        this.loadPage()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.version-con {
  display: grid;
  margin: 0 auto;
  padding: 0 20px;
  width: 1200px;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 3fr) minmax(100px, 11fr);
  border-top: 1px solid #ebeef5;
}
</style>

<style lang="scss" scoped>
.version-con-list {
  padding-top: 25px;
  padding-left: 15px;
  padding-bottom: 100px;
  .piece {
    position: relative;
    padding-left: 15px;
    .name {
      display: inline-block;
      width: 70%;
      height: 30px;
      line-height: 30px;
      transition: all 0.5s;
      &:hover {
        color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #ddd;
    }
  }
  .title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
    font-size: 20px;
    .name {
      margin-left: 5px;
    }
  }
  .time {
    display: block;
    margin-bottom: 20px;
    color: #999;
  }
}
</style>

<style lang="scss" scoped>
.version-sidebar {
  padding-top: 10px;
  height: 100vh;
  border-right: 1px solid #ebeef5;
}
</style>
<style scoped>
.version-sidebar >>> .el-tree-node__content {
  position: relative;
  padding-right: 10px;
  height: 40px;
  line-height: 40px;
}
.version-sidebar >>> .el-tree-node__content:hover,
.version-sidebar >>> .el-tree-node:focus > .el-tree-node__content {
  background: none;
}
.version-sidebar >>> .el-tree-node__children .el-tree-node__content:hover,
.version-sidebar >>> .el-tree-node__children .el-tree-node__content:focus,
.version-sidebar
  >>> .el-tree-node__children
  .is-checked
  .el-tree-node__content {
  border-right: 2px solid #cb3737;
  background-color: #fafafa;
  color: #cb3737;
}
.version-sidebar >>> .el-tree-node__expand-icon {
  position: absolute;
  top: 10px;
  right: 15px;
}
</style>
