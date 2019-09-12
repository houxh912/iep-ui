<template>
  <div class="equity">
    <el-dialog :visible.sync="dialogShow" width="600px" :before-close="loadPage">
      <div class="main">
        <div style="padding:60px;">
          <p class="header-title">{{form.orgName}}</p>
          <p>公司依据本公司股东会于 年 月 日决议通过的《有限公司股权激励计划》（“股权激励计划”）及您阅读同意的<span style="text-decoration:underline;margin:0 10px;font-weight: normal;">{{form.orgName}}</span>股权激励认购说明，对您的股权授予情况确认如下：
          </p>
          <p> </p>
          <p>授予价格：<span>{{form.tradingPrice}} </span>贝／股（对应公司每1元人民币注册资本）的价格认购激励股权。</p>
          <p>授予股权数量：<span>{{form.investmentNumber}}</span>；</p>
          <p>授予的日期：<span>{{form.createTime | parseDate('YYYY 年 MM 月 DD 日')}}</span>；</p>
          <p>授予方式：虚拟股；</p>
          <p>授予期限： 年。</p>
          <p> </p>
          <p>享有权利：您作为激励股权的受益人，仅享有激励股权的经济受益权利（如分红、增值、处分收入或清算分配），激励股权的其他股东权利(如股东表决权和公司高管提名任命权)由公司董事会行使直至公司整体上市或出售；</p>
          <p> </p>
          <p>限制说明：您同意接受公司章程、股权激励认购说明、公司股权管理制度及相关法律文件的约束。</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const initForm = () => {
  return {
    investmentNumber: '', //股份数量
    orgName: '',//投资组织名
    tradingPrice: 0,//每股单价
    remainingShares: 0,//剩余股数
    createTime: '',
  }
}
export default {
  name: 'IepEquityDialog',
  data () {
    return {
      form: initForm(),
      dialogShow: false,
    }
  },
  methods: {
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background: url("/img/bg/EquityCertificate.webp") no-repeat center center;
  background-size: 100% 100%;
  .header-title {
    padding: 64px 0 140px;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    width: 100%;
    text-align: center;
  }
  p {
    margin-bottom: 0.8em;
    span {
      font-weight: bold;
    }
  }
}
.equity ::v-deep .el-dialog__body {
  padding: 0;
}
.equity ::v-deep .el-dialog__header {
  padding: 0;
}
</style>
