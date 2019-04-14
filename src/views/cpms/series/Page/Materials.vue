<template>
  <el-table :data="tableData" border>
    <el-table-column label="标题">
      <template slot-scope="scope">
        <div>{{scope.row.title}}</div>
      </template>
    </el-table-column>
    <el-table-column label="类别">
      <template slot-scope="scope">
        <div>{{scope.row.type}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 1,
          title: '关于数据清理的方法及讨论结果',
          type: '产品资料',
        },
        {
          id: 2,
          title: '关于数据清理的方法及讨论结果',
          type: '产品资质',
        },
        {
          id: 3,
          title: '关于数据清理的方法及讨论结果',
          type: '产品资质',
        },
      ],
    }
  },
}
</script>
