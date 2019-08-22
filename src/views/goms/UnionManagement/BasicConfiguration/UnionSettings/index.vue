<template>
  <div>
    <basic-container>
      <iep-page-header title="联盟操作"></iep-page-header>
      <el-row class="row-bg">
        <el-col :span="12" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>联盟转让<i></i></span>
            </div>
            <div class="text item">
              联盟创建者可将联盟装让给联盟现有的管理员之一；转让后，创建者自动退出联盟管理。
            </div>
            <el-button type="warning" plain>转让</el-button>
          </div>
        </el-col>
        <el-col :span="12" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>联盟解散<i></i></span>
            </div>
            <div class="text item">
              联盟创建者可解散联盟；解散后，联盟内的所有消息记录和成员信息都会删除，成员将无法进入，请谨慎操作。
            </div>
            <el-button type="warning" plain>解散</el-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.organize-group {
  text-align: center;
  .el-button.is-circle {
    margin: 20px 60px;
    width: 120px;
    height: 120px;
    border-color: #f7f7f7;
    background-color: #f7f7f7;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    span {
      display: block;
      margin-top: 10px;
    }
    i {
      display: block;
      margin-bottom: 10px;
      font-size: 34px !important;
      color: #bf051a;
    }
    &:hover,
    &:focus {
      background-color: #bf051a;
      color: #fff;
      i {
        color: #fff;
      }
    }
  }
}
.organize-item {
  display: inline-block;
  .sub-title {
    text-align: center;
    span {
      display: block;
      i {
        display: block;
        margin: 0 auto;
        padding-top: 10px;
        width: 30px;
        font-style: normal;
        border-bottom: 1px solid #bf051a;
      }
    }
  }
  .organize-con {
    margin: 20px;
    padding: 25px;
    text-align: center;
    border: 1px solid #d7d7d7;
    background-color: #fff;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    .item {
      margin: 15px 0;
      min-height: 54px;
      text-align: left;
      text-align: justify;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #666;
    }
    &:hover,
    &:focus {
      box-shadow: 0px 1px 1px 1px #eee;
    }
    .el-button--warning.is-plain {
      color: #bf051a;
      border-color: #bf051a;
      background-color: #fff2f4;
      &:hover,
      &:focus {
        background-color: #bf051a;
        color: #fff;
      }
    }
  }
}
</style>
