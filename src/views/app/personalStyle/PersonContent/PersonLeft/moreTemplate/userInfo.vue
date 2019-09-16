<template>
  <div class="userInfo">
    <div class="row">
      <div class="item" v-for="(item, index) in firstFormList" :key="index">
        <span class="label">{{item.name}}：</span>
        <!-- <span class="span">{{item.type ? userInfo[item.value].map(m => m.name).join('、') : userInfo[item.value]}}</span> -->
        <span class="span" v-if="item.type">
          <el-tag :type="userInfo.assetOrg === t.id ? 'white' : 'info'" style="cursor: pointer;" v-for="(t, i) in userInfo[item.value]" :key="i" @click="() => { $router.push(`/app/organization_style/${t.id}`) }">{{t.name}}</el-tag>
        </span>
        <span class="span" v-else>{{userInfo[item.value]}}</span>
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
    value: 'dept',
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
  flex-direction: column;
  .row {
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      margin-bottom: 10px;
      min-width: 25%;
      .label {
        text-align: right;
        line-height: 28px;
      }
      .span {
        flex: 1;
        line-height: 28px;
        .el-tag {
          margin-right: 8px;
          margin-bottom: 8px;
          &:last-child {
            margin-right: 0;
          }
        }
        .el-tag:hover {
          color: #cb3737;
        }
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