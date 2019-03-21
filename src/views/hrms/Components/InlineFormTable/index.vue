<template>
  <div>
    <el-table :data="data" style="width: 100%" border size="small">
      <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columns" :key="idx">
        <template slot-scope="scope">
          <el-input v-if="scope.row.editable" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label"></el-input>
          <template v-else>{{ scope.row[item.prop] }}</template>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <span v-if="scope.row.isNew">
              <iep-button type="text" size="mini" @click="saveRow(scope.row.id)">添加</iep-button>
              <el-popover title="是否要删除此行？">
                <div style="text-align: right; margin: 0">
                  <iep-button size="mini" type="text">取消</iep-button>
                  <iep-button type="text" size="mini" @click="remove(scope.row.id)">确定</iep-button>
                </div>
                <iep-button type="text" size="mini" slot="reference">删除</iep-button>
              </el-popover>
            </span>
            <span v-else>
              <iep-button type="text" size="mini" @click="saveRow(scope.row.id)">添加</iep-button>
              <iep-button type="text" size="mini" @click="cancel(scope.row.id)">取消</iep-button>
            </span>
          </template>
          <span v-else>
            <iep-button type="text" size="mini" @click="toggle(scope.row.id)">编辑</iep-button>
            <el-popover placement="top" width="160">
              <p>是否要删除此行？</p>
              <div style="text-align: right; margin: 0">
                <iep-button size="mini" type="text">取消</iep-button>
                <iep-button type="text" size="mini" @click="remove(scope.row.id)">确定</iep-button>
              </div>
              <iep-button type="text" size="mini" slot="reference">删除</iep-button>
            </el-popover>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <iep-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" icon="el-icon-plus" @click="newMember" plain>新增</iep-button>
  </div>
</template>
<script>
import { post, put, del } from './inline'
export default {
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    requestName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rid: {
      type: [Number, String],
      required: true,
    },
  },
  data () {
    return {
      data: [],
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.data = this.tableData.map(m => {
        return {
          ...m,
          editable: false,
          isNew: false,
        }
      })
    },
    newMember () {
      const length = this.data.length
      const newObj = {}
      this.columns.forEach(m => {
        newObj[m.prop] = ''
      })
      this.data.push({
        id: length ? (parseInt(this.data[length - 1].id) + 1).toString() : '0',
        ...newObj,
        editable: true,
        isNew: true,
      })
    },
    saveRow (id) {
      const target = this.data.filter(item => item.id === id)[0]
      if (target.isNew) {
        post(target, this.requestName, this.type, this.rid).then(() => {
          this.$message({
            message: '添加成功',
            type: 'success',
          })
          this.$emit('load-page')
          console.log('load-page')
        })
      } else {
        put(target, this.requestName).then(() => {
          this.$message({
            message: '修改成功',
            type: 'success',
          })
          this.$emit('load-page')
        })
      }
      target.editable = false
      target.isNew = false
    },
    remove (id) {
      const newData = this.data.filter(item => item.id !== id)
      del(id, this.requestName).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success',
        })
      })
      this.data = newData
    },
    cancel (id) {
      const target = this.data.filter(item => item.id === id)[0]
      target.editable = false
    },
    toggle (id) {
      const target = this.data.filter(item => item.id === id)[0]
      target.editable = !target.editable
    },
  },
  watch: {
    tableData () {
      this.initData()
    },
  },
}
</script>
