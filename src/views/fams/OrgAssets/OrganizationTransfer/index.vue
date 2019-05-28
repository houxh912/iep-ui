<template>
  <div>
    <basic-container>
      <iep-page-header title="组织转账" :backOption="backOption"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
        </template>
        <template slot="right">
          <el-radio-group v-model="type" size="small" @change="changeType">
            <el-radio-button v-for="tab in tabList" :label="tab.value" :key="tab.value">{{tab.label}}</el-radio-button>
          </el-radio-group>
          <operation-search @search-page="searchPage">
          </operation-search>
        </template>
      </operation-container>
      <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </iep-table>
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dictsMap, colMap, tabList } from './options'
import { getOrgTransferPage, postOrgTransfer } from '@/api/fams/org_transfer'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: {
    DialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      backOption: {
        isBack: true,
      },
      type: 'outOrgId',
      tabList,
      dictsMap,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    typeQuery () {
      const type = this.type
      return {
        [type]: this.userInfo.orgId,
      }
    },
    columnsMap () {
      return colMap[this.type]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postOrgTransfer
      this.$refs['DialogForm'].dialogShow = true
    },
    changeType () {
      this.loadPage()
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...this.typeQuery, ...param }, getOrgTransferPage)
    },
  },
}
</script>
