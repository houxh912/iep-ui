<template>
  <div class="user-card-wrapper">
    <div class="user-info">
      <div class="avatar">
        <iep-img class="img" :src="cardData.avatar"></iep-img>
      </div>
      <div class="user-wrapper">
        <div class="user-title">
          <div class="name">{{cardData.name}}</div>
          <div class="position">{{cardData.job}}</div>
          <div class="identity-mark">
            <iep-identity-mark v-for="item in cardData.identityMarks" :icon="item.icon" :key="item.value" :title="item.label"></iep-identity-mark>
          </div>
        </div>
        <template>
          <iep-div-detail v-if="!cardData.orgList.length" class="user-org" :value="`所属组织：暂无`"></iep-div-detail>
          <iep-div-detail v-else class="user-org" :value="`所属组织：${cardData.orgList.join('、')}`"></iep-div-detail>
        </template>
        <template>
          <iep-div-detail v-if="!cardData.projectTag.length" class="user-tags" :value="`专业标签：暂无`"></iep-div-detail>
          <iep-div-detail v-else class="user-tags" :value="`专业标签：${cardData.projectTag.join(' / ')}`"></iep-div-detail>
        </template>
      </div>
    </div>
    <!-- <div class="user-operation">
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
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'IepUserCard',
  props: {
    cardData: {
      type: Object,
      required: true,
    },
  },
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
    justify-content: center;
    width: 100%;
    border-right: 1px solid #eee;
    &:last-child {
      border-right: none;
    }
    .count {
      font-size: 18px;
      font-weight: 600;
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
    justify-content: space-around;
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
