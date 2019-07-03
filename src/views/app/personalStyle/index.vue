<template>
  <div>
    <div class="personal">
      <person-top :user_info="userInfo"></person-top>
      <person-content :userInfo="userInfo"></person-content>
    </div>
    <IepAppFooterBar></IepAppFooterBar>
  </div>
</template>

<script>
import { getUserDetail } from '@/api/app/hrms/'
import PersonTop from './PersonTop'
import PersonContent from './PersonContent/'

export default {
  components: {
    PersonTop, PersonContent,
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.getUserDetail()
    })
    next()
  },
  data () {
    return {
      userInfo: {
        identityMarks: [],
        tagList: [],
        similarUser: [],
        orgList: [],
        rankMap: {xyz: 0, hydpm: 0, sjzc: 0, gmbpm: 0},
        indexMap: {xx: 0, cxfw: 0, xz: 0, gz: 0, gl: 0, cfzz: 0},
      },
    }
  },
  methods: {
    // 获取用户信息
    getUserDetail () {
      getUserDetail(this.$route.params.id).then(({data}) => {
        let obj = data.data
        obj.tagList = obj.abilityTag.concat(obj.learningTag, obj.projectTag)
        this.userInfo = obj
      })
    },
  },
  created () {
    this.getUserDetail()
  },
}
</script>
<style lang="scss" scoped>
.personal {
  margin: 0 auto;
  width: 1200px;
}
</style>
