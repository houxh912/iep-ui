<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px;" @click="handleEdit()">添 加</el-button>
    <avue-tree-table :option="options">
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row._level <= 1" type="text" icon="el-icon-plus" size="mini" @click="handleEdit(scope.row, scope.index, true)">子项
          </el-button>
          <el-button type="text" icon="el-icon-check" size="mini" @click="handleEdit(scope.row,scope.index)">编辑
          </el-button>
          <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row,scope.index)">删除
          </el-button>
        </template>
      </el-table-column>
    </avue-tree-table>
    <el-dialog :title="title" :visible.sync="dialogChildVisible" append-to-body>
      <avue-form ref="form" v-model="row" :option="option" @submit="handleSubmit"></avue-form>
    </el-dialog>
  </div>
</template>
<script>
import { getChild, postChild, putChild, deleteChildById } from '@/api/admin/dict'
function initRow () {
  return {
    id: null,
    label: '',
    value: ''
  }
}
export default {
  props: {
    currentId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      id: this.currentId,
      title: '添加',
      option: {
        emptyBtn: true,
        submitBtn: true,
        column: [{
          label: "字典编码",
          prop: "value",
          rules: [{
            required: true,
            message: "请输入字典编码",
            trigger: "blur"
          }]
        }, {
          label: "字典名称",
          prop: "label",
          rules: [{
            required: true,
            message: "请输入字典名称",
            trigger: "blur"
          }]
        }]
      },
      dialogChildVisible: false,
      data: [],
      row: initRow()
    }
  },
  computed: {
    options () {
      return {
        expandAll: false,
        columns: [
          {
            text: 'ID',
            value: 'id',
            width: 100
          },
          {
            text: '字典编码',
            value: 'value'
          },
          {
            text: '字典名称',
            value: 'label'
          },
          {
            text: '排序',
            value: 'sort',
            width: 100
          }
        ],
        data: this.data
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getChild(this.id).then(({ data }) => {
        this.data = data.data
      })
    },
    handleSubmit (row) {
      console.log(row)
      let submitChild = null
      if (row.id) {
        submitChild = putChild
      } else {
        submitChild = postChild
      }
      submitChild(row).then(({ data }) => {
        console.log(data)
        this.getList()
      })
    },
    handleEdit (row, index, isChild) {
      if (row) {
        this.row = { ...row }
        this.title = '修改'
      } else {
        this.row = initRow()
        this.title = '添加'
      }
      if (isChild) {
        this.row = initRow()
        this.title = `添加至<${row.label}>`
        this.row.parentId = row.id
      }
      this.dialogChildVisible = true
    },
    handleDel (row, index) {
      deleteChildById(row.id).then(() => {
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

