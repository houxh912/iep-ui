<template>
  <div>
    <iep-page-header is-advance :backOption="backOption"></iep-page-header>
    <div class="fams-person-top">
      <el-card shadow="hover">
        <div class="fams-top-con">
          <div class="img">
            <iep-img src="/img/app/logo01.jpg" alt=""></iep-img>
          </div>
          <div class="text">
            <span class="title">{{title}}</span>
            <span class="detail">
              <span>创建人：{{founder}}</span>
              <span>核准人：{{auditor}}</span>
              <span>开始时间：{{startTime}}</span>
              <span>结束时间：{{endTime}}</span>
            </span>
          </div>
          <div class="situation">
            <span class="ready">已募集金额<span class="sum">{{sum}}</span>
              <el-tag type="danger" size="mini">{{doIt}}</el-tag>
            </span>
            <span class="target">目标金额：{{targetSum}}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      title: '舟山研发中心',
      founder: '杨冰之',
      auditor: '王俊辉',
      startTime: '2019-04-13',
      endTime: '2019-05-13',
      sum: '￥2000000',
      doIt: '进行中',
      targetSum: '￥2300000',
    }
  },
}
</script>

<style lang="scss" scoped>
.fams-person-top {
  display: flex;
  margin-top: -20px;
  align-items: center;
  align-content: center;
  height: 180px;
  text-align: center;
  background-size: 100% 100%;
  .el-card {
    width: 100%;
  }
  .fams-top-con {
    display: flex;
    margin: 0 auto;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    .detail {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      width: 360px;
      span {
        width: 180px;
        text-align: left;
      }
    }
    .text {
      display: flex;
      flex: 2;
      margin-left: 30px;
      flex-direction: column;
      align-items: flex-start;
      flex-wrap: wrap;
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 18px;
        font-size: 18px;
      }
    }
    .img {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 140px;
      height: 100px;
      border: 1px solid #ebeef5;
      overflow: hidden;
      background-color: #fff;
      &:hover {
        box-shadow: 0 1px 1px 1px #eee;
      }
      img {
        display: block;
        width: 100%;
        height: 100%;
        transition: 0.5s;
      }
    }
    .situation {
      display: flex;
      align-items: flex-start;
      flex: 1;
      flex-flow: column nowrap;
    }
    .ready {
      font-size: 16px;
    }
    .sum {
      margin: 0 5px 0 10px;
      font-size: 24px;
    }
  }
}
</style>


