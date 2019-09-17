<template>
  <div class="join-org-wrapper">
    <a-input-group class="search-box" compact>
      <a-select :defaultValue="null" style="width: 120px" @change="handleChange">
        <a-select-option :key="null" :value="null">全部</a-select-option>
        <a-select-option v-for="item in GOMS_ORG_TYPE" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
      </a-select>
      <a-input-search style="width: 50%" placeholder="请输入组织名进行搜索" @search="onSearch" enterButton />
    </a-input-group>
    <iep-no-data v-if="!orgList.length" message="无相关组织"></iep-no-data>
    <div class="select-org-container">
      <el-button :disabled="!!item.isApplyed" class="grid-item" v-for="(item,index) in orgList" :key="index" @click="handleApplyJoin(item.orgId)">{{item.name}}</el-button>
    </div>
    <apply-form-dialog ref="ApplyFormDialog" @load-page="loadPage"></apply-form-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getICanOrgList, getOrgById } from '@/api/goms/org'
import ApplyFormDialog from './ApplyFormDialog'
export default {
  components: { ApplyFormDialog },
  data () {
    return {
      orgType: '1',
      orgList: [],
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
    GOMS_ORG_TYPE () {
      return this.dictGroup['GOMS_ORG_TYPE']
    },
  },
  async created () {
    this.loadPage()
    if (this.$route.query.orgId) {
      this.handleApplyJoin(this.$route.query.orgId)
    }
  },
  methods: {
    handleChange (value) {
      this.orgType = '' + value
    },
    handleApplyJoin (orgId) {
      getOrgById(orgId).then(({ data }) => {
        const form = data.data
        this.$refs['ApplyFormDialog'].form = { ...form }
        this.$refs['ApplyFormDialog'].DialogShow = true
      })
    },
    onSearch (orgName) {
      this.loadPage(orgName, this.orgType)
    },
    async loadPage (orgName = null, orgType = null) {
      const { data } = await getICanOrgList(orgName, orgType)
      this.orgList = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.join-org-wrapper {
  text-align: center;
}
.search-box {
  margin: 10px 0;
}
.select-org-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  .grid-item {
    margin: 10px 20px;
  }
}
</style>
