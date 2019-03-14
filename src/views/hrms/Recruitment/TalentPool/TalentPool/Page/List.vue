<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button @click="handleAdd()" type="danger" icon="el-icon-plus">新增</iep-button>
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
            <el-form-item label="员工姓名">
              <el-input v-model="paramForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="paramForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
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
      <template slot="before-columns">
        <el-table-column label="姓名" width="90px">
          <template slot-scope="scope">
            <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="operation" label="操作" width="220">
        <template slot-scope="scope">
          <operation-wrapper>
            <el-dropdown size="medium">
              <iep-button type="warning" plain>
                待处理<i class="el-icon-arrow-down el-icon--right"></i>
              </iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="handleRejected(scope.row)">驳回</el-dropdown-item>
                <el-dropdown-item>未面试</el-dropdown-item>
                <el-dropdown-item>面试未录用</el-dropdown-item>
                <el-dropdown-item>已录用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <iep-button @click="(scope.row)">删除</iep-button>
            <el-dropdown size="medium">
              <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>安排面试</el-dropdown-item>
                <el-dropdown-item>录用</el-dropdown-item>
                <el-dropdown-item>面试记录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <rejected-dialog ref="RejectedDialog" @load-page="loadPage"></rejected-dialog>
  </div>
</template>
<script>
import { getTalentPoolPage, postTalentPool } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
import RejectedDialog from './RejectedDialog'
export default {
  mixins: [mixins],
  components: { RejectedDialog },
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
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postTalentPool,
        methodName: '新增',
        id: false,
      })
    },
    handleDetail () {
      this.$emit('onDetail')
    },
    handleRejected (row) {
      console.log(row)
      this.$refs['RejectedDialog'].dialogShow = true
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
