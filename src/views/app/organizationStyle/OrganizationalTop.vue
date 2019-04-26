<template>
  <div class="organizational-top">
    <div class="img"><img :src="img" alt=""></div>
    <div class="text"></div>
    <div class="operation"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.organizational-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  background: #fafafa url(./img/zzbg.png) no-repeat;
}
</style>
<style scoped>
.organizational-top >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.organizational-top >>> .el-input--small input {
  height: 40px !important;
}
.organizational-top >>> .el-card {
  background-color: #fafafa;
}
.organizational-top >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.organizational-top >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.organizational-top >>> .el-button--danger.is-plain:hover,
.organizational-top >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>
