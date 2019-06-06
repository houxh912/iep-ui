<template>
  <div class="version-sidebar">
    <el-tree node-key="id" :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" icon-class="el-icon-arrow-right" :default-expanded-keys="[1]" :default-checked-keys="[4]"></el-tree>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          id: 1,
          label: '2019年6月（1）',
          children: [
            {
              id: 4,
              label: '2.0.1更新日志',
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
  },
}
</script>
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
