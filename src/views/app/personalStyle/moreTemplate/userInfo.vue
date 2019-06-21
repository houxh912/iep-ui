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
  .row {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    .item {
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
  .first {
    .item {
      width: 50%;
    }
  }
  .second {
    .item {
      width: 100%;
    }
  }
}
</style>
