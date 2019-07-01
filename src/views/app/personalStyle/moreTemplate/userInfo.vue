<template>
  <div class="userInfo">
    <div class="row">
      <div class="item" v-for="(item, index) in firstFormList" :key="index">
        <span class="label">{{item.name}}：</span>
        <span class="span">{{item.type ? userInfo[item.value].join('、') : userInfo[item.value]}}</span>
      </div>
    </div>
  </div>
</template>

<script>
const firstFormList = [
  {
    name: '工号',
    value: 'staffId',
  }, {
    name: '职务',
    value: 'job',
  }, {
    name: 'QQ',
    value: 'qq',
  }, {
    name: '联系电话',
    value: 'phone',
  }, {
    name: '岗位',
    value: 'positionName',
  }, {
    name: '职称',
    value: 'title',
  }, {
    name: '微信',
    value: 'wechat',
  }, {
    name: '邮箱',
    value: 'email',
  }, {
    name: '所在组织',
    value: 'orgList',
    type: 'list',
  },
]

export default {
  props: {
    userInfo: {
      type: Object,
    },
  },
  data () {
    return {
      firstFormList,
    }
  },
  methods: {
    toString (list) {
      return list.join('、')
    },
  },
}
</script>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  .row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      margin-bottom: 10px;
      min-width: 25%;
      .label {
        text-align: right;
      }
      .span {
        flex: 1;
      }
    }
  }
}
</style>
