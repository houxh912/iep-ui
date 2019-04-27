<template>
  <div class="team-information">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <el-row>
      <el-col :span="8"><span>负责人：</span>{{number}}</el-col>
      <el-col :span="8"><span>需求方：</span>{{number}}</el-col>
      <el-col :span="8"><span>技术经理：</span>{{number}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="8"><span>产品经理：</span>{{number}}</el-col>
      <el-col :span="16"><span>团队成员：</span>{{number}}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '团队信息',
      number: 'AU8979626',
    }
  },
}
</script>
<style lang="scss" scoped>
.team-information {
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
}
.title {
  font-size: 16px;
  height: 60px;
  line-height: 60px;
  color: #333;
}
.el-col {
  height: 30px;
  line-height: 30px;
  > span {
    width: 100px;
    display: inline-block;
    text-align: right;
  }
}
</style>
<style scoped>
</style>
