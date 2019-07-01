<template>
  <div class="userInfo">
    <div class="row first">
      <div class="item" v-for="(item, index) in firstFormList" :key="index">
        <span class="label">{{item.name}}：</span>
        <span class="span">{{userInfo[item.value]}}</span>
      </div>
    </div>
    <div class="row second">
      <div class="item" v-for="(item, index) in secondFormList" :key="index">
        <span class="label">{{item.name}}：</span>
        <span class="span">{{toString(userInfo[item.value])}}</span>
      </div>
    </div>
  </div>
</template>

<script>
const firstFormList = [
  {
    name: '工号',
    value: 'GM000276',
  },
  {
    name: '岗位',
    value: 'positionName',
  }, {
    name: 'QQ',
    value: 'qq',
  }, {
    name: '职称',
    value: 'title',
  }, {
    name: '微信',
    value: 'wechat',
  }, {
    name: '职务',
    value: 'job',
  }, {
    name: '联系电话',
    value: 'phone',
  }, {
    name: '邮箱',
    value: 'email',
  },
]

const secondFormList = [
  {
    name: '所在组织',
    value: 'orgList',
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
      secondFormList,
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
  flex-direction: column;
  .row {
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      margin-bottom: 10px;
      .label {
        text-align: right;
      }
      .span {
        flex: 1;
      }
    }
  }
  .first {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .item {
      width: 25%;
    }
  }
}
</style>
