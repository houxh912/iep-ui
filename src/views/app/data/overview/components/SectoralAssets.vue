<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="department" label="部门" width="230">
      </el-table-column>
      <el-table-column prop="num" label="资产数(万) ">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '部门资产排行',
      tableData: [{
        department: '国脉集团研发中心',
        num: '124',
      }, {
        department: '综合管理中心一部',
        num: '256',
      }, {
        department: '北方区业务一部',
        num: '325',
      }, {
        department: '智慧城市与产业规划部',
        num: '417',
      }, {
        department: '北京国脉数智信息服务有限公司',
        num: '212',
      }, {
        department: '青海国脉互联信息科技有限公司',
        num: '442',
      }, {
        department: '国脉海洋信息发展有限公司',
        num: '233',
      }, {
        department: '北京仓颉数源网络有限公司 ',
        num: '223',
      }],
    }
  },
}
</script>
<style lang="scss" scoped>
.statistics {
  padding: 20px 0;
  .title {
    padding-bottom: 10px;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}
</style>
<style scoped>
.statistics >>> .cell {
  text-align: right;
}
.statistics >>> tr td:nth-child(1) .cell {
  color: #0054a3;
  cursor: pointer;
}
.statistics >>> tr td:nth-child(1) .cell:hover {
  color: #1978d1;
}
.statistics >>> tr td:nth-child(1) .cell,
.statistics >>> tr th:nth-child(1) .cell {
  text-align: left;
}
.statistics >>> tr td:nth-child(1) .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
