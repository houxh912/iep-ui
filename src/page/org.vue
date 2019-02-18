<template>
  <div>
    <basic-container>
      <div class="select-org-wrapper">
        <div class="top-wrapper">
          <i class="el-icon-warning"></i>
          <span class="remind-text">您尚未加入任何组织，请选择</span>
          <el-button type="primary" size="mini" round>加入组织</el-button>
          <el-button type="text" size="mini">创建组织</el-button>
        </div>
        <div class="bottom-wrapper">

        </div>
      </div>
    </basic-container>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { getOrgList } from '@/api/admin/org'
export default {
  name: 'org',
  created () {
    this.loadOrg()
  },
  methods: {
    loadOrg () {
      getOrgList().then(({ data }) => {
        console.log(data)
      })
    },
  },
}
</script>

<style scoped="scoped" lang="scss">
.select-org-wrapper {
  padding: 10px 30px;
  .top-wrapper {
    color: #666;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    .remind-text {
      font-size: 14px;
      margin-right: 10px;
      margin-left: 5px;
    }
  }
}
</style>
