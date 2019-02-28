<template>
  <div>
    <basic-container>
      <page-header title="行政审批" :replaceText="replaceText" :data="[10,2,3,5,2,3,2]"></page-header>
      <operation-container>
        <template slot="left">
          <el-button @click="(scope.row)" size="small" class="share"><i class="el-icon-share"></i><span>分享</span></el-button>
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
      <iep-table :isLoadTable="false" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <el-table-column label="操作">
          <template>
            <el-button size="small">分享</el-button>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>

<script>
import PageHeader from '@/components/Page/Header'
import OperationContainer from '@/components/Operation/Container'
import IepTable from '@/components/IepTable/'
import { getAdministrativeApprovalPage } from '@/api/hrms/administrative_approval'
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  components: { PageHeader, OperationContainer, IepTable },
  data () {
    return {
      paramForm: {},
      columnsMap: [
        {
          prop: '申请类型',
          label: '申请类型',
        }, {
          prop: '申请人',
          label: '申请人',
        },
        {
          prop: '部门',
          label: '部门',
        },
        {
          prop: '申请时间',
          label: '申请时间',
        },
        {
          prop: '审批人',
          label: '审批人',
        },
        {
          prop: '状态',
          label: '状态',
        },
      ],
      typeList: [{ label: '请假申请', id: 1 }, { label: '出差申请', id: 2 }, { label: '转正申请', id: 3 }, { label: '加班申请', id: 4 }, { label: '离职申请', id: 5 }, { label: '调岗申请', id: 6 }, { label: '调部门申请', id: 7 }, { label: '招聘申请', id: 1 }],
      userList: [{ label: '李百川', id: 1 }, { label: '李百川', id: 2 }, { label: '李百川', id: 3 }, { label: '李百川', id: 4 }, { label: '李百川', id: 5 }, { label: '李百川', id: 6 }, { label: '李百川', id: 7 }, { label: '李百川', id: 8 }],
      replaceText: (data) => `（本周新增${data[0]}条请假申请，${data[1]}条转正申请，${data[2]}条出差申请，${data[3]}条离职申请，${data[4]}条调岗申请，${data[5]}条调部门申请，${data[6]}条招聘申请）`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    // handleShare (row) { },
    loadPage (param) {
      this.loadTable(param, getAdministrativeApprovalPage)
    },
    handleCommandType () {
      // console.log(val)
    },
    handleCommandUser () {
      // console.log(val)
    },
  },
}
</script>
<style scoped>
</style>
