<template>
  <!-- <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" :isPagination="false">
    <template v-if="tabName ==='personal'" v-slot:personal>
      <tableTemplate ref="tableTpl" :getTableData="getTablePersonal" @handleShare="handleShare" @selectionChange="handleSelectionChange" @handleCollection="handleCollection" :permissionEdit="permission_edit" :permissionDelete="permission_delete" @handleDetail="handleDetail" :permissionOpera=true :paramForm="paramForm">
      </tableTemplate>
    </template>
  </iep-table> -->
  <div class="table">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        label="日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="prop"
        label="姓名"
        sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { dataAssetsData } from './option'
export default {
  data () {
    return {
      isLoadTable: false,
      tableData: [],
      columnsMap: [
        {
          label: '资产项',
          prop: 'createTime',
        }, {
          label: '金额',
          prop: 'createTime',
        },
      ],
    }
  },
  methods: {
    loadPage () {
      this.tableData = [
        {
          id: 1,
          name: '名字',
          prop: 'prop',
          children: [
            {
              id: 2,
              name: '哈哈',
              prop: 'asd',
            },
          ],
        },
      ]
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style scoped>
.table >>> .el-table--border {
  border-bottom: 1px solid #EBEEF5;
}
</style>
