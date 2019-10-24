<template>
  <div>
    <basic-container>
      <iep-page-header title="客户" :replaceText="replaceText" :data="[increasedClient]"></iep-page-header>
      <operation-container>
        <template v-if="type==='2'" slot="left">
          <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增客户</iep-button>
          <iep-button @click="excellImport" plain v-show="isDrPermissions()">导入</iep-button>
          <iep-button @click="Transfer(2)" plain>转移</iep-button>
        </template>
        <template v-if="type==='1'" slot="left">
          <iep-button @click="Transfer(1)" plain v-show="isZyPermissions()">转移</iep-button>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value" :disabled="isLoadTable">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage" advance-search prop="clientName">
            <advance-search @search-page="searchPage" :type="type"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" :cell-style="mixinsCellPointerStyle" @selection-change="handleSelectionChange" :isMutipleSelection="showSelect?true:false" @row-click="handleDetail" :dictsMap="dictsMap">
        <template slot="before-columns">
          <el-table-column label="客户名称" width="300px">
            <template slot-scope="scope">
              <span class="clientName">{{scope.row.clientName}}</span>
              <el-col class="custom-tags">
                <a-tag v-for="(item, index) in dealTag(scope.row.tags)" :key="index" @click.stop="handleTagDetail(item.commonName)">{{item.commonName}}
                </a-tag>
                <span v-if="scope.row.tags.length>3">...</span>
              </el-col>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="距离上次拜访已有" v-if="isShow(type)" width="150px">
          <template slot-scope="scope">
            <div v-if="scope.row.hasOwnProperty('lastTime')">{{scope.row.lastTime }} 天</div>
            <div v-else>无</div>
          </template>
        </el-table-column>
        <el-table-column v-if="isShow(type)" prop="operation" label="操作" width="220px">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button type="warning" plain @click="addContact(scope.row)">添加联系人</iep-button> -->
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="type === '2'" @click="handleDelete(scope.row)">删除</iep-button>
              <el-dropdown size="medium" v-if="showPoint(type)">
                <iep-button type="default"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="addContact(scope.row)">添加联系人</el-dropdown-item>
                  <el-dropdown-item @click.native="handleCooperation(scope.row)">添加协作人</el-dropdown-item>
                  <el-dropdown-item @click.native="handleCancelClaim(scope.row)">移入公海库</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
        <el-table-column v-if="type == '1'" prop="operation" label="操作" width="250px">
          <template slot-scope="scope">
            <operation-wrapper>
              <!-- <iep-button type="warning" plain @click="addContact(scope.row)" :disabled="isEditDelPermissions(scope.row)">添加联系人</iep-button> -->
              <iep-button type="warning" plain @click="handleEdit(scope.row)" :disabled="isEditDelPermissions(scope.row)">编辑</iep-button>
              <iep-button @click="handleDelete(scope.row)" :disabled="isEditDelPermissions(scope.row)">删除</iep-button>
              <el-dropdown size="medium">
                <iep-button type="default" :disabled="isEditDelPermissions(scope.row)"><i class="el-icon-more-outline"></i></iep-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="addContact(scope.row)">添加联系人</el-dropdown-item>
                  <el-dropdown-item @click.native="handleCooperation(scope.row)">添加协作人</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </operation-wrapper>
          </template>
        </el-table-column>
        <el-table-column v-if="type == '4'" prop="operation" label="操作" width="250px">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleClaim(scope.row)">认领客户</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <edit-drawer ref="EditDrawer" @load-page="loadPage" @showDrawer="showDrawer"></edit-drawer>
      <excell-import ref="ExcellImport" :urlName="url" @close="handleClose"></excell-import>
      <collaborator ref="collaborator" @load-page="loadPage"></collaborator>
      <transfer ref="transfer" @load-page="loadPage"></transfer>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId, tabList, dictsMap } from '../columns'
import { getCustomerPage, postCustomer, putCustomer, deleteCustomerBatch, getToclaimHighseas, getUnToclaimHighseas } from '@/api/crms/customer'
import { getWeekincrease } from '@/api/crms/count'
import AdvanceSearch from './AdvanceSearch'
import ExcellImport from './ExcellImport/'
import Collaborator from './Collaborator/'
import Transfer from './Transfer/'
import EditDrawer from './EditDrawer'
import { mapGetters } from 'vuex'
import { fetchList, deleteDataById } from '@/api/crms/contact'
import { getVisitListData } from '@/api/mlms/material/summary'
import { fetchVisitList, deleteVisit, deleteAllVisitLog } from '@/api/crms/visiting_record'
import { getSchemePage, deleteSchemeById } from '@/api/crms/scheme'
import { getAgreementPage, deleteAgreement } from '@/api/crms/agreement'
export default {
  name: 'list',
  components: { AdvanceSearch, ExcellImport, Collaborator, Transfer, EditDrawer },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      // eslint-disable-next-line
      type: IS_ICAN ? '1' : '2',
      tabList,
      replaceText: (data) => `（本周新增${data[0]}位客户）`,
      url: '/api/crm/crms/iepclientinfoexcel/upload',
      showSelect: true,
      ids: [],
      increasedClient: '',
      crms_customer_add: false,
      crms_customer_edit_del: false,
      crms_customer_view: false,
      crms_customer_zy: false,
      crms_customer_dr: false,
    }
  },
  computed: {
    columnsMap () {
      return columnsMapByTypeId[this.type - 1]
    },
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.crms_customer_add = this.permissions['crms_customer_add']
    this.crms_customer_edit_del = this.permissions['crms_customer_edit_del']
    this.crms_customer_view = this.permissions['crms_customer_view']
    this.crms_customer_zy = this.permissions['crms_customer_zy']
    this.crms_customer_dr = this.permissions['crms_customer_dr']
    this.loadPage({ type: 2 })
    this.getWeekincrease()
  },
  methods: {
    //能否查看详情权限
    isViewPermissions () {
      return this.crms_customer_view
    },
    // 能否编辑删除客户权限
    isEditDelPermissions () {
      return !this.crms_customer_edit_del
    },
    // 能否新增客户权限
    isAddPermissions () {
      return this.crms_customer_add
    },
    // 能否转移客户权限
    isZyPermissions () {
      return this.crms_customer_zy
    },
    // 能否导入客户权限
    isDrPermissions () {
      return this.crms_customer_dr
    },
    showDrawer (val) {
      this.$refs.EditDrawer.drawerShow = true
      this.$refs.EditDrawer.form.clientIds = [val]
    },
    addContact (row) {
      this.$refs.EditDrawer.drawerShow = true
      this.$refs.EditDrawer.form.clientIds = [row.clientId]
    },
    dealTag (data) {
      if (data.length > 3) {
        return data.slice(0, 3)
      }
      return data
    },
    //导入弹框关闭
    handleClose (res) {
      this.loadPage()
      this.$refs['ExcellImport'].dialogShow = false
      if (res.data) {
        this.$message({
          message: `成功!${res.msg}`,
          type: 'success',
          duration: 15000,
        })
      } else {
        this.$message({
          message: `警告!${res.msg}`,
          type: 'warning',
          duration: 15000,
        })
      }
    },
    //导入按钮
    excellImport () {
      this.$refs['ExcellImport'].dialogShow = true
    },
    //tab切换菜单
    changeType () {
      this.searchPage()
      // if (this.type === '2') {
      //   this.showSelect = true
      // } else { this.showSelect = false }
      this.showSelect = true
    },
    //新增客户
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postCustomer,
        methodName: '新增',
        id: false,
        type: this.type,
      })
    },
    //编辑客户
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putCustomer,
        methodName: '修改',
        id: row.clientId,
        flagName: row.clientName,
      })
    },
    //客户详情
    handleDetail (row, column) {
      if (column.label == '操作' || column.type == 'selection' || column.type == 'index') {
        return false
      }
      if (this.isShow(this.type)) {
        // this.$router.push({
        //   path: `/crms_spa/customer_detail/${row.clientId}`,
        //   query: {
        //     type: this.type,
        //   },
        // })
        this.$emit('onDetail', {
          formRequestFn: null,
          methodName: '详情',
          id: row.clientId,
          type: this.type,
          collaborations: '',
          marketManager: '',
        })
      } else {
        if (this.crms_customer_view) {
          // this.$router.push({
          //   path: `/crms_spa/customer_detail/${row.clientId}`,
          //   query: {
          //     type: this.type,
          //   },
          // })
        } else {
          return false
        }
      }
    },
    //删除客户
    handleDelete (row) {
      getAgreementPage({ id: row.clientId }).then(res => {
        if (res.data.data.records.length > 0) {
          this.$message({
            message: '该客户已存在合同，要删除客户需先删除该客户的合同',
            type: 'warning',
          })
        } else {
          this.$confirm('此操作将删除该数据，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            this.ids = []
            this.ids.push(row.clientId)
            // this._handleGlobalDeleteById(this.ids, deleteCustomerBatch)
            deleteCustomerBatch(this.ids)
            // 联系人删除
            fetchList({ clientId: row.clientId }).then(res => {
              let ConactsId = []
              for (let i = 0; i < res.data.data.records.length; i++) {
                ConactsId.push(res.data.data.records[i].clientContactId)
              }
              if (ConactsId.length > 0) {
                deleteDataById(ConactsId)
              }
            })
            // 拜访日志删除
            getVisitListData({ id: row.clientId }).then(res => {
              let visitLstId = []
              for (let i = 0; i < res.data.data.records.length; i++) {
                visitLstId.push(res.data.data.records[i].id)
              }
              if (visitLstId.length > 0) {
                deleteAllVisitLog(visitLstId)
              }
            })
            // 联系记录删除
            fetchVisitList({ id: row.clientId }).then(res => {
              let visitDataId = []
              for (let i = 0; i < res.data.data.records.length; i++) {
                visitDataId.push(res.data.data.records[i].contactId)
              }
              if (visitDataId.length > 0) {
                deleteVisit(visitDataId)
              }
            })
            // 方案删除
            getSchemePage({ clientId: row.clientId }).then(res => {
              let schemeId = []
              for (let i = 0; i < res.data.data.records.length; i++) {
                schemeId.push(res.data.data.records[i].programId)
              }
              if (schemeId.length > 0) {
                deleteSchemeById(schemeId)
              }
            })
            // 合同删除
            getAgreementPage({ id: row.clientId }).then(res => {
              let agreementId = []
              for (let i = 0; i < res.data.data.records.length; i++) {
                agreementId.push(res.data.data.records[i].contractId)
              }
              if (agreementId.length > 0) {
                deleteAgreement(agreementId)
              }
            })
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$emit('onGoBack')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
        }
      })
    },
    handleAllDelete () {
      if (this.ids.length == 0) {
        this.$message.info('请勾选需要删除的客户')
      } else {
        this._handleGlobalDeleteById(this.ids, deleteCustomerBatch)
      }

    },
    //添加协作人
    handleCooperation (row) {
      this.$refs['collaborator'].Data.clientId = row.clientId
      this.$refs['collaborator'].dialogShow = true
    },
    //转移
    Transfer (val) {
      if (this.ids.length === 0) {
        this.$message('请勾选需要转移的客户')
        return false
      } else {
        this.$refs['transfer'].dialogShow = true
        this.$refs['transfer'].id = this.ids
        if (val == 2) {
          this.$refs['transfer'].myOrAll = '1'
        } else {
          this.$refs['transfer'].myOrAll = '2'
        }

      }
    },
    //table多选
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.clientId)
      let ids = []
      val.forEach((item) => {
        ids.push(item.clientId)
      })
      this.ids = ids
    },
    // 获取每周新增客户数
    getWeekincrease () {
      getWeekincrease().then(res => {
        this.increasedClient = res.data.data.increasedClient
      })
    },
    //加载
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, type: this.type }, getCustomerPage)
      this.getWeekincrease()
    },
    // 列表标签点击进入标签详情页
    handleTagDetail (val) {
      this.$openTagDetail(val)
    },
    isShow (type) {
      if (type == 2) {
        return true
      } else if (type == 3) {
        return true
      } else {
        return false
      }
    },
    // 认领客户
    handleClaim (row) {
      getToclaimHighseas({ clientId: row.clientId }).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '认领成功!',
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
    },
    // 取消认领
    handleCancelClaim (row) {
      getUnToclaimHighseas({ clientId: row.clientId }).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: '操作成功!',
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
    },
    showPoint (type) {
      if (type == 2) {
        return true
      } else if (type == 1) {
        return true
      } else {
        return false
      }
    },
  },

}
</script>
<style lang="scss">
.custom-tags {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
.clientName {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>


