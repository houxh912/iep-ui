<template>
  <avue-tree-table :option="options">
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button v-if="scope.row._level <= 1" type="text" icon="el-icon-plus" size="mini" @click="handleChild(scope.row,scope.index)">子项
        </el-button>
        <el-button type="text" icon="el-icon-check" size="mini" @click="handleEdit(scope.row,scope.index)">编辑
        </el-button>
        <el-button type="text" icon="el-icon-delete" size="mini" @click="handleDel(scope.row,scope.index)">删除
        </el-button>
      </template>
    </el-table-column>
  </avue-tree-table>
</template>
<script>
import { getChild } from '@/api/admin/dict'
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
      data: [],
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
    getChild(this.id).then(({ data }) => {
      this.data = data.data
    })
  }
}
</script>
<style lang="scss" scoped>
</style>

