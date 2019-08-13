<template>
  <page-dialog :page-show="editDialogShow" :title="infoFormTitle" @close="editDialogShow=false">
    <template slot="page">
      <collapse-form ref="collapseForm" @clear="formInline=initFormInline()" @search="search()">
        <template slot="search-header">
          <el-form-item label="政策标题:">
            <el-input placeholder="请输入政策标题" v-model.trim="formInline.description" clearable></el-input>
          </el-form-item>
        </template>
      </collapse-form>

      <el-form :inline="true" size="small">
        <el-form-item>
          <el-button type="primary" @click="handleClickMotify()" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form>

      <crud-table :is-load-table="isLoadTable" align="left" :paged-table="pagedTable" :column-map="columnMap" :is-mutiple-selection="true" @handleSelectionChange="handleSelectionChange">
        <el-table-column prop="operation" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
            <iep-divider type="vertical" />
            <el-button @click="handleClickMotify(scope.row)" type="text" size="small" icon="el-icon-edit">修改</el-button>
            <iep-divider type="vertical" />
            <el-button @click="handleDelete(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </crud-table>

      <pagination @handleSizeChange=" handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption">
      </pagination>

      <form-dialog :dialog-show="dialogShow" :title="infoFormTitle" @close="load()" :isNeedConfirm="isNeedConfirm" width="800px">
        <dialog-form v-if="dialogShow" :formData="form" :isReadonly="isReadonly" :isEdit="isEdit" :isHideSubmitBtn="false" @hideDialog="load()"></dialog-form>
      </form-dialog>
    </template>
  </page-dialog>
</template>

<script>
import mixins from '@/mixins/mixins'
import { validatenull } from '@/util/validate'
import crudTable from '@/components/deprecated/crud-table'
import collapseForm from '@/components/deprecated/collapse-form'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
import dialogForm from './dialog-form'
import { getPacketPage, deletePacket } from '@/api/govdata/policy_packet'
const columnMap = [
  {
    prop: 'title',
    label: '政策标题',
  },
  {
    prop: 'source',
    label: '来源',
    width: 140,
  },
  {
    prop: 'publishTime',
    label: '发布时间',
    type: 'time',
    width: 150,
  },
  {
    prop: 'creatorName',
    label: '上传者',
    width: 100,
  },
  {
    prop: 'examineUserName',
    label: '审核人',
    width: 100,
  },
  {
    prop: 'examineDate',
    label: '审核通过时间',
    type: 'time',
    width: 150,
  },
]
function initFormInline () {
  return {
    description: '',
    // username: '',
    // startTime: '',
    // endTime: '',
  }
}
function initForm () {
  return {
    title: '',
    tagList: [],
    publishTime: '',
    source: '',
    url: '',
    regionArr: [],
    priority: 0,
    summary: '',
    text: '',
  }
}
export default {
  mixins: [mixins, dialogMixins, paginationMixins],
  components: { crudTable, collapseForm, dialogForm },
  data () {
    return {
      id: '',
      type: 'information',
      columnMap,
      // formInline: {},
      initFormInline,
      formInline: initFormInline(),
      form: initForm(),
      isEdit: true,
      isReadonly: false,
      isNeedConfirm: true,
      permissionDelete: false,
      pageOptions:{
        current: 1,
        size: 10,
      },
    }
  },
  computed: {
    infoFormTitle () {
      return this.isReadonly ? '查看政策红包' : this.isEdit ? '修改政策红包' : '新增政策红包'
    },
    params () {
      return this.formInline
    },
  },
  created () {
    this.load()
  },
  methods: {
    /**
     * 获取政策列表数据
     */
    load (pageOption = this.pageOptions, params = this.params) {
      console.log('dd',pageOption)
      this.isLoadTable = false
      this.editDialogShow = false
      this.dialogShow = false
      getPacketPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },

    readRelation (rows) {
      const { tagList } = rows
      // file
      rows.attachments = validatenull(rows.file) ? null : [{
        name: rows.file.match(/([^/]*)$/)[1],
        url: rows.file,
      }]
      // 标签
      rows.tagsList = this._mapPickTagIdName(tagList)
      rows.tagList = rows.tagsList.map(m => m.name)
      return rows
    },

    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },

    /**
     * 查看按钮
     */
    handleView (rows) {
      this.readRelation(rows)
      this.form = { ...rows }
      this.isReadonly = true
      this.isNeedConfirm = false
      this.dialogShow = true
    },

    /**
     * 修改按钮
     */
    handleClickMotify (rows) {
      this.isReadonly = false
      this.dialogShow = true
      if (rows === undefined) {
        this.isEdit = false
        this.form = initForm()
      } else {
        this.isEdit = true
        this.isNeedConfirm = false
        this.readRelation(rows)
        this.form = { ...rows }
      }
    },

    /**
     * 删除按钮
     */
    handleDelete (rows) {
      const id = rows.id
      this._handleGlobalDeleteById([id], deletePacket)
    },

  },
}
</script>

<style scoped>
.btn {
  margin-right: -5px;
}
.table-con >>> .cell span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>