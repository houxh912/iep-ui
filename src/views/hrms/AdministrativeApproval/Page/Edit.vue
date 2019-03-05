<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="****的转正申请" :backOption="backOption"></page-header>
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
        backPath: null,
        backFunction: this.handleGoBack,
      },
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
