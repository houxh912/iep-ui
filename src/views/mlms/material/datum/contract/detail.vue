<template>
  <basic-container>
    <page-header :title="formData.title" :backOption="backOption">
      <div slot="sub" class="tags">
        <el-tag type="info" v-for="(item, index) in formData.tagKeyWords" :key="index">{{item}}</el-tag>
      </div>
    </page-header>

    <el-row class="info">
      <el-col class="item" :span='12' v-for="(item, index) in infoList" :key="index">
        <label>{{item.name}}：</label>
        <span>{{formData[item.value]}}</span>
      </el-col>
      <el-col class="remark">合同说明/收款方式：</el-col>
      <el-col class="remark-content">{{formData.contractExpl}}</el-col>
      <!-- <el-col class="item file">
        <label>合同附件：</label>
        <iep-button type="primary">附件下载</iep-button>
        <iep-button>复制下载链接</iep-button>
        <iep-button>预览</iep-button>
      </el-col> -->
    </el-row>
      
    <el-row class="clause">
      <el-col class="name">合同/项目款项</el-col>
      <el-row class="list">
        <el-col class="title">关联项目：</el-col>
        <el-col class="content">
          <label>金额</label><span>50,000</span>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">回款率：</el-col>
        <el-col class="content">
          <label>40%</label>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">集团项目管理费：</el-col>
        <el-col class="content">
          <label>金额</label><span>10,000</span>
          <label>费率</label><span>5%</span>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">开票费：</el-col>
        <el-col class="content">
          <label>金额</label><span>1000</span>
          <label>费率</label><span>1%</span>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">税费：</el-col>
        <el-col class="content">
          <label>金额</label><span>2,300</span>
          <label>费率</label><span>6.34%</span>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">合同收款：</el-col>
        <el-col class="content">
          <el-table :data="contractMoney" stripe style="width: 100%" border>
            <el-table-column prop="date" label="到账时间"> </el-table-column>
            <el-table-column prop="money" label="到账金额"> </el-table-column>
            <el-table-column prop="const" label="累计到账"> </el-table-column>
            <el-table-column prop="icon" label="到账比例"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">项目主要支付：</el-col>
        <el-col class="content">
          <el-table :data="payList" stripe style="width: 100%" border>
            <el-table-column prop="waibao" label="项目外包费用"> </el-table-column>
            <el-table-column prop="pingshen" label="项目评审费用（专家费等）"> </el-table-column>
            <el-table-column prop="fuwu" label="项目服务费用（中标费用、佣金等）"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-row>


  </basic-container>
</template>
<script>
import { getDataById } from '@/api/mlms/material/datum/contract'

export default {
  data () {
    return {
      formData: {},
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          let params = this.$route.params
          if (params.id) {
            this.$router.go(-1)
          } else {
            this.$emit('load-page', true)
          }
        },
      },
      infoList: [
        // { name: '关联项目', value: 'guanlianxiangmu' },
        { name: '市场经理', value: 'directorRealName' },
        { name: '合同类型', value: 'contractType', type: 'dict' },
        { name: '业务类型', value: 'businessType', type: 'dict' },
        { name: '签订日期', value: 'signTime' },
        { name: '完结日期', value: 'finishTime' },
        { name: '委托单位', value: 'companyName' },
        { name: '签署单位', value: 'signCompanyRealName' },
        { name: '签署部门', value: 'signDeptOrgNames' },
        { name: '承接部门', value: 'underTakeDeptNames' },
        { name: '合同金额', value: 'contractAmount' },
        { name: '合同级别', value: 'contractLevel' },
        { name: '保证金', value: 'deposit' },
      ],
      contractMoney: [
        { date: '2019-03-22', money: '22,000', const: '22,000', icon: '9.0%' },
      ],
      payList: [
        { waibao: '8000', pingshen: '20000', fuwu: '3000' },
      ],
    }
  },
  methods: {
    open (id) {
      getDataById(id).then(({data}) => {
        data.data.signDeptOrgNames = data.data.signDeptOrgName.name
        let underTakeDeptNames = ''
        for (let item of data.data.underTakeDeptName) {
          underTakeDeptNames += item.name + '、'
        }
        data.data.underTakeDeptNames = underTakeDeptNames.slice(0, underTakeDeptNames.length-1)
        this.formData = data.data
      })
    },
  },
  created () {
    let params = this.$route.params
    if (params.id) {
      this.open(params.id)
    }
  },
}
</script>

<style lang="scss" scoped>
.tags {
  .el-tag {
    margin-right: 10px;
  }
}
.info {
  border-bottom: 1px solid #ddd;
  padding: 0 0 15px 0;
  .item {
    margin-bottom: 10px;
    label {
      width: 130px;
      text-align: right;
      display: inline-block;
    }
    .el-button {
      margin-right: 15px;
    }
  }
  .remark {
    padding-left: 20px;
    margin-bottom: 10px;
  }
  .remark-content {
    padding-left: 40px;
    margin-bottom: 15px;
  }
}
.clause {
  padding: 20px 0;
  .name {
    font-size: 16px;
    color: #000;
    margin-bottom: 30px;
  }
  .list {
    margin-bottom: 15px;
    .title {
      width: 130px;
      text-align: right;
    }
    .content {
      width: calc(100% - 130px);
      label {
        display: inline-block;
        width: 60px;
        padding-left: 20px;
      }
      span {
        display: inline-block;
        width: 150px;
      }
    }
  }
}
</style>
