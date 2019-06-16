<template>
  <page-dialog :page-show="editDialogShow" :title="infoFormTitle" @close="editDialogShow=false">
    <template slot="page">
      <collapse-form ref="collapseForm" @clear="formInline=initFormInline()" @search="search()">
        <template slot="search-header">
          <el-form-item label="政策名称:">
            <el-input placeholder="请输入政策名称" v-model.trim="formInline.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="上传者:">
            <el-input placeholder="请输入上传者用户名" v-model="formInline.username" clearable></el-input>
          </el-form-item>
        </template>
        <template slot="search-body">
          <el-form-item label="发布时间">
            <el-date-picker v-model="formInline.startTime" type="date" placeholder="开始日期" class="block" clearable></el-date-picker> —
            <el-date-picker v-model="formInline.endTime" type="date" placeholder="结束日期" class="block" clearable></el-date-picker>
          </el-form-item>
          <!-- 这里是循环选择器的组件 -->
          <el-form-item :label="key" v-for="(value, key) in selectFiledMap" :key="key">
            <el-select v-model="formInline[value.searchText]" :placeholder="`请选择${key}`" clearable>
              <el-option v-for="item in dictGroup[value.dictText]" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </collapse-form>

      <el-form :inline="true" size="small">
        <el-form-item>
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
        </el-form-item>
      </el-form>

      <crud-table :is-load-table="isLoadTable" align="center" :paged-table="pagedTable" :column-map="columnMap" :is-mutiple-selection="true" @handleSelectionChange="handleSelectionChange">
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

      <pagination @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption"></pagination>

      <form-dialog :dialog-show="dialogShow" :title="infoFormTitle" @close="load()" :isNeedConfirm="isNeedConfirm" width="1000px">
        <dialog-form v-if="dialogShow" :formData="form" :isReadonly="isReadonly" :isEdit="isEdit" :isHideSubmitBtn="false" @hideDialog="load()" :dictGroup="dictGroup" :selectFiledMap="selectFiledMap"></dialog-form>
      </form-dialog>
    </template>
  </page-dialog>
</template>

<script>
import _ from 'lodash'
import mixins from '@/mixins/mixins'
import { validatenull } from '@/util/validate'
import crudTable from '@/components/deprecated/crud-table'
import collapseForm from '@/components/deprecated/collapse-form'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
import multiplyMixin from '../multiply_mixin'
import dialogForm from './dialog-form'
import { getExplainPage, getExplainById, deleteExplainBatch } from '@/api/govdata/policy_analyzing'
import { movePolicy, findByTypeList } from '@/api/govdata/common'
const columnMap = [
  {
    prop: 'title',
    label: '政策名称',
  },
  {
    prop: 'publishTime',
    label: '发文时间',
    type: 'time',
    // width: 140,
    // sortable: 'custom',
  },
  {
    prop: 'creatorName',
    label: '上传者',
    // width: 140,
  },
  {
    prop: 'examineUserName',
    label: '审核人',
    // width: 140,
  },
  {
    prop: 'examineDate',
    label: '审核通过时间',
    type: 'time',
    // width: 140,
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
const selectFiledMap = {
  文体: {
    formText: 'style',
    searchText: 'style',
    dictText: 'POLICY_STYLE',
    multiple: false,
  },
  层级: {
    formText: 'level',
    searchText: 'level',
    dictText: 'POLICY_LEVEL',
    multiple: false,
  },
  申报方式: {
    formText: 'method',
    searchText: 'method',
    dictText: 'DECLARE_METHOD',
    multiple: false,
  },
  专项分类: {
    formText: 'special',
    searchText: 'special',
    dictText: 'DECLARE_SPECIAL',
    multiple: false,
  },
  申报状态: {
    formText: 'status',
    searchText: 'status',
    dictText: 'DECLARE_STATUS',
    multiple: false,
  },
  主题: {
    formText: 'theme',
    searchText: 'theme',
    dictText: 'POLICY_THEME',
    multiple: true,
  },
  适用规模: {
    formText: 'scale',
    searchText: 'scale',
    dictText: 'POLICY_SCALE',
    multiple: true,
  },
  适用行业: {
    formText: 'industry',
    searchText: 'industry',
    dictText: 'POLICY_INDUSTRY',
    multiple: true,
  },
  扶持方式: {
    formText: 'mode',
    searchText: 'mode',
    dictText: 'DECLARE_MODE',
    multiple: true,
  },
  扶持形式: {
    formText: 'formality',
    searchText: 'formality',
    dictText: 'DECLARE_FORMALITY',
    multiple: true,
  },
  支持方式: {
    formText: 'support',
    searchText: 'support',
    dictText: 'DECLARE_SUPPORT',
    multiple: true,
  },
  扶持资金规模: {
    formText: 'fund',
    searchText: 'fund',
    dictText: 'DECLARE_FUND',
    multiple: true,
  },
  申报对象: {
    formText: 'target',
    searchText: 'target',
    dictText: 'DECLARE_TARGET',
    multiple: true,
  },
}
const typeList = []
for (const key in selectFiledMap) {
  if (selectFiledMap.hasOwnProperty(key)) {
    const element = selectFiledMap[key]
    typeList.push(element.dictText)
  }
}
function initForm () {
  return {
    mode: [],
    formality: [],
    support: [],
    fund: [],
    target: [],
    theme: [],
    scale: [],
    industry: [],
    regionArr: [],
  }
}
function initDictGroup () {
  const dictGroup = {}
  for (const key in selectFiledMap) {
    if (selectFiledMap.hasOwnProperty(key)) {
      const element = selectFiledMap[key]
      dictGroup[element.dictText] = []
    }
  }
  return dictGroup
}
export default {
  mixins: [mixins, dialogMixins, paginationMixins, multiplyMixin],
  components: { crudTable, collapseForm, dialogForm },
  data () {
    return {
      id: '',
      type: 'declare',
      columnMap,
      selectFiledMap,
      formInline: {},
      dictGroup: initDictGroup(),
      form: initForm(),
      isEdit: true,
      isReadonly: false,
      isNeedConfirm: true,
      commadOptions,
    }
  },
  computed: {
    infoFormTitle () {
      return this.isReadonly ? '查看申报类政策' : this.isEdit ? '修改申报类政策' : '新增申报类政策'
    },
    params () {
      return this.formInline
    },
  },
  created () {
    this.load()
    this.loadDict()
  },
  methods: {
    /**
     * 获取获取层级、适用对象、主题、规模、行业数据
     */
    loadDict () {
      // findByTypeList({ typeList: numberList }).then(res => {
      //console.log(typeList)
      findByTypeList(typeList).then(res => {
        const { data } = res
        const dictGroup = initDictGroup()
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key]
            dictGroup[key] = element.map(m => {
              return { label: m.value, value: m.key }
            })
          }
        }
        this.$set(this, 'dictGroup', dictGroup)
      })
    },

    /**
     * 获取政策列表数据
     */
    async load (pageOption = this.pageOption, params = {...this.params}) {
      this.isLoadTable = false
      this.editDialogShow = false
      this.dialogShow = false
      //加码
      params.title = params.title ? encodeURIComponent(params.title) : ''
      const res = await getExplainPage({ ...params, ...pageOption })

      const { data } = res
      // console.log('mmm', res)
      let { records } = data
      records = records.map(m => {
        return {
          ...m,
          dispatchsList: m.dispatchList[0] ? _.map(m.dispatchList, 'commonName').join('，') : '暂无',
        }
      })
      data.records = records
      this.loadTable(data)
    },

    readRelation (rows) {
      const { dispatchList, unionList, formality, fund, industry, mode, scale, support, target, theme, tagList, policyList } = rows
      // file
      rows.attachments = validatenull(rows.file) ? null : [{
        name: rows.file.match(/([^/]*)$/)[1],
        url: rows.file,
      }]
      // 字典组
      this.$set(rows, 'formality', this.decodeSplitStr(formality))
      this.$set(rows, 'fund', this.decodeSplitStr(fund))
      this.$set(rows, 'industry', this.decodeSplitStr(industry))
      this.$set(rows, 'mode', this.decodeSplitStr(mode))
      this.$set(rows, 'scale', this.decodeSplitStr(scale))
      this.$set(rows, 'scale', this.decodeSplitStr(scale))
      this.$set(rows, 'support', this.decodeSplitStr(support))
      this.$set(rows, 'target', this.decodeSplitStr(target))
      this.$set(rows, 'theme', this.decodeSplitStr(theme))
      // 发文单位
      if (dispatchList) {
        rows.dispatchList = dispatchList.map(m => m.commonId)
        rows.dispatchsList = dispatchList.map(m => {
          return { id: m.commonId, name: m.commonName }
        })
      }
      // 联合发文单位
      if (unionList) {
        rows.unionList = unionList.map(m => m.commonId)
        rows.unionsList = unionList.map(m => {
          return { id: m.commonId, name: m.commonName }
        })
      }
      // 政策依据
      if (policyList) {
        rows.policyList = policyList.map(m => m.commonId)
        rows.policysList = policyList.map(m => {
          return { id: m.commonId, title: m.commonName }
        })
      }
      // 标签
      rows.tagsList = this._mapPickTagIdName(tagList)
      rows.tagList = rows.tagsList.map(m => m.name)
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
        // console.log('mmm', parmas)
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
      // this.readRelation(rows)
      // this.form = { ...rows }
      // this.isReadonly = true
      // this.isNeedConfirm = false
      // this.dialogShow = true
      getExplainById(rows.id).then(res => {
        const row = res.data
        this.readRelation(row)
        this.form = { ...row }
        this.isReadonly = true
        this.isNeedConfirm = false
        this.dialogShow = true
      })
    },

    /**
     * 修改按钮
     */
    handleClickMotify (rows) {
      // this.isEdit = true
      // this.readRelation(rows)
      // this.form = { ...rows }
      // this.isReadonly = false
      // this.isNeedConfirm = false
      // this.dialogShow = true
      getExplainById(rows.id).then(res => {
        console.log('kkk', res)
        const row = res.data
        this.readRelation(row)
        this.form = { ...row }
        this.isEdit = true
        this.isReadonly = false
        this.isNeedConfirm = false
        this.dialogShow = true
      })
    },

    /**
     * 删除按钮
     */
    handleDelete (rows) {
      console.log(rows)
      const id = rows.id
      this._handleGlobalDeleteById([id], deleteExplainBatch)
    },
  },
}
</script>
