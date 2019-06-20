<template>
  <div class="wrapper">
    <div class="top">
      <div>
        <p>国家数据库<span>一站式政策服务</span></p>
      </div>
      <div>

      </div>

      <div>
        <hr>
        <el-button icon="el-icon-arrow-up" type="danger" plain>折叠</el-button>
      </div>
    </div>

    <div class="bottom">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #eee;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  box-sizing: border-box;
}
.top {
  width: 1400px;
  height: 500px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: #fff;
  padding: 5px 25px;
  margin: 20px auto;
  vertical-align: baseline;
}
.bottom {
  width: 1400px;
  height: 500px;
  border-radius: 3px;
  background-color: #fff;
  margin: 0 auto 50px auto;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1;
  box-sizing: border-box;
}
</style>
