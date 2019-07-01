<template>
  <div class="workExperience">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="公司">
      </el-table-column>
      <el-table-column
        prop="position"
        label="岗位">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="起止时间">
        <template slot-scope="scope">
          <!-- {{ dealwithTime(scope.row.startTime) }} -->
          {{ scope.row.startTime.split(',').join('至') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="工作描述">
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
}
</script>
