<template>
  <page-dialog :page-show="editDialogShow" :title="infoFormTitle" @close="editDialogShow=false">
    <template slot="page">
      <iep-page-header title="标签列表"></iep-page-header>

      <div v-if="showMergeBox" class="merge-tag-list">
        <span class="label">已选择的合并标签：</span>
        <el-tag v-for="tag in toMergeTagList" :key="tag.name" closable @close="handleRemoveMergeTag(tag)">
          {{tag.name}}
        </el-tag>
      </div>
      <operation-container>
        <template slot="left">
          <iep-button type="primary" icon="el-icon-plus" @click="handleAdd()" plain>新增</iep-button>
          <iep-button @click="handleEditBatch()">批量编辑</iep-button>
          <iep-button icon="el-icon-menu" @click="handleMerge()">合并</iep-button>
          <iep-button icon="el-icon-check" @click="handleReviewPass()">审核通过</iep-button>
          <iep-button icon="el-icon-remove-outline" @click="handleDisabled()">禁用</iep-button>
          <iep-button icon="el-icon-delete" @click="handleDelete()">删除</iep-button>
          <iep-button icon="el-icon-upload" @click="handleImport()">Excel导入</iep-button>
          <iep-button icon="el-icon-download" @click="handleExport()">导出</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search placeHolder="请输入标签名称">
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
        </template>
      </operation-container>

      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :dictMap="dictMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <el-table-column label="标签属性">
          <template slot-scope="scope">
            {{ dictMap.isFree[scope.row.isFree] }}
          </template>
        </el-table-column>
        <el-table-column label="所属分类">
          <template slot-scope="scope">
            {{ scope.row.typeNames.join('、') }}
          </template>
        </el-table-column>
        <el-table-column label="应用次数">
          <template slot-scope="scope">
            {{ scope.row.refers }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template slot-scope="scope">
            {{ scope.row.updateTime | parseToDay }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ dictMap.status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button class="btn" @click="handleAddToMerge(scope.row)" type="warning" size="small" plain>合并</iep-button>
              <iep-button class="btn" :disabled="!gov_tag_edit" @click="handleEdit(scope.row)" size="small" type="default">修改</iep-button>
              <iep-button class="btn" :disabled="!gov_tag_del" @click="handleDeleteTag(scope.row)" size="small" type="default">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>

      <form-dialog :dialog-show="addDialogShow" :title="infoFormTitle" @close="addDialogShow=false" width="60%" :is-need-confirm="false">
        <tag-form-add :form-data="addTagInfoForm" @hideDialog="loadPage();" :level-name-opts="levelNameOpts" :type-name-opts="typeNameOpts" :tag-function="tagFunction"></tag-form-add>
      </form-dialog>

      <form-dialog :dialog-show="mergeDialogShow" title="合并标签" @close="mergeDialogShow=false" width="50%" :is-need-confirm="false">
        <el-form label-position="top" label-width="80px" :model="mergeForm">
          <el-form-item label="请选择主标签">
            <el-radio-group v-model="mergeForm.mainId">
              <el-radio v-for="item in toMergeTagList" :label="item.tagId" :key="item.tagId">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <iep-button type="primary" @click="onMerge">合并</iep-button>
            <iep-button>取消</iep-button>
          </el-form-item>
        </el-form>
      </form-dialog>

      <form-dialog :dialog-show="importDialogShow" title="上传数据" @close="importDialogShow=false" width="500px" :is-need-confirm="false">
        <tag-import @close="handleCloseImport"></tag-import>
      </form-dialog>
      <edit-batch is-inverse ref="OpenEditBatch" @load-page="loadPage" :level-name-opts="levelNameOpts" :type-name-opts="typeNameOpts"></edit-batch>
    </template>
    <template slot="form">
      <tag-form-edit :form-data="editTagInfoForm" @hideDialog="loadPage();" :level-name-opts="levelNameOpts" :type-name-opts="typeNameOpts" @close="editDialogShow=false" :tag-function="tagFunction"></tag-form-edit>
    </template>
  </page-dialog>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { getTagTypeList } from '@/api/tms/tag-type'
import { getTagLevelList } from '@/api/tms/tag-level'
import { getTagExcelExport } from '@/api/tms/excel'
import { getTagFunctionMap } from '@/api/tms/function'
import { getTagPage, deleteTagById, getTagById, mergeTag, reviewTag, disableTag, deleteTag } from '@/api/tms/tag'
import tagFormAdd from './tag_form_add'
import tagFormEdit from './tag_form_edit'
import tagImport from './tag_import'
import dialogMixins from '@/mixins/deprecated/dialog_mixins'
import mixins from '@/mixins/mixins'
import { columnsMap, dictMap, initFormInline, initTagFunction, initAddTagForm, initEditTagForm, initMergeForm } from './option'
import AdvanceSearch from './AdvanceSearch'
import EditBatch from './EditBatch'
import { validatenull } from '@/util/validate'
export default {
  components: {
    AdvanceSearch,
    tagFormAdd,
    tagFormEdit,
    tagImport,
    EditBatch,
  },
  mixins: [dialogMixins, mixins],
  data () {
    return {
      columnsMap,
      dictMap,
      mergeMainName: '',
      isEdit: true,
      initFormInline,
      formInline: initFormInline(),
      tagFunction: initTagFunction(),
      addTagInfoForm: initAddTagForm(),
      editTagInfoForm: initEditTagForm(),
      mergeForm: initMergeForm(),
      addDialogShow: false,
      editDialogShow: false,
      mergeDialogShow: false,
      importDialogShow: false,
      typeNameOpts: [],
      levelNameOpts: [],
      toMergeTagList: [],
      gov_tag_add: false,
      gov_tag_del: false,
      gov_tag_edit: false,
    }
  },
  computed: {
    infoFormTitle () {
      return this.isEdit ? '修改标签' : '新增标签'
    },
    params () {
      return this.formInline
    },
    showMergeBox () {
      return this.toMergeTagList.length > 0 ? true : false
    },
    ...mapGetters([
      'permissions',
    ]),
  },
  created () {
    this.loadPage()
    this.loadFunction()
    this.loadTagProp()
    this.gov_tag_add = this.permissions['gov_tag_add']
    this.gov_tag_del = this.permissions['gov_tag_del']
    this.gov_tag_edit = this.permissions['gov_tag_edit']
  },
  methods: {
    handleImport () {
      this.importDialogShow = true
    },
    handleCloseImport (res) {
      this.importDialogShow = false
      this.loadPage()
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
          type: 'success',
        })
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: 'warning',
        })
      }
    },
    handleExport () {
      getTagExcelExport()
    },
    handleDelete () {
      this._handleGlobalDeleteAll(deleteTag)
    },
    handleDisabled () {
      disableTag(this.mutipleSelection).then(() => {
        this.loadPage()
      })
    },
    handleReviewPass () {
      reviewTag(this.mutipleSelection).then(() => {
        this.loadPage()
      })
    },
    onMerge () {
      this.$confirm(`是否确认将这些标签归并到“${this.mergeMainName}”？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        mergeTag(this.mergeForm).then(() => {
          this.$message({
            type: 'success',
            message: '合并成功!',
          })
          this.mergeDialogShow = false
          this.toMergeTagList = []
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消合并',
        })
      })
    },
    handleMerge () {
      if (this.toMergeTagList.length < 2) {
        this.$message('请至少选择两个标签。')
        return
      }
      this.mergeDialogShow = true
    },
    handleRemoveMergeTag (tag) {
      const { toMergeTagList } = this
      this.$set(this, 'toMergeTagList', _.filter(toMergeTagList, item => item.tagId !== tag.tagId))
    },
    handleAddToMerge (rows) {
      this.toMergeTagList.push(rows)
      this.toMergeTagList = _.uniqWith(this.toMergeTagList, _.isEqual)
    },
    handleDeleteTag (rows) {
      const { tagId } = rows
      this._handleGlobalDeleteById(tagId, deleteTagById, 'delete')
    },
    handleAdd () {
      this.isEdit = false
      this.addTagInfoForm = initAddTagForm()
      this.addDialogShow = true
    },
    _mapPickUserIdName (list) {
      if (validatenull(list)) {
        return []
      }
      return _(list)
        .map(item => {
          return _.pick(item, ['id', 'realName'])
        })
        .value()
    },
    handleEditBatch () {
      // TODO: 是否多选提醒
      if (!this.multipleSelection.length) {
        this.$message('请先选择需要的选项')
        return
      }
      else {
        this.$refs['OpenEditBatch'].ids = this.multipleSelection
        this.$refs['OpenEditBatch'].dialogShow = true
        // this.$refs['editBatch'].formRequestFn = 
      }
    },
    handleEdit (rows) {
      this.isEdit = true
      getTagById(rows.tagId).then(res => {
        this.editTagInfoForm = { ...res.data }
        const { tagList } = this.editTagInfoForm
        // 标签
        this.editTagInfoForm.tagsList = this._mapPickUserIdName(tagList)
        this.editTagInfoForm.tagList = this.editTagInfoForm.tagsList.map(m => m.name)
        this.editDialogShow = true
      })
    },
    handleSelectionChange (val) {
      this.mutipleSelection = val.map(m => m.tagId)
      this.multipleSelection = val.map(m => m.tagId)
    },
    loadFunction () {
      getTagFunctionMap().then(res => {
        this.tagFunction = res.data
      })
    },
    loadPage (param = this.searchForm) {
      this.editDialogShow = false
      this.addDialogShow = false
      this.loadTable({ ...param }, getTagPage)
    },
    loadTagProp () {
      getTagTypeList().then(res => {
        this.typeNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.typeId,
          }
        })
      })
      getTagLevelList().then(res => {
        this.levelNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.levelId,
          }
        })
      })
    },
  },
  watch: {
    'mergeForm.mainId': function (mainId) {
      this.mergeMainName = this.toMergeTagList.find(m => m.tagId === mainId).name
      const mergeIds = _.filter(this.toMergeTagList.map(m => m.tagId), item => item !== mainId)
      this.mergeForm.mergeIds = mergeIds
    },
  },
}
</script>
<style lang="scss" scoped>
.merge-tag-list {
  margin-bottom: 18px;
  & > span.label {
    line-height: 32px;
    font-size: 14px;
    color: #606266;
  }
  > .el-tag {
    margin-right: 5px;
  }
}
.btn {
  margin-right: -5px;
}
</style>
<style scoped>
.list-btn >>> .el-button {
  height: 32px;
}
.list-btn >>> .el-form-item + .el-form-item {
  margin-left: -5px;
}
</style>
