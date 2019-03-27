<template>
  <div>
    <basic-container>
      <page-header title="联系人"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" icon="el-icon-plus" type="danger" plain>新增</iep-button>
          <!-- <el-dropdown size="medium">
            <iep-button size="small" type="default">更多操作<i class="el-icon-arrow-down el-icon--right"></i></iep-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>删除</el-dropdown-item>
              <el-dropdown-item divided>导入</el-dropdown-item>
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>分享</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
        <template slot="right">
          <operation-search @search="searchPage" advance-search>
            <el-form :model="paramForm" label-width="100px" size="mini">
              <el-form-item label="联系人姓名：">
                <el-input v-model="paramForm.contactName" placeholder="请输入联系人"></el-input>
              </el-form-item>
              <!-- <el-form-item label="对应客户：">
                <el-select v-model="paramForm.clientIds" multiple placeholder="请选择">
                  <el-option v-for="item in dictData" :key="item.clientId" :label="item.clientName" :value="item.clientId">
                  </el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" @click="searchPage">搜索</el-button>
                <el-button @click="clearSearchParam">清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :dictsMap="dictsMap" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" is-index>
        <template slot="before-columns">
          <el-table-column label="客户名称" width="250px">
            <template slot-scope="scope">
              <div class="custom-name" @click="contactDetail(scope.row)">{{scope.row.contactName}}</div>
            </template>
          </el-table-column>
        </template>
        <el-table-column prop="operation" label="对应客户" width="460">
          <template slot-scope="scope">
            <span class="contactTag" v-for="(item,index) in scope.row.clientInfos" :key="index">{{item.clientName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="160">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button @click="handleEdit(scope.row)" plain type="warning">编辑</iep-button>
              <iep-button @click="handleDeleteById(scope.row)">删除</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
    </basic-container>
    <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { fetchList, deleteDataById, createData, updateData, getContactById } from '@/api/crms/contact'
import { columnsMap, initSearchForm } from '../options'
import DetailDrawer from './DetailDrawer'
export default {
  mixins: [mixins],
  components: { DetailDrawer },
  data () {
    return {
      dictsMap: {},
      columnsMap,
      dictData: [],
      paramForm: initSearchForm(),
      values: [],
      dialogShow: false,
      detailForm: {},
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.clientContactId, deleteDataById)
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
    handleEdit (row) {
      this.$emit('onEdit', {
        formRequestFn: updateData,
        methodName: '编辑',
        id: row.clientContactId,
      })
    },
    handleAdd () {
      this.$emit('onEdit', {
        formRequestFn: createData,
        methodName: '新增',
      })
    },
    loadPage (param) {
      this.loadTable(param, fetchList)
    },
    searchPage () {
      this.loadTable(this.paramForm, fetchList)
    },
    contactDetail (row) {
      this.$refs['DetailDrawer'].drawerShow = true
      getContactById(row.clientContactId).then(res => {
        this.$refs['DetailDrawer'].detailForm = res.data.data
      })
    },
    close () {
      this.dialogShow = false
    },
  },
}
</script>
<style>
.contactTag {
  display: inline-block;
  margin: 5px 5px;
  padding: 5px 5px;
  border-radius: 4px;
  background: #f3f2f2;
  font-size: 12px;
}
.custom-name {
  cursor: pointer;
}
.tags {
  padding-right: 10px;
}
.form-half {
  width: 50%;
  display: inline-block;
}
</style>

