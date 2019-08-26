<template>
  <basic-container>
    <iep-page-header title="我的项目" :replaceText="replaceText" :data="[sum]"></iep-page-header>
    <total ref="table" :tabType="'1'" @statistics="statistics($event)"></total>
  </basic-container>
</template>
<script>
import Total from './Total/'
// import { getDataDetail } from '@/api/gpms/index'

export default {
  components: { Total },
  data () {
    return {
      replaceText: (data) => `[共${data[0]}条数据]`,
      sum: '',
    }
  },
  methods: {
    statistics (val) {
      this.sum = val
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
