<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="(scope.row)" type="danger" icon="el-icon-plus">新增</iep-button>
        <el-dropdown size="medium">
          <iep-button type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>删除</el-dropdown-item>
            <el-dropdown-item divided>导入</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
            <el-dropdown-item>分享</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
      <template slot="right">
        <operation-search @search="searchPage" advance-search>
          <el-form :model="paramForm" label-width="80px" size="mini">
            <el-form-item label="关键字">
              <el-input v-model="paramForm.theme" placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item label="岗位类别">
              <el-select v-model="paramForm.type" placeholder="请选择岗位类别">
                <el-option label="岗位类别1" value="岗位类别1"></el-option>
                <el-option label="岗位类别2" value="岗位类别2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位名称">
              <el-select v-model="paramForm.type" placeholder="请选择岗位名称">
                <el-option label="岗位名称1" value="岗位名称1"></el-option>
                <el-option label="岗位名称2" value="岗位名称2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchPage">搜索</el-button>
              <el-button @click="clearSearchParam">清空</el-button>
            </el-form-item>
          </el-form>
        </operation-search>
      </template>
    </operation-container>
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
      <el-table-column prop="operation" label="操作" width="280">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleEdit(scope.row)" type="warning">编辑</iep-button>
            <iep-button @click="(scope.row)">发起招聘</iep-button>
            <el-dropdown size="medium">
              <iep-button size="small" type="default">
                <i class="el-icon-more-outline"></i>
              </iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>入职</el-dropdown-item>
                <el-dropdown-item>转正</el-dropdown-item>
                <el-dropdown-item>调动</el-dropdown-item>
                <el-dropdown-item>离职</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <edit-dialog ref="EditDialog" @load-page="loadPage"></edit-dialog>
  </div>
</template>
<script>
import { getPostLibraryPage } from '@/api/hrms/post_library'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from './options'
import EditDialog from './EditDialog'
export default {
  mixins: [mixins],
  components: { EditDialog },
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit (row) {
      console.log(row)
      this.$refs['EditDialog'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param) {
      this.loadTable(param, getPostLibraryPage)
    },
    edit () {

    },
  },
}
</script>
