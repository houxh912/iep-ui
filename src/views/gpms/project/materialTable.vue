<template>
  <div>
    <iep-table :isLoadTable="false" border :pagedTable="dataList" :isPagination="false">
      <el-table-column label="材料名称">
          <template slot-scope="scope">
          {{ scope.row.name }}
          </template>
      </el-table-column>
      <el-table-column label="类型">
          <template slot-scope="scope">
          {{ scope.row.materialType }}
          </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
          <operation-wrapper>
              <iep-button @click="handleDetail(scope.row)" size="small">查看</iep-button>
          </operation-wrapper>
          </template>
      </el-table-column>
    </iep-table>
  </div>
</template>
<script>
export default {
  name: 'collectionTable',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data () {
    return {

    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
}
</script>
