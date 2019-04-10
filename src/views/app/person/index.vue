<template>
  <div class="gov-person">
    <gov-person-top></gov-person-top>
    <gov-person-content></gov-person-content>
  </div>
</template>

<script>
import GovPersonContent from './GovPersonContent/'
import GovPersonTop from './GovPersonTop/'
export default {
  name: 'govPerson',
  components: { GovPersonContent, GovPersonTop },
}
</script>
<style scoped>
.gov-person >>> .el-card {
  border-radius: 0;
}
</style>

