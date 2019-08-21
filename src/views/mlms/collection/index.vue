<template>
  <component @onDetail="handleDetail" @onGoBack="handleGoBack" :record="record" :is="currentComponet"></component>
</template>

<script>
// 动态切换组件
import List from './Page/List'
import Detail from './Page/Detail'
export default {
  name: 'TableListWrapper',
  components: {
    List,
    Detail,
  },
  data () {
    return {
      currentComponet: 'List',
      record: '',
      detailList: {
        material: {
          name: '材料',
          path: '/mlms_spa/material/detail/',
        },
        meeting: {
          name: '纪要',
          path: '/mlms_spa/summary/detail/',
        },
        thoughts: {
          name: '说说',
          path: '/mlms_spa/thought/detail/',
        },
        honor: {
          name: '荣誉资质',
          path: '',
        },
      },
    }
  },
  methods: {
    handleGoBack () {
      this.record = ''
      this.currentComponet = 'List'
    },
    handleDetail (row) {
      let path = this.detailList[row.type].path
      if (path) {
        this.$router.push(`${path}${row.targetId}`)
      }
    },
  },
  watch: {
    '$route.path' () {
      this.record = ''
      this.currentComponet = 'List'
    },
  },
}
</script>
