<template>
  <div>
    <div class="material" v-if="'/app/resource/project_list'==routerMatch[routerMatch.length-1].path">
      <div class="wealth">
        <div class="library">
          <librarys ref="librarys" class="librarys" @joinUpTwo="joinUpEnd"></librarys>
        </div>
        <div class="piece">
          <ranking></ranking>
          <!-- <div class="project-pk" @click="handlePKClick">项目PK</div> -->
        </div>
        <dialog-show class="dialog-show" ref="DialogShow"></dialog-show>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import Librarys from './Librarys/'
import Ranking from './Ranking/'
import { getRectagsList } from '@/api/app/tms/index'
import { getGuessList } from '@/api/app/mlms/index'
import DialogShow from './DialogShow'
import { mapMutations } from 'vuex'

export default {
  components: { Librarys, Ranking, DialogShow },
  data () {
    return {
      listList: [],
      routerMatch: this.$route.matched,
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.routerMatch = to.matched
    next()
  },
  methods: {
    ...mapMutations({
      setProjectPkDialogShow: 'SET_PROJECT_PK_DIALOG_SHOW',
    }),
    changePage (val) {
      this.$refs['librarys'].loadPage({ projectName: val })
    },
    // handlePKClick () {
    //   this.$refs['DialogShow'].dialogShow = true
    // },
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({ data }) => {
        this.labelList = data.data
      })
    },
    // 猜你想找
    getGuessList () {
      getGuessList().then(({ data }) => {
        this.listList = data.data
      })
    },
    joinUpEnd (ids) {
      this.$refs['DialogShow'].arrId = ids
      this.setProjectPkDialogShow(true)
    },
  },
  created () {
    this.getRectagsList()
    this.getGuessList()
  },
}
</script>
<style lang="scss" scoped>
.library {
  min-height: calc(100vh - 120px);
}
.piece {
  cursor: pointer;
}
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 0;
  }
}
.wealth {
  width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  display: grid;
  grid-column-gap: 30px;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 900px) minmax(100px, 300px);
}
.el-card {
  border: 0;
}
.library {
  padding-right: 30px;
  border-right: 1px solid #ebeef5;
}
.project-pk {
  width: 100%;
  text-align: center;
  color: red;
}
</style>
