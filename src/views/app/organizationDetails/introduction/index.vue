<template>
  <div class="introduction">
    <introduction-top :data="data"></introduction-top>
    <introduction-content :data="data"></introduction-content>
  </div>
</template>

<script>
import IntroductionContent from './IntroductionContent/'
import IntroductionTop from './IntroductionTop'
import { getOrgDetail } from '@/api/app/upms/'

export default {
  name: 'Introduction',
  components: { IntroductionContent, IntroductionTop },
  data () {
    return {
      data: {
        establishTime: '',
        structure: '',
      },
    }
  },
  methods: {
    loadData () {
      getOrgDetail(this.$route.query.id).then(({data}) => {
        this.data = data.data
      })
    },
  },
  created () {
    this.loadData()
  },
}
</script>
<style lang="scss" scoped>
.introduction {
  margin: 20px;
}
</style>
