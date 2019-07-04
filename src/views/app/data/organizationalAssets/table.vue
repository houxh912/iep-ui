<template>
  <div class="organizationalAssets">
    <page-header title="组织资产"></page-header>
    <iep-table :isLoadTable="isLoadTable" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" :isPagination="false" @row-click="rowClick">
      <el-table-column label="排行" slot="before-columns" width="90px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1}}</span>
        </template>
      </el-table-column>
    </iep-table>
  </div>
</template>

<script>
import { getAssetsList } from '@/api/fams/statistics'
export default {
  data () {
    return {
      isLoadTable: false,
      dictsMap: {},
      pagedTable: [],
      columnsMap: [
        {
          label: '组织名称',
          prop: 'name',
        }, {
          label: '组织资产（元）',
          prop: 'orgAssets',
          width: '170px',
        }, {
          label: '数据资产（元）',
          prop: 'dataAssets',
          width: '170px',
        }, {
          label: '财务资产（元）',
          prop: 'financialAssets',
          width: '170px',
        },
      ],
    }
  },
  methods: {
    loadPage () {
      this.isLoadTable = true
      getAssetsList().then(({data}) => {
        this.isLoadTable = false
        this.pagedTable = data.data
      })
    },
    rowClick (row) {
      this.$emit('change-tab', row)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style scoped>
.organizationalAssets >>> .el-table__row {
  height: 45px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
</style>