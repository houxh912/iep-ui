<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="项目阶段">
        <iep-dict-select v-model="form.projectLevel" dict-name="prms_project_stage" style="width: 100%"></iep-dict-select>
      </el-form-item> -->
      <el-form-item label="所属组织">
        <iep-select v-model="form.orgId" prefix-url="admin/org/all" style="width: 100%"></iep-select>
      </el-form-item>
      <el-form-item label="项目等级">
        <iep-dict-select v-model="form.projectLevel" dict-name="prms_project_level" style="width: 100%"></iep-dict-select>
      </el-form-item>
      <el-form-item label="是否产品关联">
        <el-radio-group v-model="form.isRelevanceProduct">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目经理">
        <el-input v-model="form.manager"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm, dictMap, rules } from './const'
// import { getContactAssociate } from '@/api/crms/contact'
// import { getPageData } from '@/api/crms/customer'
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      form: initSearchForm(),
      restaurants: [],
      clientList: [],
      isLoading: true,
      dictMap,
      rules,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
    ...mapState({
      orgId: state => state.user.userInfo.orgIds,
    }),
  },
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
  created () {
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
      this.$emit('clear-search-param')
    },
  },
}
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

