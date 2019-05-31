<template>
  <div class="stock">
    <span class="sub-title">{{title}}</span>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="num" label="序号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="股东" width="180">
      </el-table-column>
      <el-table-column prop="ratio" label="持股比例">
      </el-table-column>
      <el-table-column prop="time" label="认缴出资日期">
      </el-table-column>
      <el-table-column prop="type" label="股东类型">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '当前股份构成',
      tableData: [{
        num: '1',
        name: '黄磊',
        ratio: '10%',
        time: '2018-06-22',
        type: '个人',
      }, {
        num: '2',
        name: '舟山国脉研发中心',
        ratio: '30%',
        time: '2018-07-23',
        type: '企业',
      }, {
        num: '3',
        name: '潘超巧',
        ratio: '10%',
        time: '2018-07-23',
        type: '个人',
      }, {
        num: '4',
        name: '何益挺',
        ratio: '10%',
        time: '2018-08-05',
        type: '个人',
      }],
    }
  },
}
</script>

<style lang="scss" scoped>
.stock {
  margin-bottom: 40px;
  .sub-title {
    display: block;
    margin-bottom: 20px;
    font-size: 15px;
  }
  .item-con {
    display: grid;
    grid-auto-flow: row dense;
    grid-row-gap: 25px;
    grid-column-gap: 25px;
    grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
        100px,
        2fr
      );
  }
  .item {
  }
}
</style>

<style scoped>
.stock >>> .el-table thead tr,
.stock >>> .el-table thead th {
  background-color: #f5f7fa;
}
</style>
