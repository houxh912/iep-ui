<template>
  <div>
    <el-table :data="data" style="width: 100%" border size="small">
      <el-table-column :label="item.label" :width="item.width" v-for="(item, idx) in columns" :key="idx">
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <iep-date-picker v-if="item.type === 'date'" type="date" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-date-picker>
            <iep-date-range-select v-else-if="item.type === 'daterange'" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-date-range-select>
            <iep-upload-select v-else-if="item.type === 'file'" size="mini" v-model="scope.row[item.prop]"></iep-upload-select>
            <iep-dict-select v-else-if="item.type === 'dict'" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" :dict-name="item.dictName"></iep-dict-select>
            <iep-input-area v-else-if="item.type === 'area'" :maxlength="1000" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" :autosize="{minRows: 1}"></iep-input-area>
            <iep-select v-else-if="item.type === 'list'" size="mini" :prefixUrl="item.prefixUrl" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-select>
            <el-upload v-else-if="item.type === 'avatar'" class="avatar-uploader" action="/api/admin/file/upload/avatar" :show-file-list="false" :headers="headers" :on-success="(response, file, fileList)=>{return handleAvatarSuccess(response, file, fileList,scope.$index)}" accept="image/*">
              <iep-img v-if="scope.row[item.prop]" :src="scope.row[item.prop]" class="avatar"></iep-img>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-input v-else :maxlength="100" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" clearable></el-input>
          </template>
          <template v-else>
            <iep-dict-detail v-if="item.type === 'dict'" size="mini" :value="scope.row[item.prop]" :dict-name="item.dictName"></iep-dict-detail>
            <iep-date-range-select v-else-if="item.type === 'daterange'" size="mini" v-model="scope.row[item.prop]" :placeholder="item.label" disabled></iep-date-range-select>
            <iep-upload-select v-else-if="item.type === 'file'" size="mini" :value="scope.row[item.prop]" disabled></iep-upload-select>
            <iep-div-detail v-else-if="item.type === 'date'" :value="scope.row[item.prop] | parseToDay"></iep-div-detail>
            <iep-select v-else-if="item.type === 'list'" size="mini" disabled :prefixUrl="item.prefixUrl" v-model="scope.row[item.prop]" :placeholder="item.label"></iep-select>
            <iep-img v-else-if="item.type === 'avatar'" :src="scope.row[item.prop]" class="avatar"></iep-img>
            <iep-div-detail v-else :value="scope.row[item.prop]"></iep-div-detail>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.editable">
            <span v-if="scope.row.isNew">
              <iep-button type="text" size="mini" @click="saveRow(scope.row.id)">保存</iep-button>
              <iep-divider type="vertical" />
              <a-popconfirm title="是否要删除此数据？" okText="确认" cancelText="取消" @confirm="remove(scope.row.id)">
                <iep-button type="text" size="mini">删除</iep-button>
              </a-popconfirm>
            </span>
            <span v-else>
              <iep-button type="text" size="mini" @click="saveRow(scope.row.id)">更新</iep-button>
              <iep-divider type="vertical" />
              <iep-button type="text" size="mini" @click="cancel(scope.row.id)">取消</iep-button>
            </span>
          </template>
          <span v-else>
            <iep-button v-if="!(onlyLastCanEdit && columns.length-1 === idx)" type="text" size="mini" @click="toggle(scope.row.id)">编辑</iep-button>
            <iep-divider type="vertical" />
            <a-popconfirm title="是否要删除此数据？" okText="确认" cancelText="取消" @confirm="remove(scope.row.id)">
              <iep-button type="text" size="mini">删除</iep-button>
            </a-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <iep-button v-if="!onlyLastCanEdit" style="width: 100%; margin-top: 5px; margin-bottom: 8px" icon="el-icon-plus" @click="newMember" plain>新增</iep-button>
  </div>
</template>
<script>
import { post, put, del } from './inline'
import store from '@/store'
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
    onlyLastCanEdit: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      data: [],
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
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
        post(target, this.requestName, this.type, this.rid).then(({ data }) => {
          if (data.data) {
            this.$emit('load-page')
          } else {
            this.$message(data.msg)
            this.initData()
          }
        })
      } else {
        put(target, this.requestName).then(({ data }) => {
          if (data.data) {
            this.$emit('load-page')
          } else {
            this.$message(data.msg)
            this.initData()
          }
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
    handleAvatarSuccess (response, file, fileList, val) {
      this.data[val].annex = response.data.url
      console.log(file, fileList, val)
    },
  },
  watch: {
    tableData () {
      this.initData()
    },
  },
}
</script>
