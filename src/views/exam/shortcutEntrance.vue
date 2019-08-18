<template>
  <el-card class="shortcutEntrance-box" shadow="hover">
    <div slot="header" class="clearfix">
      <span>快捷入口</span>
      <iep-button class="btnAdd" type="primary" icon="el-icon-plus" plain>添加</iep-button>
    </div>
    <el-button class="txtAdd" type="text" v-for="item in entry" :key="item.value" style="width: 30%">{{item.label}}</el-button>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      entry: [
        { value: 0, label: '我的考试' },
        { value: 1, label: '我的练习' },
        { value: 2, label: '我的试题' },
        { value: 3, label: '我的积分' },
        { value: 4, label: '我的证书' },
        { value: 5, label: '我的成就' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.shortcutEntrance-box {
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    li {
      cursor: pointer;
      padding: 5px 0px;
      font-size: 18px;
      &:hover {
        color: $--menu-color-primary;
      }
    }
  }
}
.btnAdd {
  position: absolute;
  margin: -.4% 0 0 10.1%;
}
.txtAdd {
  margin-left: 6px;
}
</style>