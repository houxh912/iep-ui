<template>
  <div>
    <basic-container>
      <page-header title="发布招聘" :replaceText="replaceText" :data="[10 ,5]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd()" type="danger" icon="el-icon-plus" plain>新增</iep-button>
          <el-dropdown size="medium">
            <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDeleteBatch">删除</el-dropdown-item>
              <el-dropdown-item divided>分享</el-dropdown-item>
              <el-dropdown-item>发送群面</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="关键字">
                <el-input v-model="paramForm.keyword" placeholder="请输入关键字"></el-input>
              </el-form-item>
              <el-form-item label="部门">
                <el-select v-model="paramForm.department" placeholder="请选择部门">
                  <el-option label="部门1" value="部门1">
                  </el-option>
                  <el-option label="部门1" value="部门1">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位类别">
                <el-select v-model="paramForm.category" placeholder="请选择岗位类别">
                  <el-option label="岗位类别1" value="岗位类别1">
                  </el-option>
                  <el-option label="岗位类别2" value="岗位类别2">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位名称">
                <el-select v-model="paramForm.name" placeholder="请选择岗位名称">
                  <el-option label="岗位名称1" value="岗位名称1">
                  </el-option>
                  <el-option label="岗位名称2" value="岗位名称2">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="paramForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="招聘状态">
                <el-select v-model="paramForm.status" placeholder="请选择">
                  <el-option label="招聘状态1" value="招聘状态1">
                  </el-option>
                  <el-option label="招聘状态2" value="招聘状态2">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <iep-button type="danger" @click="searchPage">搜索</iep-button>
                <iep-button @click="clearSearchParam">清空</iep-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="岗位" width="180px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.position}}</iep-table-link>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" width="220">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleEdit(scope.row)" :disabled="scope.row.status===3">编辑</iep-button>
              <iep-button v-if="scope.row.status===1" @click="handleShelf(scope.row)">上架</iep-button>
              <iep-button v-if="scope.row.status===2" @click="handleObtained(scope.row)">下架</iep-button>
              <iep-button type="default" @click="handleDelete(scope.row)"><i class="el-icon-delete"></i></iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import { getPublishRecruitmentPage, postPublishRecruitment, putPublishRecruitment, shelfPublishRecruitmentById, deletePublishRecruitmentById, obtainedPublishRecruitmentById, deletePublishRecruitment } from '@/api/hrms/publish_recruitment'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm, dictsMap } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      replaceText: (data) => `（本周新增${data[0]}条招聘信息，收到${data[1]}份简历）`,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDeleteBatch () {
      this._handleGlobalDeleteAll(deletePublishRecruitment)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, deletePublishRecruitmentById)
    },
    handleShelf (row) {
      this._handleComfirm(row.id, shelfPublishRecruitmentById, '上架')
    },
    handleObtained (row) {
      this._handleComfirm(row.id, obtainedPublishRecruitmentById, '下架')
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postPublishRecruitment,
        methodName: '发布',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putPublishRecruitment,
        methodName: '修改',
        id: row.id,
      })
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param = this.paramForm) {
      this.loadTable({ param }, getPublishRecruitmentPage)
    },
  },
}
</script>