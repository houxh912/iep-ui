<template>
  <div>
    <basic-container>
      <page-header title="商机"></page-header>
      <operation-container>
        <template v-if="+type !=3" slot="left">
          <iep-button type="danger" @click="handleAdd" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage" advance-search>
            <el-form :model="paramForm" label-width="80px" size="mini">
              <el-form-item label="客户名称">
                <el-input v-model="paramForm.clientName" placeholder="关键字"></el-input>
              </el-form-item>
              <!-- <el-form-item label="业务类型">
              <el-select v-model="paramForm.businessType" multiple placeholder="请选择岗位类别">
                <el-option label="咨询" value="1"></el-option>
                <el-option label="数据" value="2"></el-option>
                <el-option label="事项" value="3"></el-option>
                <el-option label="平台" value="4"></el-option>
                <el-option label="软件" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="意向程度">
              <el-select v-model="paramForm.intentionLevel" placeholder="请选择岗位名称">
                <el-option label="高" value="1"></el-option>
                <el-option label="中" value="2"></el-option>
                <el-option label="低" value="3"></el-option>
              </el-select>
            </el-form-item> -->
              <el-form-item label="项目名称">
                <el-input v-model="paramForm.projectName" placeholder="关键字"></el-input>
              </el-form-item>
              <!-- <el-form-item label="客户经理">
              <el-input v-model="paramForm.publisher" placeholder="关键字"></el-input>
            </el-form-item> -->
              <el-form-item>
                <el-button type="primary">搜索</el-button>
                <el-button>清空</el-button>
              </el-form-item>
            </el-form>
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" isIndex>
        <el-table-column prop="operation" label="操作" width="150">
          <template slot-scope="scope">
            <operation-wrapper>
              <iep-button v-if="type === '1'" plain @click="handleDetail(scope.row)">查看</iep-button>
              <iep-button type="warning" v-if="type === '2'" plain @click="handleEdit(scope.row)">编辑</iep-button>
              <iep-button v-if="type === '2'" @click="handleDelete(scope.row)">删除</iep-button>
              <iep-button v-if="type === '3'" @click="handleCancel(scope.row)">取消认领</iep-button>
            </operation-wrapper>
          </template>
        </el-table-column>
      </iep-table>
      <detail-drawer ref="DetailDrawer" @load-page="loadPage"></detail-drawer>
    </basic-container>
  </div>
</template>
<script>
import mixins from '@/mixins/mixins'
import { columnsMapByTypeId } from '../columns'
import { businessList, postBusiness, putBusiness, deleteBusinessById, getBusinessById } from '@/api/crms/business'
import { initSearchForm } from '../options'
import DetailDrawer from './DetailDrawer'
export default {
  name: 'List',
  mixins: [mixins],
  components: {
    DetailDrawer,
  },
  data () {
    return {
      type: '1',
      showSelect: false,
      paramForm: initSearchForm(),
      tabList: [
        {
          label: '全部商机',
          value: '1',
        },
        {
          label: '我发布的',
          value: '2',
        },
        {
          label: '我认领的',
          value: '3',
        },
      ],
      replaceText: (data) => `（本周新增${data[0]}位客户）`,
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    changeType () {
      this.loadPage()
      if (this.type === '2') {
        this.showSelect = true
      } else { this.showSelect = false }
    },
    handleAdd () {
      this.$emit('onForm', {
        formRequestFn: postBusiness,
        methodName: '新增',
        id: false,
      })
    },
    handleEdit (row) {
      this.$emit('onForm', {
        formRequestFn: putBusiness,
        methodName: '修改',
        id: row.opportunityId,
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
    loadPage (param = { ...this.searchForm, type: this.type }) {
      this.loadTable(param, businessList, m => {
        return Object.assign(m, { businessTypeKey: m.businessType.map(m => m.commonName).join('，') })
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

