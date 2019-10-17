<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="中心词名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="标签级别">
        <el-select v-model="form.levelId" clearable placeholder="请选择">
          <el-option v-for="item in levelNameOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="form.typeId" clearable placeholder="请选择">
          <el-option v-for="item in typeNameOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
        <el-button @click="clearSearchParam" size="mini">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getTagTypeList } from '@/api/tms/tag-type'
import { getTagLevelList } from '@/api/tms/tag-level'
export const initSearchForm = () => {
  return {
  }
}
export default {
  data () {
    return {
      form: {
        name: '',
        levelId: [],
        typeId: [],
      },
      isLoading: true,
      typeNameOpts: [],
      levelNameOpts: [],
    }
  },
  computed: {
  },
  created () {
    this.loadTagProp()
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      this.form = initSearchForm()
      this.$emit('clear-search-param')
    },
    loadTagProp () {
      getTagTypeList().then(res => {
        this.typeNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.typeId,
          }
        })
      })
      getTagLevelList().then(res => {
        this.levelNameOpts = res.data.map(m => {
          return {
            label: m.name,
            value: m.levelId,
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.inline-input {
  width: 100%;
}
</style>

