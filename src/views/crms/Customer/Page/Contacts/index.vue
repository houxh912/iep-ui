<template>
  <div class="contract">
    <div class="head">
      <iep-button type="danger" @click="handleAdd" plain><i class="el-icon-plus"></i> 新增</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain size="small">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-drawer ref="EditDrawer" @load-page="loadPage"></edit-drawer>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from './options'
import { fetchList, deleteDataById, createData, updateData, getContactById } from '@/api/crms/contact'
import EditDrawer from './EditDrawer'
export default {
  name: 'contract',
  mixins: [mixins],
  components: { EditDrawer },
  data () {
    return {
      columnsMap,
      formData: {},
    }
  },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    handleAdd () {
      this.$refs['EditDrawer'].methodName = '新增'
      this.$refs['EditDrawer'].formRequestFn = createData
      this.$refs['EditDrawer'].drawerShow = true
    },
    handleEdit (row) {
      getContactById(row.clientContactId).then(({ data }) => {
        this.$refs['EditDrawer'].form = data.data
      })
      this.$refs['EditDrawer'].methodName = '编辑'
      this.$refs['EditDrawer'].formRequestFn = updateData
      this.$refs['EditDrawer'].drawerShow = true
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.clientContactId, deleteDataById)
    },
  },

}
</script>

<style lang="scss" scoped>
.contract {
  .head {
    margin-bottom: 10px;
  }
}
</style>
