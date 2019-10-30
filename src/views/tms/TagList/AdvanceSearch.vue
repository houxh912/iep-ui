<template>
  <div>
    <el-form :model="form" label-width="100px" size="small">
      <el-form-item label="标签名称:">
        <el-input placeholder="请输入标签名称" v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="标签属性:">
        <el-select v-model="form.isFree" clearable placeholder="请选择">
          <el-option key="0" label="游离词" :value="0"></el-option>
          <el-option key="1" label="中心词" :value="1"></el-option>
          <el-option key="2" label="卫星词" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签分类:">
        <el-select v-model="form.typeId" clearable placeholder="请选择">
          <el-option v-for="item in typeNameOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签级别:">
        <el-select v-model="form.levelId" clearable placeholder="请选择">
          <el-option v-for="item in levelNameOpts" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option key="0" label="废除" :value="0"></el-option>
          <el-option key="1" label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <operation-wrapper>
          <iep-button type="primary" @click="searchPage">搜索</iep-button>
          <iep-button @click="clearSearchParam">清空</iep-button>
        </operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { initSearchForm } from './option'
import { getTagTypeList } from '@/api/tms/tag-type'
import { getTagLevelList } from '@/api/tms/tag-level'
export default {
  data () {
    return {
      form: initSearchForm(),
      typeNameOpts: [],
      levelNameOpts: [],
    }
  },
  computed: {
  },
  // mounted () {
  //   this.restaurants = this.loadAll()
  // },
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

