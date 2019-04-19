<template>
  <div>
    <basic-container>
      <page-header title="商机" :replaceText="replaceText" :data="[10]"></page-header>
      <operation-container>
        <template v-if="+type !=3" slot="left">
          <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage" advance-search :prop="'clientName'">
            <advance-search @search-page="searchPage" :type="type"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" isIndex @row-click="handleDetail">
        <el-table-column prop="operation" label="操作" v-if="type!=='1'" width="250">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" v-if="type==='2'" plain @click=" handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="type === '2'" @click="handleDelete(scope.row)">删除</iep-button>
              <iep-button type="warning" v-if="(type === '3') && scope.row.isCreate==0" plain @click=" handleCreate(scope.row)">创建客户</iep-button>
              <iep-button v-if="(type === '3') && scope.row.isCreate==1" disabled>已创建客户</iep-button>
              <iep-button v-if="type === '3'" @click="handleRefuse(scope.row)">取消认领</iep-button>
              <iep-button v-if="(type === '2') && scope.row.statusValue=='已认领'" @click="handleRefuse(scope.row)">拒绝认领</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
      <edit-drawer ref="EditDrawer" @load-page="loadPage"></edit-drawer>
      <create v-if="showCreate"></create>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId, tabList } from './columns'
import DetailDrawer from './DetailDrawer'
import EditDrawer from './EditDrawer'
import AdvanceSearch from './AdvanceSearch'
import Create from './Create'
import { getBusinessList, postBusiness, putBusiness, deleteBusinessById, getBusinessById, cancelClaim } from '@/api/crms/business'
export default {
  name: 'List',
  mixins: [mixins],
  components: {
    DetailDrawer,
    EditDrawer,
    AdvanceSearch,
    Create,
  },
  data () {
    return {
      type: '1',
      tabList,
      showCreate: false,
      replaceText: (data) => `（本周新增${data[0]}个商机）`,
    }
  },
  computed: {
    columnsMap () {
      return columnsMapByTypeId[this.type - 1]
    },
  },
  created () {

    if (this.$route.query.flag) {
      this.type = this.$route.query.type
    } else {
      this.loadPage()
    }

  },
  mounted () {
    this.$nextTick(() => {
      this.loadPage()
    })
  },
  methods: {
    handleSelectionChange () {
    },
    changeType () {
      this.searchPage({ type: this.type })
    },
    handleAdd () {
      this.$refs['EditDrawer'].methodName = '新增'
      this.$refs['EditDrawer'].drawerShow = true
      this.$refs['EditDrawer'].formRequestFn = postBusiness
    },
    handleEdit (row) {
      getBusinessById(row.opportunityId).then((res) => {
        let formData = res.data.data.data
        this.$refs['EditDrawer'].formData = {
          opportunityId: formData.opportunityId, // ID
          clientName: formData.clientName, // 客户名称 clientName
          projectName: formData.projectName, // 项目名称 projectName
          businessType: formData.businessType.map(m => m.commonId), // 业务类型 businessType
          intentionLevel: formData.intentionLevelKey, // 意向程度 intentionLevel
          tags: formData.tags.map(m => m.commonName), // 商机标签 businessTag
          opportunityDes: formData.opportunityDes, // 商机描述
        }
        this.$refs['EditDrawer'].flag = formData.clientName
      })
      this.$refs['EditDrawer'].methodName = '修改'
      this.$refs['EditDrawer'].drawerShow = true
      this.$refs['EditDrawer'].formRequestFn = putBusiness
      this.$refs['EditDrawer'].id = row.opportunityId

    },
    handleCreate (row) {
      this.$router.push({
        path: '/crms/customer',
        query: {
          router: true,
          data: row,
        },
      })
    },
    handleDetail (row) {
      getBusinessById(row.opportunityId).then((res) => {
        this.$refs['DetailDrawer'].formData = res.data.data.data
      })
      this.$refs['DetailDrawer'].methodName = '详情'
      this.$refs['DetailDrawer'].drawerShow = true
    },
    handleDelete (row) {
      let ids = [row.opportunityId]
      this._handleGlobalDeleteById(ids, deleteBusinessById)
    },
    loadPage (param) {
      this.loadTable({ ...param, type: this.type }, getBusinessList, m => {
        return Object.assign(m, { businessTypeKey: m.businessType.map(m => m.commonName).join('，') })
      })
    },
    //取消认领
    handleRefuse (row) {
      this.$confirm('是否确定取消认领此数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        getBusinessById(row.opportunityId).then(res => {
          let state = res.data.data.data.statusKey
          let id = res.data.data.data.opportunityId
          let claim = {
            opportunityId: id,
            status: state,
          }
          cancelClaim({ ...claim }).then(res => {
            if (res.status == 200) {
              this.$message.success('操作成功!')
            } else {
              this.$message.info(`操作失败，${res.data.msg}`)
            }
            this.loadPage()
          })
        })
      })
    },
  },
}
</script>

