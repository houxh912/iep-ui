<template>
  <div class="contract">
    <div class="head">
      <iep-button type="danger" @click="handleAdd" plain><i class="el-icon-plus"></i> 新增</iep-button>
    </div>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <el-table-column prop="operation" label="操作" width="200px">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" size="small" type="warning" plain>编辑</iep-button>
            <iep-button @click="handleDeleteById(scope.row)" size="small">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-drawer ref="EditDrawer"></edit-drawer>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import { fetchList, deleteDataById, editList } from '@/api/crms/contact'
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
      this.$refs['EditDrawer'].formRequestFn = editList
      this.$refs['EditDrawer'].drawerShow = true
    },
    handleEdit (row) {
      this.$refs['EditDrawer'].form = row
      this.$refs['EditDrawer'].methodName = '编辑'
      this.$refs['EditDrawer'].formRequestFn = editList
      this.$refs['EditDrawer'].drawerShow = true
      // this.$emit('onEdit', {
      //   formRequestFn: editList,
      //   methodName: '修改',
      //   id: row.clientContactId,
      // })
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.clientContactId, deleteDataById)
    },
    resetForm () {
      // this.formData = initContactForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.formData.clientIds = [this.record.clientId]
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
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
