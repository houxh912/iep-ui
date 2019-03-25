<template>
  <div>
    <basic-container>
      <page-header title="客户" :replaceText="replaceText" :data="[10]"></page-header>
      <operation-container>
        <template v-if="+type === 2" slot="left">
          <iep-button type="danger" @click="handleAdd" icon="el-icon-plus" plain>新增客户</iep-button>
          <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导入</el-dropdown-item>
              <el-dropdown-item command="handleAllDelete">删除</el-dropdown-item>
              <el-dropdown-item>转移</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="客户名称">
                <el-input v-model="paramForm.clientName" placeholder="请输入客户名称"></el-input>
              </el-form-item>
              <!-- <el-form-item label="业务类型">
              <el-select v-model="paramForm.businessType" placeholder="选择业务类型">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域类型">
              <el-select v-model="paramForm.districtType" placeholder="选择区域类型">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户关系">
              <el-select v-model="paramForm.clientRela" placeholder="选择客户关系">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跟进状态">
              <el-select v-model="paramForm.followUpStatus" placeholder="选择跟进状态">
                <el-option label="类型1" value="0"></el-option>
                <el-option label="类型2" value="1"></el-option>
                <el-option label="类型3" value="2"></el-option>
              </el-select>
            </el-form-item> -->
              <!-- <el-form-item label="市场经理">
              <el-input v-model="paramForm.marketManager" placeholder="请输入市场经理"></el-input>
            </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="selectionChange" :isMutipleSelection="showSelect?true:false" isIndex>
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
        <el-table-column v-if="+type !== 1" prop="operation" label="操作">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button type="warning" plain @click="handleCooperation(scope.row)" v-if="+type===2">添加协作人</iep-button>
              <iep-button type="warning" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="+type === 2" @click="handleDelete(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId } from '../columns'
import { allSearchForm } from '../options'
import { getCustomerPage, postCustomer, putCustomer, deleteCustomerById } from '@/api/crms/customer'
export default {
  name: 'list',
  mixins: [mixins],
  data () {
    return {
      type: '1',
      showSelect: false,
      paramForm: allSearchForm(),
      id: '',
      tabList: [
        {
          label: '全部客户',
          value: '1',
        },
        {
          label: '我的客户',
          value: '2',
        },
        {
          label: '协作客户',
          value: '3',
        },
      ],
      replaceText: (data) => `（本周新增${data[0]}位客户）`,
      tags: ['one', 'two', 'three'],
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
    changeType () {
      this.loadPage()
      if (this.type === '2') {
        this.showSelect = true
      } else { this.showSelect = false }
    },
    handleAdd () {
      this.$emit('onForm', {
        formRequestFn: postCustomer,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onForm', {
        formRequestFn: putCustomer,
        methodName: '修改',
        id: row.clientId,
      })
    },
    handleDetail (row) {
      if (this.type === '2') {
        this.$emit('onDetail', { id: row.clientId })
      }

    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.clientId, deleteCustomerById)
    },
    handleCooperation (row) {
      this.$emit('onCooper', { id: row.clientId })
    },
    loadPage (param = { ...this.searchForm, type: this.type }) {
      this.loadTable(param, getCustomerPage, m => {
        return Object.assign(m, { businessType: m.businessTypeKey.map(m => m.commonName).join('，') })
      })
    },
    clearSearchParam () {
      this.paramForm = allSearchForm()
    },
    searchPage () {
      this.loadTable({ ...this.paramForm, type: 1 }, getCustomerPage, m => {
        return Object.assign(m, { businessTypeC: m.businessTypeKey.map(m => m.commonName).join('，') })
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

