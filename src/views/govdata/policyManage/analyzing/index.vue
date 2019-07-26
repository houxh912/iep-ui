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

        <!-- <el-form-item>
          <el-button type="primary" @click="handleClickMotify()" icon="el-icon-plus">新增</el-button>
        </el-form-item> -->
      </el-form>

      <crud-table class="table-con" :is-load-table="isLoadTable" align="left" :paged-table="pagedTable" :column-map="columnMap" :is-mutiple-selection="true" @handleSelectionChange="handleSelectionChange">
        <el-table-column prop="operation" align="left" label="操作" width="220">
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
        <dialog-form v-if="dialogShow" :formData="form" :isReadonly="isReadonly" :isEdit="isEdit" :isHideSubmitBtn="false" @hideDialog="load()" :dictGroup="dictGroup" :selectFiledMap="selectFiledMap" :btnTxt="btnTxt"></dialog-form>
      </form-dialog>
    </template>
  </page-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
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
const selectFiledMap = {
  层级: {
    formText: 'level',
    searchText: 'level',
    dictText: 'POLICY_LEVEL',
    multiple: false,
  },
  解读主体: {
    formText: 'main',
    searchText: 'main',
    dictText: 'POLICY_MAIN',
    multiple: false,
  },
  主题: {
    formText: 'theme',
    searchText: 'theme',
    dictText: 'POLICY_THEME',
    multiple: true,
  },
  适用行业: {
    formText: 'industry',
    searchText: 'industry',
    dictText: 'POLICY_INDUSTRY',
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
    title: '',
    tagList: [],
    publishTime: '',
    source: '',
    url: '',
    regionArr: [],
    priority: '',
    level: '',
    main: '',
    summary: '',
    theme: [],
    industry: [],
    text: '',
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

function initFormInline () {
  return {
  }
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
      initFormInline,
      formInline: initFormInline(),
      dictGroup: initDictGroup(),
      form: initForm(),
      isEdit: true,
      isReadonly: false,
      isNeedConfirm: true,
      commadOptions,
      btnTxt: '',
      permissionDelete: false,
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'permissions']),

    infoFormTitle () {
      return this.isReadonly ? '查看政策解读' : this.isEdit ? '修改政策解读' : '新增政策解读'
    },
    params () {
      return this.formInline
    },
  },
  created () {
    this.load()
    this.loadDict()
    this.permissionDelete = this.permissions['manage_explain_del']
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
              return { label: m.label, value: m.value }
            })
          }
        }
        this.$set(this, 'dictGroup', dictGroup)
      })
    },

    /**
     * 获取政策列表数据
     */
    async load (pageOption = this.pageOption, params = { ...this.params }) {
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
          organizationsList: m.organizationList[0] ? _.map(m.organizationList, 'commonName').join('，') : '暂无',
        }
      })
      data.records = records
      this.loadTable(data)
    },

    readRelation (rows) {
      const { organizationList, industry, theme } = rows
      // file
      rows.attachments = validatenull(rows.file) ? null : [{
        name: rows.file.match(/([^/]*)$/)[1],
        url: rows.file,
      }]
      rows.industry = this.decodeSplitStr(industry)
      rows.theme = this.decodeSplitStr(theme)
      // 关联机构
      rows.organizationList = organizationList.map(m => m.commonId)
      rows.organizationsList = organizationList.map(m => {
        return { id: m.commonId, name: m.commonName }
      })
      // 标签
      rows.tagsList = this._mapPickTagIdName(rows.tagList)
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
      this.isReadonly = false
      if (rows === undefined) {
        this.form = initForm()
        this.isEdit = false
        this.btnTxt = '提交'
        this.dialogShow = true
      }
      else {
        this.isEdit = true
        this.btnTxt = '暂存'
        getExplainById(rows.id).then(res => {
          const row = res.data
          this.readRelation(row)
          this.form = { ...row }
          this.isNeedConfirm = false
          if (rows.condition == null) {
            this.form.condition = ''
          }
          if (rows.standard == null) {
            this.form.standard = ''
          }
          if (rows.process == null) {
            this.form.process = ''
          }
          if (rows.requirement == null) {
            this.form.requirement = ''
          }
          this.dialogShow = true
        })
      }
    },

    /**
     * 删除按钮
     */
    handleDelete (rows) {
      // console.log(rows)
      const id = rows.id
      this._handleGlobalDeleteById([id], deleteExplainBatch)
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