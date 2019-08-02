<template>
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="name"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      stripe>
      <el-table-column
        prop="name"
        label="资产项">
        <template slot-scope="scope">
          <span :class="scope.row.children && scope.row.children.length === 0 ? 'nochild' : ''">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="value"
        label="金额（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { dataAssetsData } from './options'
import { getOrgAssets } from '@/api/app/upms/'
export default {
  data () {
    return {
      isLoadTable: false,
      tableData: [],
    }
  },
  methods: {
    getData (data, columns) {
      for (let item of columns) {
        item.value = data[item.prop]
        for (let t of item.children) {
          t.value = data[t.prop]
        }
      }
      this.tableData = columns
    },
  },
  mounted () {
    let orgId = this.$route.params.id
    getOrgAssets(orgId).then(({data}) => {
      for (let item of dataAssetsData) {
        item.value = data.data[item.prop].total
        for (let t of item.children) {
          t.value = data.data[item.prop][t.prop]
        }
      }
      this.tableData = dataAssetsData
    })
  },
}
</script>

<style scoped>
.table >>> .el-table--border {
  border-bottom: 1px solid #EBEEF5;
}
.table >>> .el-table__row {
  height: 45px;
}
.table >>> .el-table thead {
  color: #909399;
  font-weight: 500;
}
.nochild {
  padding-left: 19px;
}
</style>
