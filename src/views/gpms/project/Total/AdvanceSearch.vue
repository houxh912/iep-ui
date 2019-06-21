<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="项目阶段" prop="projectStage">
        <iep-dict-select v-model="form.projectStage" dict-name='' style="width: 100%"></iep-dict-select>
      </el-form-item>
      <el-form-item label="项目等级" prop="projectLevel">
        <iep-dict-select v-model="form.projectLevel" dict-name='' style="width: 100%"></iep-dict-select>
      </el-form-item>
      <el-form-item label="是否项目关联" prop="associatedProducts">
        <el-radio-group v-model="form.associatedProducts">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目经理" prop="projectManager">
        <el-input v-model="form.projectManager"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm } from './const'
// import { getContactAssociate } from '@/api/crms/contact'
import { getPageData } from '@/api/crms/customer'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {},
      restaurants: [],
      clientList: [],
      isLoading: true,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
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
    },
    querySearch (queryString, cb) {
      getPageData({ clientName: queryString }).then(res => {
        if (res.data.data.records.length > 0) {
          let data = res.data.data.records.map(m => {
            return { value: m.clientName }
          })
          cb(data)
        }
      })
    },
    handleSelect (item) {
      console.log(item)
    },
  },
}
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

