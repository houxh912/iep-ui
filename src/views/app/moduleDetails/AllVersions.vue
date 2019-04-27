
<template>
  <div class="all-versions">
    <div class="title">
      <div>{{title}}</div>
    </div>
    <el-table :data="tableData" border style="width: 100%" size=medium>
      <el-table-column prop="number" label="版本号" width="180"></el-table-column>
      <el-table-column prop="time" label="上线日期" width="300"></el-table-column>
      <el-table-column prop="description" label="更新说明"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '全部版本',
      tableData: [
        { number: 'AU8979626', time: '2019-04-26', description: 'sssssssss' },
        { number: 'AU8979626', time: '2019-04-26', description: 'sssssssss' },
        { number: 'AU8979626', time: '2019-04-26', description: 'sssssssss' },
        { number: 'AU8979626', time: '2019-04-26', description: 'sssssssss' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.all-versions {
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
  .title {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    color: #333;
  }
}
</style>
<style scoped>
</style>
