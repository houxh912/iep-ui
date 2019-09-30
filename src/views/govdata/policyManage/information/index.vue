<template>
  <page-dialog :page-show="editDialogShow" :title="infoFormTitle" @close="editDialogShow=false">
    <template slot="page">
      <collapse-form ref="collapseForm" @clear="formInline=initFormInline()" @search="search()">
        <template slot="search-header">
          <el-form-item label="资讯标题:">
            <el-input placeholder="请输入资讯标题" v-model.trim="formInline.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="上传者:">
            <el-input placeholder="请输入上传者用户名" v-model="formInline.username" clearable></el-input>
          </el-form-item>
        </template>
        <template slot="search-body">
          <el-form-item label="来源:">
            <el-input placeholder="请输入来源" v-model="formInline.source" clearable></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker v-model="formInline.startTime" type="date" placeholder="开始日期" class="block" clearable></el-date-picker> —
            <el-date-picker v-model="formInline.endTime" type="date" placeholder="结束日期" class="block" clearable></el-date-picker>
          </el-form-item>
        </template>
      </collapse-form>

      <el-form :inline="true" size="small">
        <!-- <el-form-item>
          <el-button type="primary" @click="handleClickMotify()" icon="el-icon-plus">新增</el-button>
        </el-form-item> -->
        <!-- <el-form-item>
          <el-dropdown @command="handleMove">
            <el-button type="primary" icon="el-icon-rank">
              移动到<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in commadOptions" :disabled="item.value === type" :key="item.value" :command="item.value">
                <i class="el-icon-caret-right"></i> {{item.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item> -->
      </el-form>

      <crud-table :is-load-table="isLoadTable" align="left" :paged-table="pagedTable" :column-map="columnMap" :is-mutiple-selection="true" @handleSelectionChange="handleSelectionChange">
        <el-table-column prop="operation" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
            <iep-divider type="vertical" />
            <el-button @click="handleClickMotify(scope.row)" type="text" size="small" icon="el-icon-edit">修改</el-button>
            <iep-divider type="vertical" />
            <el-button @click="handleDelete(scope.row)" type="text" size="small" icon="el-icon-delete" v-if="permissionDelete">删除</el-button>
          </template>
        </el-table-column>
      </crud-table>

      <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>

      <form-dialog :dialog-show="dialogShow" :title="infoFormTitle" @close="load()" :isNeedConfirm="isNeedConfirm" width="1000px">
        <dialog-form v-if="dialogShow" :formData="form" :isReadonly="isReadonly" :isEdit="isEdit" :isHideSubmitBtn="false" @hideDialog="load()"></dialog-form>
      </form-dialog>
    </template>
  </page-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { validatenull } from '@/util/validate'
import crudTable from '@/components/deprecated/crud-table'
import collapseForm from '@/components/deprecated/collapse-form'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
import dialogForm from './dialog-form'
import { getInformationPage, deleteInformationById } from '@/api/govdata/information'
import { movePolicy } from '@/api/govdata/common'
const columnMap = [
  {
    prop: 'title',
    label: '资讯标题',
  },
  {
    prop: 'source',
    label: '来源',
    width: 140,
  },
  {
    prop: 'publishTime',
    label: '发文时间',
    type: 'time',
    width: 150,
    // sortable: 'custom',
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
    // sortable: 'custom',
  },
]
const commadOptions = [
  {
    label: '通用政策',
    value: 'general',
  },
  {
    label: '申报政策',
    value: 'declare',
  },
  {
    label: '政策解读',
    value: 'explain',
  },
  {
    label: '政策资讯',
    value: 'information',
  },
]
function initFormInline () {
  return {
    title: '',
    username: '',
    startTime: '',
    endTime: '',
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
      commadOptions,
      permissionDelete: false,
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'permissions']),

    infoFormTitle () {
      return this.isReadonly ? '查看政策资讯' : this.isEdit ? '修改政策资讯' : '新增政策资讯'
    },
    params () {
      return this.formInline
    },
  },
  created () {
    this.load()
    this.permissionDelete = this.permissions['manage_info_del']
  },
  methods: {
    /**
     * 获取政策列表数据
     */
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = false
      this.editDialogShow = false
      this.dialogShow = false
      getInformationPage({ ...params, ...pageOption }).then(res => {
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

    /**
     * 移动政策
     * @param {String} command 对应的指令
     */
    async handleMove (command) {
      if (this.mutipleSelection && this.mutipleSelection.length > 0) {
        this.isLoadTable = false
        const parmas = {
          ids: this.mutipleSelection.join(','),
          source: this.type,
          target: command,
        }
        //console.log('mmm', parmas)
        const { data } = await movePolicy(parmas)
        if (data.data) {
          this.load()
          this.$message({
            type: 'success',
            message: '移动政策成功!',
          })
        } else {
          this.isLoadTable = true
          this.$message({
            type: 'error',
            message: '移动政策失败!',
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请先选择政策。',
        })
      }
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
      //console.log(rows)
      const id = rows.id
      this._handleGlobalDeleteById([id], deleteInformationById)
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