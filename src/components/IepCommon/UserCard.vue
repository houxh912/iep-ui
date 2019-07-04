<template>
  <div class="user-card-wrapper">
    <div class="user-info">
      <div class="avatar">
        <iep-img class="img" src="//183.131.134.242:10060/upload/iep/201904/4098d00d-abfc-4c3a-8ed4-c8acb25d986c_TIM%E5%9B%BE%E7%89%8720190430171530.jpg"></iep-img>
      </div>
      <div class="user-wrapper">
        <div class="user-title">
          <div class="name">杨冰之</div>
          <div class="position">董事长</div>
          <div class="identity-mark">
            <iep-identity-mark icon="iep2-icondongshichang" title="董事长"></iep-identity-mark>
            <iep-identity-mark icon="iep2-iconzongjingli" title="总经理"></iep-identity-mark>
            <iep-identity-mark icon="iep2-icontouziren1" title="投资人"></iep-identity-mark>
          </div>
        </div>
        <iep-div-detail class="user-org" :value="`所属组织: 集团研发中心、集团研发中心、集团研发中心`"></iep-div-detail>
        <iep-div-detail class="user-tags" :value="`卓越标签: 集团研发中心 / 集团研发中心 / 集团研发中心`">
        </iep-div-detail>
      </div>
    </div>
    <div class="user-operation">
      <div class="item">
        <div class="count">670</div>
        <div class="label">信用值</div>
      </div>
      <div class="item">
        <div class="count">11</div>
        <div class="label">活跃度</div>
      </div>
      <div class="item">
        <div class="count">1</div>
        <div class="label">财富排名</div>
      </div>
      <div class="item">
        <div class="count">1</div>
        <div class="label">数据资产</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepUserCard',
}
</script>
<style lang="scss" scoped>
.user-card-wrapper {
  width: 470px;
  display: flex;
  flex-direction: column;
}
.user-operation {
  display: flex;
  flex: 0 0 60px;
  justify-content: space-around;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-right: 1px solid #eee;
    &:last-child {
      border-right: none;
    }
    .count {
      font-size: 18px;
    }
    .label {
      color: #aaa;
      line-height: 14px;
    }
  }
}
.user-info {
  display: flex;
  flex: 1;
  .avatar {
    padding: 10px;
    flex: 0 0 120px;
    .img {
      width: 100px;
      height: 100px;
    }
  }
  .user-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    flex: 0 0 350px;
    width: 350px;
  }
}
.user-org,
.user-tags {
  color: #999;
}
.user-title {
  display: flex;
  align-items: center;
  .name {
    font-size: 25px;
    margin-right: 10px;
  }
  .position {
    color: #aaa;
    margin-right: 10px;
  }
  .identity-mark {
    display: flex;
  }
}
</style>
