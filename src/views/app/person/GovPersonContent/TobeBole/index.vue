<template>
  <div>
    <div class="material" v-if="'/app/tobeBole'==routerMatch[routerMatch.length-1].path">
      <div class="library">
        <librarys></librarys>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Librarys from './Librarys/'
import { getRectagsList } from '@/api/app/tms/index'

export default {
  components: { Librarys },
  data () {
    return {
      labelTitle: '热门标签',
      labelList: [],
      dataList: [],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({data}) => {
        this.labelList = data.data
      })
    },
  },
  created () {
    this.getRectagsList()
  },
}
</script>
<style lang="scss" scoped>
.material {
  width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.ranking {
  padding: 0;
}
.el-card{
  border:0;
}
.library{
  padding-right: 20px;
  border-right: 1px solid #EBEEF5;
}
</style>
