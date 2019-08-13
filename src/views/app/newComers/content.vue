<template>
  <div class="content">
    <iep-html v-model="data"></iep-html>
  </div>
</template>

<script>
import { getPageByIndexId } from '@/api/conm/article_controller'
export default {
  data () {
    return {
      data: '',
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.getData(this.$route.query.id)
    })
    next()
  },
  methods: {
    getData (id) {
      getPageByIndexId(id).then(({ data }) => {
        if (data.data) {
          this.data = data.data.content
        }
      })
    },
  },
  created () {
    let id = this.$route.query.id ? this.$route.query.id : 12
    this.getData(id)
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding: 45px;
}
</style>
