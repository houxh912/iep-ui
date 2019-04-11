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
.gov-person >>> .cardTitle {
  font-size: 16px;
}
.GovPerson-content >>> .more:hover,
.GovPerson-content >>> .more:focus {
  color: #cb3737;
}
.GovPerson-content >>> .important {
  float: right;
  color: #cb3737;
}
.GovPerson-content >>> .important:hover,
.GovPerson-content >>> .important:focus {
  color: #f56c6c;
}
</style>

