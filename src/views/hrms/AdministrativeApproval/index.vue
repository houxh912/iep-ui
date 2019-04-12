<template>
  <div>
    <basic-container>
      <page-header title="行政审批" :replaceText="replaceText" :data="[10,2,3,5,2,3,2]"></page-header>
      <operation-container>
        <template slot="left">
          <el-button @click="(scope.row)" size="small" class="share"><i class="el-icon-share"></i><span>分享</span></el-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="申请人">
                <el-input v-model="paramForm.theme" placeholder="请输入申请人姓名"></el-input>
              </el-form-item>
              <el-form-item label="申请类型">
                <el-select v-model="paramForm.type" placeholder="选择申请类型">
                  <el-option label="类型1" value="类型1"></el-option>
                  <el-option label="类型1" value="类型1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择部门">
                <el-select v-model="paramForm.type" placeholder="选择部门">
                  <el-option label="部门1" value="部门1"></el-option>
                  <el-option label="部门1" value="部门1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批结果">
                <el-select v-model="paramForm.type" placeholder="审批结果">
                  <el-option label="通过" value="通过"></el-option>
                  <el-option label="未通过" value="未通过"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="培训时间">
                <div class="block">
                  <el-date-picker v-model="dateVal" type="daterange" align="left" unlink-panels range-separator="至" start-placeholder="2019-02-01" end-placeholder="2019-03-01" :picker-options="pickerOptions2">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="false" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column label="申请人" width="90px">
            <template slot-scope="scope">
              <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
            </template>
          </el-table-column>
          <el-table-column label="申请类型">
            <template slot-scope="scope">
              {{scope.row.applyType}}
            </template>
          </el-table-column>
          <el-table-column label="请假类型">
            <template slot-scope="scope">
              {{scope.row.leavingType || '无'}}
            </template>
          </el-table-column>
          <el-table-column label="部门">
            <template slot-scope="scope">
              <iep-detail-tag :value="scope.row.deptList"></iep-detail-tag>
            </template>
          </el-table-column>
        </template>
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
import { getAdministrativeApprovalPage } from '@/api/hrms/administrative_approval'
import mixins from '@/mixins/mixins'
import { dictsMap, columnsMap, initSearchForm } from './options'
export default {
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      paramForm: initSearchForm(),
      replaceText: (data) => `（本周新增${data[0]}条请假申请，${data[1]}条转正申请，${data[2]}条出差申请，${data[3]}条离职申请，${data[4]}条调岗申请，${data[5]}条调部门申请，${data[6]}条招聘申请）`,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          },
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          },
        }],
      },
      dateVal: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDetail (row) {
      this.$router.push({
        path: '/hrms_spa/approval_detail',
        query: {
          id: row.id,
        },
      })
    },
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
