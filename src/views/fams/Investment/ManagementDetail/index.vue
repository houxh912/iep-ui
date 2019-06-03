<template>
  <div class="fams-person">
    <basic-container>
      <fams-person-top></fams-person-top>
      <fams-person-content></fams-person-content>
    </basic-container>
  </div>
</template>

<script>
import FamsPersonContent from './FamsPersonContent/'
import FamsPersonTop from './FamsPersonTop'
export default {
  name: 'FamsPerson',
  components: { FamsPersonContent, FamsPersonTop },
  data () {
    return {
    }
  },
}
</script>
<style scoped>
</style>

