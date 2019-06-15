<template>
  <div class="statistics">
    <div class="title">{{title}}</div>
    <el-table :data="tableData" stripe>
      <el-table-column prop="department" label="部门" width="230">
      </el-table-column>
      <el-table-column prop="num" label="信用数">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '部门信用排行',
      tableData: [{
        department: '国脉集团研发中心',
        num: '84',
      }, {
        department: '综合管理中心一部',
        num: '96',
      }, {
        department: '北方区业务一部',
        num: '75',
      }, {
        department: '智慧城市与产业规划部',
        num: '79',
      }, {
        department: '北京国脉数智信息服务有限公司',
        num: '93',
      }, {
        department: '青海国脉互联信息科技有限公司',
        num: '86',
      }, {
        department: '国脉海洋信息发展有限公司',
        num: '88',
      }, {
        department: '北京仓颉数源网络有限公司 ',
        num: '79',
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
