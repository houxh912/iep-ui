<template>
  <div>
    <el-form :model="form" label-width="80px" size="small">
      <el-form-item label="客户名称">
        <el-input v-model="form.clientName" placeholder="请输入客户名称"></el-input>
      </el-form-item>
      <el-form-item label="业务类型">
        <el-select v-model="form.businessTypeKey" multiple placeholder="请选择业务类型">
          <el-option v-for="item in dictGroup['crms_business_type']" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="意向程度">
        <el-select v-model="form.intentionLevelValue" placeholder="请选择意向程度">
          <el-option v-for="item in dictGroup['crms_client_intention_level']" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item label="认领状态" v-if="type!=3">
        <el-select v-model="form.statusValue" placeholder="请选择认领状态">
          <el-option v-for="item in dictGroup['crms_client_opportunity_status']" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布者：" v-if="type==='3'">
        <el-input v-model="form.publisher"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button type="primary" @click="searchPage" size="mini">搜索</iep-button>
        <iep-button @click="clearSearchParam" size="mini">清空</iep-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { allSearchForm, initSearchForm } from './options'
export default {
  props: ['type'],
  data () {
    return {
      form: {},
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    if (this.type === '1' && this.type === '2') {
      this.form = allSearchForm()
    } else {
      this.form = initSearchForm()
    }
  },
  methods: {
    searchPage () {
      this.$emit('search-page', this.form)
    },
    clearSearchParam () {
      if (this.type === '1' && this.type === '2') {
        this.form = allSearchForm()
      } else {
        this.form = initSearchForm()
      }
    },
  },
}
</script>
