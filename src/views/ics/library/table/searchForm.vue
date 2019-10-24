<template>
  <operation-search @search-page="searchPage" :paramForm="paramForm" prop="question">
    <el-form :model="paramForm" label-width="80px" size="small">
      <el-form-item label="材料名称">
        <el-input v-model="paramForm.question"></el-input>
      </el-form-item>
    </el-form>
  </operation-search>
</template>

<script>
import { getConfigureTree } from '@/api/mlms/material/datum/configure'
import { initSearchForm } from './options'

export default {
  data () {
    return {
      paramForm: initSearchForm(),
      firstClass: [],
      secondClass: [],
    }
  },
  methods: {
    searchPage (val) {
      this.$emit('searchPage', val)
    },
    // 分类配置
    firstClassChange (val) {
      this.paramForm.materialClsSecondClass = ''
      for (let item of this.firstClass) {
        if (item.id == val) {
          this.secondClass = item.childrens
          return
        }
      }
    },
    clearSearchParam () {
      this.paramForm = initSearchForm()
    },
  },
  created () {
    getConfigureTree().then(({ data }) => {
      this.firstClass = data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.Classes {
  display: flex;
  justify-content: space-between;
  .first, .second {
    width: 49%;
  }
}
</style>
