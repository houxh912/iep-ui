<template>
  <div>
    <basic-container>
      <iep-page-header title="广告位管理"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" plain @click="handleAdd" icon="el-icon-plus">新增</iep-button>
        </template>
        <!-- <template slot="right">
          <operation-search>
          </operation-search>
        </template> -->
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column prop="operation" label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" type="primary" plain>编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>
<script>
import { getPageById, postPage, updatePage, deleteADSlotById } from '@/api/conm/adslot_controller'
import mixins from '@/mixins/mixins'
import { columnsMap, dictsMap } from './options'
import DialogForm from './DialogForm'
export default {
  mixins: [mixins],
  components: { DialogForm },
  data () {
    return {
      dictsMap,
      columnsMap,
      pagedTable: [
      ],
      isLoadTable: false,
      siteId: '',
    }
  },
  created () {
    this.siteId = this.$route.params.id
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].siteId = this.siteId
      this.$refs['DialogForm'].formRequestFn = postPage
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].methodName = '新增'
    },
    handleEdit (row) {
      this.$refs['DialogForm'].siteId = this.siteId
      this.$refs['DialogForm'].id = row.value
      this.$refs['DialogForm'].formRequestFn = updatePage
      this.$refs['DialogForm'].dialogShow = true
      this.$refs['DialogForm'].loadTypeList()
      this.$refs['DialogForm'].methodName = '编辑'
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.value, deleteADSlotById)
    },
    async loadPage () {
      getPageById(this.siteId).then((data) => {
        const newData = data.data.data
        this.pagedTable = newData
      })
    },
  },
}
</script>