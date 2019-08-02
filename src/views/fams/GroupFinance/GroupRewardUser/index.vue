<template>
  <div>
    <basic-container>
      <iep-page-header title="集团打赏个人" :backOption="backOption"></iep-page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleAdd" type="primary" icon="el-icon-plus" plain>新增</iep-button>
          <el-checkbox-group v-model="checkList" @change="handleChange">
            <el-checkbox v-for="(v,k) in dictsMap.isReward" :key="k" :label="k">{{v}}</el-checkbox>
          </el-checkbox-group>
        </template>
        <template slot="right">
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
import { dictsMap, columnsMap } from './options'
import { getGroupRewardUserPage, postGroupRewardUser } from '@/api/fams/group_reward'
import mixins from '@/mixins/mixins'
import DialogForm from './DialogForm'
export default {
  components: {
    DialogForm,
  },
  mixins: [mixins],
  data () {
    return {
      dictsMap,
      columnsMap,
      backOption: {
        isBack: true,
      },
      checkList: [],
      isReward: null,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAdd () {
      this.$refs['DialogForm'].formRequestFn = postGroupRewardUser
      this.$refs['DialogForm'].dialogShow = true
    },
    handleChange (value) {
      if (value.length >= 2) {
        this.isReward = null
      } else {
        this.isReward = value.join('')
      }
      this.loadPage()
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id)
    },
    loadPage (param = this.searchForm) {
      this.loadTable({ ...param, isIncome: this.isReward }, getGroupRewardUserPage)
    },
  },
}
</script>
