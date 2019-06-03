<template>
  <div class="detail" v-html="htmlStr">

  </div>
</template>

<script>
export default {
  props: {
    htmlStr: {
      type: String,
      default: '',
    },
  },
  data () {
    return {

    }
  },
  computed: {

  },
}
</script>
<style lang="scss" scoped>
.detail {

}
</style>

<style scoped>

</style>
