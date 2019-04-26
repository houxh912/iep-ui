<template>
  <div class="menus">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <span>规章制度{{data[0]}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">集团管理制度</el-menu-item>
          <el-menu-item index="1-2">委员会管理制度</el-menu-item>
          <el-menu-item index="1-3">部门管理制度</el-menu-item>
          <el-menu-item index="1-4">内网管理制度</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <span slot="title">人力学习{{data[1]}}</span>
      </el-menu-item>
      <el-menu-item index="3">
        <span slot="title">市场项目{{data[2]}}</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span slot="title">产品与技术{{data[2]}}</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span slot="title">品牌形象{{data[2]}}</span>
      </el-menu-item>
      <el-menu-item index="6">
        <span slot="title">平台材料{{data[2]}}</span>
      </el-menu-item>
      <el-menu-item index="7">
        <span slot="title">智库研究{{data[2]}}</span>
      </el-menu-item>
      <el-menu-item index="8">
        <span slot="title">财务投资{{data[2]}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ['(86)','(16)','(25)','(25)','(80)','(58)','(36)','(126)','(96)'],
    }
  },
  methods: {
    handleOpen () {

    },
    handleClose () {

    },
  },
}
</script>
<style lang="scss" scoped>
.menus {
  border-right: 1px solid #eee;
  .el-menu {
    border-right: 0;
  }
}
</style>


