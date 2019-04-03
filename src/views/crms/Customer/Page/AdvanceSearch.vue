<template>
  <el-form :model="form" :label-width="type==='1'?'80px':'120px'" size="small">
    <el-form-item label="客户名称">
      <el-input v-model="form.clientName" placeholder="请输入客户名称"></el-input>
    </el-form-item>
    <!-- <el-form-item label="区域类型">
      <iep-dict-select v-model="form.districtType" dict-name="crms_district_type"></iep-dict-select>
    </el-form-item>
    <el-form-item label="客户关系">
      <iep-dict-select v-model="form.clientRela" dict-name="crms_client_relation"></iep-dict-select>
    </el-form-item>
    <el-form-item label="跟进状态">
      <iep-dict-select v-model="form.followUpStatus" dict-name="crms_follow_up_status"></iep-dict-select>
    </el-form-item>
    <el-form-item label="业务类型">
      <iep-dict-select v-model="form.businessTypeKey" dict-name="crms_business_type" multiple></iep-dict-select>
    </el-form-item>
    <el-form-item label="市场经理" v-if="type==='1'">
      <el-input v-model="form.marketManager" placeholder="请输入市场经理"></el-input>
    </el-form-item>
    <el-form-item label="距离上次拜访" v-if="type!='1'">
      <el-date-picker v-model="form.lastTime" align="right" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-form-item> -->
    <el-form-item label="">
      <el-button type="primary" @click="searchPage" size="mini">搜索</el-button>
      <el-button @click="clearSearchParam" size="mini">清空</el-button>
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
      this.$emit('search-page', { type: this.type, ...this.form })
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
