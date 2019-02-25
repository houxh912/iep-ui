<template>
  <div>
    <basic-container>
      <page-header title="行政审批" :replaceText="replaceText" :data="[10 ,2, 3,5,2,3,2]"></page-header>
      <operation-container>
        <template slot="left">
          <el-button @click="(scope.row)" size="small" class="share"><i class="el-icon-share"></i><span>分享</span></el-button>
        </template>
        <template slot="right">
          <div>
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" size="small" prefix-icon="el-icon-search">
              <template slot="append">
                <span class="search">搜索</span>
                <span class="line"></span>
                <i class="el-icon-arrow-down"></i>
              </template>
            </el-input>
          </div>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-mutiple-selection>
        <template slot="before-columns">
          <el-table-column prop="type" label="申请类型">
            <template slot="header">
              <el-dropdown trigger="click" @command="handleCommandType" size="small">
                <span>
                  申请类型<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item,index) in typeList" :key="index" :command="item.label">
                    {{item.label}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column prop="user" label="申请人">
            <template slot="header">
              <el-dropdown trigger="click" @command="handleCommandUser" size="small">
                <span>
                  申请人<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item,index) in userList" :key="index" :command="item.label">
                    {{item.label}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
import PageHeader from '@/components/Page/Header'
import OperationContainer from '@/components/Operation/Container'
import IepTable from '@/components/IepTable/'
// import { getAdministrativeApprovalPage } from '@/serve/controller/hrms'
// import mixins from '@/mixins/mixins'
export default {
  // mixins: [mixins],
  components: { PageHeader, OperationContainer, IepTable },
  data () {
    return {
      input5: '',
      columnsMap: [
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
    // this.loadPage()
  },
  methods: {
    // handleShare (row) { },
    // loadPage (param) {
    // this.loadTable(param, getAdministrativeApprovalPage)
    // },
    handleCommandType () {

    },
    handleCommandUser () {

    },
  },
}
</script>

<style lang="scss" scoped>
.operation-container {
  .el-button {
    background: #fdf5f4;
    border: 1px solid #e59a9e;
    color: #e59a9e;
  }
}
.el-table__column-filter-trigger {
  font-size: 20px;
}
.theme-white .el-dropdown {
  color: black;
}
.el-table th div {
  line-height: 0;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
