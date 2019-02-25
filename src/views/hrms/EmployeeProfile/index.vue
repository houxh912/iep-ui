<template>
  <div>
    <basic-container>
      <page-header title="员工" :replaceText="replaceText" :data="[10 ,5, 1]"></page-header>
      <operation-container>
        <template slot="left">
          <el-button @click="(scope.row)" size="small">表头设置</el-button>
          <el-dropdown size="medium">
            <el-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
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
              <span>{{scope.row.姓名}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" min-width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <el-dropdown size="medium">
                <el-button size="small" type="default">
                  变更<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>入职</el-dropdown-item>
                  <el-dropdown-item>转正</el-dropdown-item>
                  <el-dropdown-item>调动</el-dropdown-item>
                  <el-dropdown-item>离职</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button @click="(scope.row)" size="small">成长档案</el-button>
              <el-dropdown size="medium">
                <el-button size="small" type="default">...</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                  <el-dropdown-item>分享</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import OperationSearch from '@/components/Operation/Search'
import IepTable from '@/components/IepTable/'
import OperationWrapper from '@/components/Operation/Wrapper'
import OperationContainer from '@/components/Operation/Container'
import { getEmployeeProfilePage } from '@/api/hrms/employee_profile'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from './options'
export default {
  mixins: [mixins],
  components: { PageHeader, IepTable, OperationWrapper, OperationContainer, OperationSearch },
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      replaceText: (data) => `（本周新增${data[0]}位正式员工，新增${data[1]}位实习生，离职${data[2]}人）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    loadPage (param) {
      this.loadTable(param, getEmployeeProfilePage)
    },
  },
}
</script>
