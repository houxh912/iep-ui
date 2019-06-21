<template>
  <div class="externalCertificate">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="证书名称">
      </el-table-column>
      <el-table-column
        prop="number"
        label="证书编号">
      </el-table-column>
      <el-table-column
        prop="issuedPlace"
        label="颁发单位">
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

<style lang="scss" scoped>
.educationalExperience {
  width: 100%;
}
</style>
