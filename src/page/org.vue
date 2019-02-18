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
          <div class="grid-container">
            <el-button class="grid-item" v-for="(item,index) in orgList" :key="index" round>{{item.name}}</el-button>
          </div>
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
  data () {
    return {
      orgList: [],
    }
  },
  created () {
    this.loadOrg()
  },
  methods: {
    loadOrg () {
      getOrgList().then(({ data }) => {
        this.orgList = data.data
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
  .bottom-wrapper {
    margin-top: 10px;
    .grid-container {
      display: grid;
      grid-template-columns: auto auto auto auto;
      .grid-item {
        margin: 10px 20px;
      }
    }
  }
}
</style>
