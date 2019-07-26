<template>
  <div class="externalCertificate">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="学习（教育）单位">
      </el-table-column>
      <el-table-column
        prop="name"
        label="起止时间">
        <template slot-scope="scope">
          {{ scope.row.startTime.split(',').join('至') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="学习内容">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
    },
  },
  data () {
    return {}
  },
}
</script>
