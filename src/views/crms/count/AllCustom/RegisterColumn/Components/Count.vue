<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="rank" label="排名">
      </el-table-column>
      <el-table-column prop="position" label="负责部门">
      </el-table-column>
      <el-table-column prop="client" label="客户数量">
      </el-table-column>
      <el-table-column prop="cntact" label="联系人数量">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        rank: 1,
        position: '北方一部',
        client: 12,
        cntact: 34,
      }, {
        rank: 2,
        position: '北方一部',
        client: 12,
        cntact: 34,
      }, {
        rank: 3,
        position: '北方一部',
        client: 12,
        cntact: 34,
      }, {
        rank: 4,
        position: '北方一部',
        client: 12,
        cntact: 34,
      }, {
        rank: 5,
        position: '北方一部',
        client: 12,
        cntact: 34,
      }],
    }
  },
}
</script>

<style>
</style>
