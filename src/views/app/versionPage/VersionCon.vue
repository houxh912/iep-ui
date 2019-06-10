<template>
  <div class="version-con-list">
    <span class="title">
      <span class="num">当前版本号：2.0.1</span>
    </span>
    <span class="time">更新时间：2019-06-06 19:00</span>
    <div class="piece" v-for="(item,i) in versionList" :key="i">
      <span class="name">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: '2.0.1',
      name: '更新日志',
      time: '2019-06-06',
      versionList: [
        '1.新增财富模块；新增国脉贝获取规则及相关功能；',
        '2.新增投资模块；',
        '3.新增在线工资发放功能；',
        '4.新增财务管理模块；新增组织财务与资产管理相关模块；新增集团账务管理模块；',
        '5.新增报销申请、开票、打赏、提现等功能；',
        '6.新增国脉贝发行，资金调拨相关功能；',
        '7.新增合同关联客户修改为联想输入功能；修复合同编辑页面异常的问题；',
        '8.修复会议纪要统计数据不准确的问题；',
        '9.修复劳动合同保存异常的问题；',
        '10.新增说说列表；新增相关评论和点赞功能；',
        '11.修复建议收取异常的问题；',
        '12.修复客户模块的拜访日志异常的问题；',
        '13.修复客户联系人导入验证异常的问题；',
        '14.新增客户联系人与相关客户添加完善的功能；',
        '15.新增未读邮件的独立提醒功能；',
        '16.新增操作手册、挖贝攻略、常见问题、各类管理制度规范等；新增版本日志；',
        '17.其它已知问题的修复与各类交互功能的优化。',
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.version-con-list {
  padding-top: 25px;
  padding-left: 15px;
  .piece {
    position: relative;
    cursor: pointer;
    padding-left: 15px;
    .name {
      display: inline-block;
      width: 70%;
      height: 30px;
      line-height: 30px;
      transition: all 0.5s;
      &:hover {
        color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #ddd;
    }
  }
  .title {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 5px;
    font-size: 20px;
    .name {
      margin-left: 5px;
    }
  }
  .time {
    display: block;
    margin-bottom: 20px;
    color: #999;
  }
}
</style>
