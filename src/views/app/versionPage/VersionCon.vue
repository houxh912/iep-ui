<template>
  <div class="version-con-list">
    <span class="title">
      <span class="num">{{num}}</span>
      <span class="name">{{name}}</span>
    </span>
    <span class="time">{{time}}</span>
    <div class="piece">
      <h2>财务模块：</h2>
      <span class="name">1.内网2.0财富模块（国脉贝）试用</span>
      <span class="name">2.财富-投资功能的上线</span>
      <span class="name">3.实现内网的工资发放功能</span>
      <span class="name">4.财务-财务管理（整个模块）财务可录入收支流水，进行提现审核，收支录入，报销审核，开票审核，预算填写，现金/银行存款日记账的查看 ，工作台的设置</span>
      <span class="name">5.我的财富-申请报销，开票通知，打赏，我的投资，提现申请功能上线</span>
      <span class="name">6.组织资产-组织打赏/扣减，组织拆借，预算查看，收支查看，集团往来账查看</span>
      <span class="name">7.集团财政-国脉贝发行，集团往来账查看，资金调拨功能上线，可以调拨线上国脉贝和线下资金。</span>
      <span class="name">8.更多设置-银行账户和公司的设置，包括工资账户设置和开票账户设置</span>
    </div>
    <div class="piece">
      <h2>材料模块：</h2>
      <span class="name">1.合同关联客户修改为联想输入功能，合同编辑页面异常修复</span>
      <span class="name">2.会议纪要页面的每周统计不准确修复</span>
    </div>
    <div class="piece">
      <h2>人力模块：</h2>
      <span class="name">1.修复劳动合同无法保存的问题修复</span>
    </div>
    <div class="piece">
      <h2>产品模块：</h2>
      <span class="name">1.说说的回复功能完善、新增说说点赞功能</span>
      <span class="name">2.用户无法收到建议的问题修复</span>
    </div>
    <div class="piece">
      <h2>客户模块：</h2>
      <span class="name">1.客户模块的拜访日志的页面修改</span>
      <span class="name">2.客户联系人导入验证的修复</span>
      <span class="name">3.联系人添加相关客户的功能完善</span>
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
        {
          name: '内容内容标题内容尼尔！',
        },
        {
          name: '你好内容内容标题内容尼尔！',
        },
        {
          name: 'hihi内容内容标题内容尼尔！',
        },
        {
          name: '嘿嘿内容内容标题内容尼尔！',
        },
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
