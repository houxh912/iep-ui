<template>
  <div class="userInfo">
    <div class="row first">
      <div class="item" v-for="(item, index) in firstFormList" :key="index">
        <span class="label">{{item.name}}：</span>
        <span class="span">{{item.value}}</span>
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
const firstFormList = [
  {
    name: '岗位',
    value: 'value',
  }, {
    name: 'QQ',
    value: 'value',
  }, {
    name: '职称',
    value: 'value',
  }, {
    name: '微信',
    value: 'value',
  }, {
    name: '职务',
    value: 'value',
  }, {
    name: '联系电话',
    value: 'value',
  }, {
    name: '邮箱',
    value: 'value',
  },
]

const secondFormList = [
  {
    name: '所在组织',
    value: 'value',
  }, {
    name: '特设机构',
    value: 'value',
  },
]
export default {
  data () {
    return {
      firstFormList,
      secondFormList,
    }
  },
}
</script>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  .row {
    width: 50%;
  }
  .first {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 120px;
        text-align: right;
      }
      .span {
        flex: 1;
      }
    }
  }
}
</style>
