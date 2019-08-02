<template>
  <div class="card-btn-grid">
    <div @click="$openPage('/fams/org_borrow/org_borrow')">组织拆借</div>
    <div @click="$openPage('/fams_spa/organization_transfer')">组织转账</div>
    <div @click="$openPage('/fams_spa/organization_reward')">组织打赏/扣减</div>
    <div>投资管理</div>
    <div @click="$openPage('/fams/financial_management/organizational_budget')">组织预算</div>
    <div @click="$openPage('/fams_spa/org_payment_plan/0')">回款计划</div>
    <div @click="$openPage(`/app/data_assets_detail?id=${userInfo.orgId}&name=${userInfo.orgName}`)">组织资产</div>
  </div>
</template>
<script>
export default {
  name: 'IepCardBtn',
}
</script>
<style lang="scss" scoped>
.card-btn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  & > div {
    cursor: pointer;
    padding: 10px;
    text-align: center;
    border: 1px solid #eee;
    color: #666;
    &:hover {
      border: 1px solid #ba1b21;
      color: #ba1b21;
    }
  }
}
</style>



