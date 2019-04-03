<template>
  <div>
    <basic-container>
      <page-header title="客户" :replaceText="replaceText" :data="[10]"></page-header>
      <operation-container>
        <template v-if="+type === 2" slot="left">
          <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增客户</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="excellImport">导入</el-dropdown-item>
              <el-dropdown-item command="handleAllDelete">删除</el-dropdown-item>
              <el-dropdown-item @click.native="Transfer">转移</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage" advance-search>
            <advance-search @search-page="searchPage" :type="type"></advance-search>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" isIndex :isMutipleSelection="showSelect?true:false">
        <template slot="before-columns">
          <el-table-column label="客户名称" width="250px">
            <template slot-scope="scope">
              <div class="custom-name" @click="handleDetail(scope.row)">{{scope.row.clientName}}</div>
              <el-col class="custom-tags">
                <a-tag v-for="(item, index) in scope.row.tags" :key="index">{{item.commonName}}</a-tag>
              </el-col>
            </template>
          </el-table-column>
        </template>
        <el-table-column v-if="+type !== 1" prop="operation" label="操作" :width="type==='2'?'250px':'150px'">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleCooperation(scope.row)" v-if="+type===2">添加协作人</iep-button>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="+type === 2" @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <excell-import ref="ExcellImport" :urlName="url" @close="handleClose"></excell-import>
      <collaborator ref="collaborator" @load-page="loadPage"></collaborator>
      <transfer ref="transfer"></transfer>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId, tabList } from '../columns'
import { getCustomerPage, postCustomer, putCustomer, deleteCustomerById } from '@/api/crms/customer'
import AdvanceSearch from './AdvanceSearch'
import ExcellImport from './ExcellImport/'
import Collaborator from './Collaborator/'
import Transfer from './Transfer/'
export default {
  name: 'list',
  components: { AdvanceSearch, ExcellImport, Collaborator, Transfer },
  mixins: [mixins],
  data () {
    return {
      type: '1',
      tabList,
      replaceText: (data) => `（本周新增${data[0]}位客户）`,
      url: '/api/crm/crms/iepclientinfoexcel/upload',
      showSelect: false,
      ids: [],
    }
  },
  computed: {
    columnsMap () {
      return columnsMapByTypeId[this.type - 1]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
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
      this.searchPage({ type: this.type })
      if (this.type === '2') {
        this.showSelect = true
      } else { this.showSelect = false }
    },
    //新增客户
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: postCustomer,
        methodName: '新增',
        id: false,
      })
    },
    //编辑客户
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: putCustomer,
        methodName: '修改',
        id: row.clientId,
      })
    },
    //客户详情
    handleDetail (row) {
      if (this.type === '2') {
        this.$emit('onDetail', { id: row.clientId })
      } else { return false }
    },
    //删除客户
    handleDelete (row) {
      this._handleGlobalDeleteById(row.clientId, deleteCustomerById)
    },
    //添加协作人
    handleCooperation (row) {
      this.$refs['collaborator'].id = row.clientId
      this.$refs['collaborator'].dialogShow = true
      this.$refs['collaborator'].loadPage()
      // getCollaboratorPage(row.clientId).then(res => {
      // this.$refs['collaborator'].data = res.data.data.records
      // console.log(res)
      // })
    },
    //转移
    Transfer () {
      if (this.ids.length === 0) {
        this.$message.error('请勾选需要转移的客户')
        return false      } else {
        this.$refs['transfer'].dialogShow = true
        this.$refs['transfer'].id = this.ids
      }
    },
    //table多选
    handleSelectionChange (row) {
      let ids = []
      row.forEach((item) => {
        ids.push(item.clientId)
      })
      this.ids = ids
      // console.log(this.ids)
    },
    //加载
    loadPage (param = { ...this.searchForm, type: this.type }) {
      this.loadTable(param, getCustomerPage, m => {
        return Object.assign(m, { businessType: m.businessTypeKey.map(m => m.commonName).join('，') })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.custom-name {
  cursor: pointer;
  margin-bottom: 5px;
}
.custom-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>

