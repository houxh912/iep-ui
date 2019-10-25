<template>
  <el-card shadow="never" style="margin-bottom: 30px;">
    <div class="title">{{information.name}}</div>
    <el-row>
      <el-col :span="8">
        <div>标签级别：{{information.levelName}}</div>
      </el-col>
      <el-col :span="8">
        <div>标签分类：{{information.typeVos?information.typeVos.map(m=>m.name).join('、'):'暂无'}}</div>
      </el-col>
      <el-col :span="8">
        <div>关联标签：{{information.tagList?information.tagList.map(m=>m.commonName).join('、'):'暂无'}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div>标签注释：{{information.description}}</div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: {
    information: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-weight: 400;
  color: #333;
  margin-bottom: 30px;
}
.el-row {
  margin-bottom: 20px;
  color: #666;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>

