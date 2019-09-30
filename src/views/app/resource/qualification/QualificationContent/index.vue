<template>
  <div class="gird-qualification">
    <div class="leaderBoard">
      <IepAppTabsCard :linkName="linkName">

        <iep-tabs v-model="activeTab" :tab-list="tabList"></iep-tabs>
        <whole :list="list"></whole>

        <div class="page">
          <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange">
          </el-pagination>
        </div>
      </IepAppTabsCard>
    </div>
  </div>
</template>
<script>
import Whole from './Whole'
import { getHonorSign, getHonorPage } from '@/api/app/mlms/honor'
import { getCertificatePage } from '@/api/app/hrms'

export default {
  components: {
    Whole,
  },
  data () {
    return {
      linkName: '',
      tabList: [{
        label: '全部',
        value: '',
      }],
      activeTab: '',
      total: 0,
      params: {
        current: 1,
        size: 12,
        honorQualType: '',
      },
      list: [],
    }
  },
  methods: {
    loadPageSearch (val) {
      this.params.current = 1
      this.loadPage(val)
    },
    // 获取分页
    loadPage (params = {}) {
      getHonorPage(Object.assign({}, this.params, params)).then(({ data }) => {
        this.list = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      if (this.activeTab == 99) {
        this.getCertificatePage()
      }
      else {
        this.loadPage()
      }
    },
    // 获取选项卡
    getHonorSign (params = {}) {
      getHonorSign(Object.assign({}, this.params, params)).then(({ data }) => {
        this.tabList = this.tabList.concat(data.data)
        this.tabList.push({
          label: '个人证书',
          value: '99',
        })
      })
    },
    getCertificatePage () {
      getCertificatePage().then(({ data }) => {
        this.list = data.data.records.map(m => {
          return {
            honorQualName: m.name,
            image: m.annex,
          }
        })
        this.total = data.data.total
      })
    },
  },
  created () {
    this.getHonorSign()
  },
  watch: {
    activeTab (newVal) {
      if (newVal == 99) {
        this.params.current = 1
        this.getCertificatePage()
      }
      else {
        if (newVal == 0) newVal = ''
        this.params.current = 1
        this.params.honorQualType = newVal
        this.loadPage()
      }
    },
  },
}
</script>
<style scoped lang="scss">
.page {
  text-align: center;
}
.iep-tabs >>> .el-tabs__content {
  padding: 0 20px 20px 20px;
}
.gird-qualification {
  margin: 0 auto;
  padding: 20px 0;
  width: 1200px;
  height: 100%;
  display: grid;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 28fr) minmax(100px, 55fr) minmax(
      100px,
      28fr
    );
  .leaderBoard {
    grid-column-start: 1;
    grid-column-end: 4;
  }
}
</style>
<style scoped>
.gird-qualification >>> .el-card {
  border: none;
  padding: 0;
}
</style>
