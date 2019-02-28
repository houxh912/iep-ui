<template>
  <div>
    <basic-container>
      <page-header title="员工成长档案" :backOption="backOption"></page-header>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
export default {
  components: { PageHeader },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
    }
  },
  created () {
    console.log(this.$route)
  },
}
</script>
