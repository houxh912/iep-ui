<template>
  <el-card shadow="always" :body-style="{padding:'15px'}">
    <el-row class="info">
      <el-col :span='24' class="title">
        <h2 class="user">hello，{{infoList.name}}！</h2>
        <div class="msg">
          您累计签订合同
          <span class="red">12</span>
          份 / 排名
          <span class="red">3</span>
          位
        </div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>33</span> 客户
        </div>
        <div class="content">超过了 60% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>6</span> 联系人
        </div>
        <div class="content">超过了 30% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>5</span> 合同
        </div>
        <div class="content">超过了 55% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>65w</span> 合同金额
        </div>
        <div class="content">超过了 91% 的同事</div>
      </el-col>
      <el-col class="tab">
        <div class="head">
          <span>5</span> 软件
        </div>
        <div class="content">超过了 {{infoList.cent}} 的同事</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      infoList: {
        name: '超级管理员',
        num: 12,
        cent: '30%',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.info {
  .title {
    line-height: 40px;
    padding: 0 15px;
    display: flex;
    .user {
      margin: 0 15px 0 0;
      font-size: 22px;
    }
    .msg {
      height: 40px;
      line-height: 50px;
      .red {
        color: #f00;
      }
    }
  }
  .tab {
    padding: 5px 15px;
    width: 20%;
    border-left: 1px dashed #ddd;
    text-align: center;
    color: #666;
    font-size: 14px;
    span {
      color: #000;
      font-size: 20px;
    }
  }
  .tab:nth-of-type(2) {
    border: 0;
  }
}
</style>
