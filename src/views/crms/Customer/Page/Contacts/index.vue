<template>
  <div class="contract">
    <div class="head">
      <iep-button type="primary" @click="handleAdd" plain><i class="el-icon-plus"></i> 新增</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning" plain :disabled="scope.row.creatorId !== userInfo.userId">编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" :disabled="scope.row.creatorId !== userInfo.userId">删除</iep-button>
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
import { mapGetters } from 'vuex'
export default {
  name: 'contract',
  mixins: [mixins],
  components: { EditDrawer },
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      columnsMap,
      formData: {},
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  methods: {
    loadPage (param = { ...this.searchForm, clientId: this.record.id }) {
      this.loadTable(param, fetchList)
    },
    handleAdd () {
      console.log(this.record.id)
      this.$refs['EditDrawer'].methodName = '新增'
      this.$refs['EditDrawer'].formRequestFn = createData
      this.$refs['EditDrawer'].drawerShow = true
      this.$refs['EditDrawer'].id = this.record.id
    },
    handleEdit (row) {
      getContactById(row.clientContactId).then(({ data }) => {
        this.$refs['EditDrawer'].form = data.data
      })
      this.$refs['EditDrawer'].methodName = '编辑'
      this.$refs['EditDrawer'].formRequestFn = updateData
      this.$refs['EditDrawer'].drawerShow = true
      this.$refs['EditDrawer'].clientContactId = row.clientContactId
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
