<template>
  <basic-container class="library">
    <h1>问答库管理</h1>
    <div class="content">
      <classifies class="classifies"></classifies>
      
    </div>
  </basic-container>
</template>

<script>
import classifies from './classifies'
export default {
  components: { classifies },
  data () {
    return {
      
    }
  },
}
</script>

<style lang="scss" scoped>
.library {
  .content {
    .classifies {
      width: 300px;
    }
  }
}
</style>