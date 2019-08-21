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
        <el-table-column prop="status" label="发布状态" width="100">
          <template slot-scope="scope">
            <el-tag type="info" size="small" v-if="scope.row.status === 0">未发布</el-tag>
            <el-tag size="success" v-if="scope.row.status === 1">已发布</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
            <iep-divider type="vertical" />
            <el-button @click="handleClickMotify(scope.row)" type="text" size="small" icon="el-icon-edit" v-if="scope.row.status === 0">修改</el-button>
            <iep-divider type="vertical" />
            <el-button @click="handleDelete(scope.row)" type="text" size="small" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </crud-table>

      <pagination @handleSizeChange=" handleSizeChange" @handleCurrentChange="handleCurrentChange" :pagination-option="paginationOption">
      </pagination>

      <form-dialog :dialog-show="dialogShow" :title="infoFormTitle" @close="load()" :isNeedConfirm="isNeedConfirm" width="1000px">
        <dialog-form v-if="dialogShow" :formData="form" :isAdd="isAdd" :isReadonly="isReadonly" :isEdit="isEdit" :isHideSubmitBtn="false" @hideDialog="load()"></dialog-form>
      </form-dialog>
    </template>
  </page-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
// import { validatenull } from '@/util/validate'
import crudTable from '@/components/deprecated/crud-table'
import collapseForm from '@/components/deprecated/collapse-form'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import paginationMixins from '@/mixins/deprecated/pagination_mixins'
import dialogForm from './dialog-form'
import { getPacketPage, getPacketById, deletePacket } from '@/api/govdata/policy_packet'
const columnMap = [
  {
    prop: 'description',
    label: '红包简介',
  },
  {
    prop: 'totalAmount',
    label: '红包总量',
    width: 140,
  },
  {
    prop: 'remainAmount',
    label: '红包剩余数量',
    width: 150,
  },
  {
    prop: 'createTime',
    label: '创建时间',
    type: 'time',
    width: 140,
  },
  {
    prop: 'modifiedTime',
    label: '修改时间',
    type: 'time',
    width: 150,
  },
]
function initFormInline () {
  return {
    description: '',
  }
}
function initForm () {
  return {
    description: '',
    relationList: [],
    remainAmount: [],
    totalAmount: [],
  }
}
export default {
  mixins: [mixins, dialogMixins, paginationMixins],
  components: { crudTable, collapseForm, dialogForm },
  data () {
    return {
      // id: '',
      // type: 'information',
      createUser: '',
      modifiedUser: '',
      columnMap,
      initFormInline,
      formInline: initFormInline(),
      form: initForm(),
      isAdd: false,
      isEdit: true,
      isReadonly: false,
      isNeedConfirm: true,
      pageOption: {
        current: 1,
        size: 10,
      },
      dataList: {

      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),

    infoFormTitle () {
      return this.isReadonly ? '查看政策红包' : this.isEdit ? '修改政策红包' : '新增政策红包'
    },
    params () {
      return this.formInline
    },
  },
  created () {
    this.load()
    this.information()
  },
  methods: {
    information () {
      this.createUser = this.userInfo.userId
      this.modifiedUser = this.userInfo.userId
    },

    /**
     * 获取政策列表数据
     */
    load (pageOption = this.pageOption, params = this.params) {
      this.isLoadTable = false
      this.editDialogShow = false
      this.dialogShow = false
      getPacketPage({ ...params, ...pageOption }).then(res => {
        const { data } = res
        this.loadTable(data)
      })
    },

    readRelation (rows) {
      const { relationList } = rows

      // const { relationList } = rows
      // 联合发文单位
      // rows.dispatchList = dispatchList.map(m => m.commonId)
      // rows.dispatchsList = dispatchList.map(m => {
      //   return { id: m.commonId, name: m.commonName }
      // })

      //关联政策
      rows.relation = relationList
      rows.relationList = relationList.map(m => m.policyId)
      rows.relationPolicyList = relationList.map(m => {
        return { id: m.policyId, name: m.title, type: m.policyType }
      })
      console.log('row.relation', rows.relationPolicyList)

      // rows.relationList = relationList.map(m => m.policyId)
      // rows.relationPolicyList = relationList.map(m => {
      //   return { id: m.policyId, name: m.title }
      // })
      return rows
    },

    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.id)
    },

    /**
     * 查看按钮
     */
    handleView (rows) {
      this.isAdd = false
      this.isReadonly = true
      this.isNeedConfirm = false
      getPacketById(rows.id).then(res => {
        const row = res.data.data
        this.readRelation(row)
        this.form = { ...row }
        this.dialogShow = true
      })
    },

    /**
     * 修改按钮
     */
    handleClickMotify (rows) {
      this.isReadonly = false
      if (rows === undefined) {
        this.isAdd = true
        this.isEdit = false
        this.form = initForm()
        // this.form.createUser = this.createUser
        this.dialogShow = true
      } else {
        this.isAdd = false
        this.isEdit = true
        getPacketById(rows.id).then(res => {
          const row = res.data.data
          this.readRelation(row)
          //this.row.modifiedUser = this.modifiedUser
          this.form = { ...row }
          this.isNeedConfirm = false
          this.dialogShow = true
        })
      }
    },

    /**
     * 删除按钮
     */
    handleDelete (rows) {
      const id = rows.id
      this._handleGlobalDeleteById([id], deletePacket)
    },

    /**
     * 控制页面数据(10条/页)
     */
    handleSizeChange (val) {
      this.paginationOption.size = val
      this.pageOption.page = this.paginationOption.current
      this.pageOption.size = this.paginationOption.size
      this.load()
    },

    /**
     * 控制去到第几页
     */
    handleCurrentChange (val) {
      this.paginationOption.current = val
      this.pageOption.current = this.paginationOption.current
      this.pageOption.size = this.paginationOption.size
      this.load()
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