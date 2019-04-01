<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button size="small" type="danger" @click="handleAdd"><i class="el-icon-plus"></i> 新增一级分类</iep-button>
        <el-dropdown size="medium">
          <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><div @click="handleDeletetByIds">删除</div></el-dropdown-item>
            <el-dropdown-item @click.native="handleExport">导出</el-dropdown-item>
            <el-dropdown-item @click.native="handleDownloadAll">下载</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </operation-container>
    <iep-table-tree :data="tableData" :option="columnsMap" @handleChild="handleChild" @selectChange="selectChange">
      <template #levelName="{scope, index}">
        <el-input v-model="formData.levelName" v-if="index===selectIndex"></el-input>
        <div v-else>{{scope.levelName}}</div>
      </template>
      <template #sort="{scope, index}">
        <el-input v-model="formData.sort" v-if="index===selectIndex"></el-input>
        <div v-else>{{scope.sort}}</div>
      </template>
      <template #createTime="scope">
        {{scope.scope.createTime}}
      </template>
      <template #menu="{ scope, index }">
        <div class="operation-wrapper">
          <iep-button v-if="index===selectIndex" @click="handleSubmit">保存</iep-button>
          <iep-button @click="handleEdit(scope, index)" v-else>编辑</iep-button>
          <iep-button v-if="index===selectIndex" @click="handleCancel(scope)">取消</iep-button>
          <iep-button @click="handleDeleteById(scope, index)" v-else>删除</iep-button>
        </div>
      </template>
    </iep-table-tree>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap, initFormData } from './option'
import { getTableData, createData, updateData, deleteDate } from '@/api/mlms/material/datum/configure'
import IepTableTree from './IepTableTree'

export default {
  mixins: [mixins],
  components: { IepTableTree },
  computed: {  },
  data () {
    return {
      dictsMap,
      tableData: [],
      columnsMap: tableOption,
      index: 1,
      selectIndex: -1,
      formData: initFormData(),
    }
  },
  methods: {
    // 新增
    handleAdd () {
      this.tableData.push({
        levelName: '',
        sort: '',
        createTime: '',
      })
      this.selectIndex = this.tableData.length-1
      this.formData = initFormData()
    },
    // 编辑
    handleEdit (row, index) {
      this.selectIndex = index
      this.formData = {...row}
    },
    // 取消
    handleCancel (row) {
      if (!row.id) {
        if (typeof this.selectIndex === 'number') {
          this.tableData.splice(this.tableData.length-1, 1)
        } else {
          let index = this.selectIndex.indexOf('-')
          this.tableData[this.selectIndex.slice(0, index)].childrens.splice(this.selectIndex.slice(index+1), 1)
        }
      }
      this.selectIndex = -1
    },
    // 保存
    handleSubmit () {
      let fn = this.formData.id ? updateData : createData
      fn(this.formData).then(() => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000,
        })
        this.handleCancel({})
        this.loadPage()
      })
    },
    // 新增子级
    handleChild (row) {
      this.formData = {
        parentId: row.row.id,
        levelName: '',
        sort: '',
        createTime: '',
      }
      this.tableData[row.$index].childrens.push(this.formData)
      this.selectIndex = `${row.$index}-${this.tableData[row.$index].childrens.length-1}`
    },
    // 删除
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteDate)
    },
    // 批量删除
    handleDeletetByIds () {
      this._handleGlobalAll(deleteDate)
    },
    selectChange (val) {
      this.multipleSelection = val
    },
    loadPage (param) {
      this.isLoadTable = true
      getTableData({ ...param, ...this.pageOption }).then(({ data }) => {
        const { records, size, total, current } = data.data
        this.pagination = { current, size, total }
        this.tableData = records.map(m => m)
        this.isLoadTable = false
      })
    },
    // 批量导出
    handleExport () {
      this.$message.error('抱歉，此功能尚未开发')
    },
    // 批量下载
    handleDownloadAll () {
      this.$message.error('抱歉，此功能尚未开发')
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.operation-wrapper {
  button {
    margin-right: 5px;
  }
}
.more-icon {
  display: flex;
  div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    cursor: pointer;
  }
  div:hover {
    background-color: #d6d6d6;
  }
  .more-icon-3, .more-icon-4 {
    font-size: 22px;
  }
  .more-icon-2, .more-icon-3 {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);		/* IE 9 */
    -webkit-transform: rotate(180deg);	/* Safari and Chrome */
    -o-transform: rotate(180deg);		/* Opera */
    -moz-transform: rotate(180deg);
  }
}
</style>
