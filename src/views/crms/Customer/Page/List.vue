<template>
  <div>
    <basic-container>
      <page-header title="客户" :replaceText="replaceText" :data="[10]"></page-header>
      <operation-container>
        <template v-if="type==='2'" slot="left">
          <iep-button type="primary" @click="handleAdd" icon="el-icon-plus" plain>新增客户</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" :disabled="type !== '2'" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="excellImport">导入</el-dropdown-item>
              <el-dropdown-item @click.native="handleAllDelete">删除</el-dropdown-item>
              <el-dropdown-item @click.native="Transfer">转移</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" isIndex :isMutipleSelection="showSelect?true:false" @row-click="handleDetail">
        <template slot="before-columns">
          <el-table-column label="客户名称" width="300px">
            <template slot-scope="scope">
              <iep-table-link>{{scope.row.clientName}}</iep-table-link>
              <el-col class="custom-tags">
                <a-tag v-for="(item, index) in dealTag(scope.row.tags)" :key="index">{{item.commonName}}
                </a-tag>
                <span v-if="scope.row.tags.length>3">...</span>
              </el-col>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="距离上次拜访已有" v-if="type!=='1'" min-width="100">
          <template slot-scope="scope">
            <div>{{scope.row.lastTime }} 天</div>
          </template>
        </el-table-column>
        <el-table-column v-if="type !== '1'" prop="operation" label="操作" :width="type==='2'?'250px':'150px'">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleCooperation(scope.row)" v-if="type==='2'">添加协作人</iep-button>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="type === '2'" @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <excell-import ref="ExcellImport" :urlName="url" @close="handleClose"></excell-import>
      <collaborator ref="collaborator" @load-page="loadPage"></collaborator>
      <transfer ref="transfer" @load-page="loadPage"></transfer>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId, tabList } from '../columns'
import { getCustomerPage, postCustomer, putCustomer, deleteCustomerBatch } from '@/api/crms/customer'
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
      type: '2',
      tabList,
      replaceText: (data) => `（本周新增${data[0]}位客户）`,
      url: '/api/crm/crms/iepclientinfoexcel/upload',
      showSelect: true,
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
      this.loadPage()
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
        flagName: row.clientName,
      })
    },
    //客户详情
    handleDetail (row, column) {
      if (column.label == '操作') {
        return false
      }
      if (this.type != '1') {
        this.$router.push({
          path: `/crms_spa/customer_detail/${row.clientId}`,
          query: {
            type: this.type,
          },
        })
      } else { return false }
    },
    //删除客户
    handleDelete (row) {
      this.ids = []
      this.ids.push(row.clientId)
      this._handleGlobalDeleteById(this.ids, deleteCustomerBatch)
    },
    handleAllDelete () {
      this._handleGlobalDeleteById(this.ids, deleteCustomerBatch)
    },
    //添加协作人
    handleCooperation (row) {
      this.$refs['collaborator'].data.clientId = row.clientId
      this.$refs['collaborator'].dialogShow = true
    },
    //转移
    Transfer () {
      if (this.ids.length === 0) {
        this.$message('请勾选需要转移的客户')
        return false      } else {
        this.$refs['transfer'].dialogShow = true
        this.$refs['transfer'].id = this.ids
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
    //加载
    loadPage (param) {
      this.loadTable({ ...param, type: this.type }, getCustomerPage, m => {
        return Object.assign(m, { businessType: m.businessTypeKey.map(m => m.commonName).join('，') })
      })
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
</style>


