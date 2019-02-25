<template>
  <div>
    <basic-container>
      <page-header :title="formData.orgName" :replaceText="replaceText" :data="data"></page-header>
      <operation-container>
        <template slot="left">
          <el-button @click="handleAdd" size="small">批量审核</el-button>
          <el-button @click="handleDel" size="small">删除</el-button>
          <!-- <el-dropdown size="medium">
            <el-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item divided>导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <operation-search @search="search"></operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="用户名" width="150px">
            <template slot-scope="scope">
              <span>{{scope.row.username}}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="操作" min-width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
              <el-button @click="handlePerson(scope.row)" size="small">锁定</el-button>
              <el-dropdown size="medium">
                <el-button size="small" type="default">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                  <el-dropdown-item>通过</el-dropdown-item>
                  <el-dropdown-item>不通过</el-dropdown-item>
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
import { dictsMap, columnsMap } from './options'
import { orgDetail, gomsUserPage } from '@/api/admin/org'
import IepTable from '@/components/IepTable/'
import PageHeader from '@/components/Page/Header'
import OperationContainer from '@/components/Operation/Container'
import OperationSearch from '@/components/Operation/Search'
import OperationWrapper from '@/components/Operation/Wrapper'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      dictsMap,
      data: [0, 0],
      replaceText: (data) => ` 共${data[0]}个成员(其中${data[1]}个待审核）`,
      formData: { 'orgName': '杜照鸿的组织', 'logo': 'image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg', 'realName': '超级管理员', 'logList': [{ 'id': 2, 'userId': 8, 'targetUserId': 0, 'time': '2019-02-22 17:11:03', 'description': '$申请加入组织。,张超', 'orgId': 8 }], 'memberNum': 2, 'applyUserNum': 1, 'deptNum': 0, 'managerList': [{ 'userId': 10, 'username': 'duzhaohong', 'realName': '杜照鸿', 'password': '$2a$10$u6D83/lGaENUrMp7FgvDLezaeVSXHUJl3NwgYL/AI26FdYAcA5Ncq', 'safePassword': '', 'createTime': '2019-02-20 11:38:33', 'updateTime': '2019-02-23 16:19:48', 'delFlag': '0', 'lockFlag': '0', 'avatar': 'image-cde6b6e3b38e4526b24f2bee00e7c15b.jpg', 'phone': '11011011011', 'orgId': 8, 'deptId': 13, 'tenantId': 1, 'wxOpenid': null, 'qqOpenid': null }], 'isOpen': 0 },
    }
  },
  created () {
    this.loadPage()
  },
  components: {
    PageHeader,
    OperationContainer,
    OperationSearch,
    OperationWrapper,
    IepTable,
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, gomsUserPage)
      orgDetail().then((res) => {
        this.formData = res.data.data
        this.data = [this.formData.memberNum, this.formData.applyUserNum]
      })
    },
  },
}
</script>
