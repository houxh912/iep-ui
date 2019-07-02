<template>
  <iep-dialog :dialog-show="dialogShow" title="字典子项" width="700" @close="close">
    <iep-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px;" @click="handleEdit()">添 加</iep-button>
    <iep-table :isLoadTable="isLoadTable" :columnsMap="columnsMap" :pagedTable="pagedTable" :is-pagination="false" is-tree>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link v-if="scope.row._level <= 1" icon="el-icon-plus" @click="handleEdit(scope.row, scope.index, true)">子项</el-link>
          <el-link icon="el-icon-edit" @click="handleEdit(scope.row, scope.index)">编辑</el-link>
          <el-link icon="el-icon-delete" @click="handleDel(scope.row, scope.index)">删除</el-link>
        </template>
      </el-table-column>
    </iep-table>
    <child-dialog-form ref="ChildDialogForm" @load-page="loadPage"></child-dialog-form>
  </iep-dialog>
</template>
<script>
import { _initRow } from './options'
import { getChild, deleteChildById } from '@/api/admin/dict'
import ChildDialogForm from './ChildDialogForm'
export default {
  components: { ChildDialogForm },
  data () {
    return {
      id: 1,
      methodName: '添加',
      dialogShow: false,
      pagedTable: [],
      columnsMap: [
        {
          label: 'ID',
          prop: 'id',
          width: 100,
        },
        {
          label: '字典值',
          prop: 'value',
        },
        {
          label: '字典名',
          prop: 'label',
        },
        {
          label: '排序',
          prop: 'sort',
          width: 100,
        },
      ],
      isLoadTable: false,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    close () {
      this.pagedTable = []
      this.dialogShow = false
    },
    loadPage () {
      this.isLoadTable = true
      getChild(this.id).then(({ data }) => {
        this.pagedTable = data.data
        this.isLoadTable = false
      })
    },
    handleEdit (row, index, isChild) {
      const { ChildDialogForm } = this.$refs
      if (row) {
        ChildDialogForm.form = this.$mergeByFirst(_initRow(this.id), row)
        ChildDialogForm.methodName = '修改'
      } else {
        ChildDialogForm.form = _initRow(this.id)
        ChildDialogForm.methodName = '添加'
      }
      if (isChild) {
        ChildDialogForm.form = _initRow(this.id)
        ChildDialogForm.methodName = `添加至<${row.label}>`
        ChildDialogForm.form.parentId = row.id
      }
      ChildDialogForm.dialogShow = true
    },
    handleDel (row) {
      deleteChildById(row.id).then(() => {
        this.loadPage()
      })
    },
  },
}
</script>
