<template>
  <el-form :model="form" :label-width="type==='1'?'80px':'120px'" size="small">
    <el-form-item label="客户名称">
      <el-input v-model="form.clientName" placeholder="请输入客户名称"></el-input>
    </el-form-item>
    <el-form-item label="区域类型">
      <el-select v-model="form.districtType" placeholder="请选择区域类型">
        <el-option v-for="item in dictGroup['crms_district_type']" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客户关系">
      <el-select v-model="form.clientRela" placeholder="请选择客户关系">
        <el-option v-for="item in dictGroup['crms_client_relation']" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="跟进状态">
      <el-select v-model="form.followUpStatus" placeholder="请选择跟进状态">
        <el-option v-for="item in dictGroup['crms_follow_up_status']" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="业务类型">
      <el-select v-model="form.businessTypeKey" multiple placeholder="请选择跟进状态">
        <el-option v-for="item in dictGroup['crms_business_type']" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="市场经理" v-if="type==='1'">
      <el-input v-model="form.marketManager" placeholder="请输入市场经理"></el-input>
    </el-form-item>
    <el-form-item label="距离上次拜访" v-if="type!='1'">
      <el-date-picker v-model="form.lastTime" align="right" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <iep-button type="primary" @click="searchPage" size="mini">搜索</iep-button>
      <iep-button @click="clearSearchParam" size="mini">清空</iep-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import { allSearchForm, initSearchForm } from '../options'
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
    if (this.type === '1') {
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
      if (this.type === '1') {
        this.form = allSearchForm()
      } else {
        this.form = initSearchForm()
      }
    },
  },
}
</script>
