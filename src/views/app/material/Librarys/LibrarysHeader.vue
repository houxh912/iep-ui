<template>
  <div class="librarys-header">
    <div class="left">
      <div :label="title" name="first">{{title}}<span>{{data}}</span></div>
    </div>
    <div class="right">
      <operation-search @search-page="searchPage" advance-search>
        <advance-search @search-page="searchPage"></advance-search>
      </operation-search>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '材料库',
    }
  },
}
</script>
<style lang="scss" scoped>
.librarys-header{
  height: 52px;
  padding-top: 8px;
  border-bottom: solid 1px #e6e6e6;
  .left{
    float: left;
    > div{
      font-size: 18px;
      line-height: 42px;
      padding:0 10px;
      border-bottom: 2px solid #ba1b21;
    }
  }
  .right{
    float: right;
  }
}
</style>
