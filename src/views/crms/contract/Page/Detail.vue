<template>
  <basic-container>
    <iep-page-header :title="formData.contractName" :backOption="backOption" :isAdvance="true">
      <div slot="custom" class="page-hander-title">{{formData.contractName}} <span class="sub-title" v-if="formData.isHistory === 2">历史合同</span></div>
      <div slot="sub" class="tags">
        <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail>
      </div>
    </iep-page-header>

    <el-row class="info">
      <el-col class="item" :span='12' v-for="(item, index) in infoList" :key="index">
        <div class="label">{{item.name}}：</div>
        <div class="span" v-if="item.type == 'dict'">{{dictsMap[item.value][formData[item.value]]}}</div>
        <div class="span" v-else-if="item.type == 'date'">{{formatYear(formData[item.value])}}</div>
        <div class="span" v-else>{{formData[item.value]}}</div>
      </el-col>
      <el-col class="item remark">
        <div class="remark-title">合同说明/收款方式：</div>
        <div class="remark-content">{{formData.contractExpl}}</div>
      </el-col>
      <el-col class="item file">
        <el-col class="item" :span='12'>
          <div class="label">合同附件：</div>
          <div class="span" v-for="(item, index) in formData.contractFileList" :key="index">
            <i class="icon-fujian"></i>{{item.name}} <iep-button type="text" @click="downloadFile(item)">下载</iep-button>
          </div>
        </el-col>
        <!-- <iep-button type="primary">附件下载</iep-button>
        <iep-button>复制下载链接</iep-button>
        <iep-button>预览</iep-button> -->
      </el-col>
    </el-row>

    <el-row class="clause">
      <el-col class="name">合同/项目款项</el-col>
      <el-row class="list">
        <el-col class="title">关联项目：</el-col>
        <el-col class="content">
          <label>金额</label><span>{{formData.contractAmount}}</span>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">回款率：</el-col>
        <el-col class="content">
          <label>{{formData.contractCollection ? calculation(formData.contractCollection[formData.contractCollection.length-1].cumulativeAmount, formData.contractAmount) : '0%'}}</label>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">集团项目管理费：</el-col>
        <el-col class="content">
          <label>金额</label><span>{{formData.manageAmount}}</span>
          <label>费率</label><span>5%</span>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">开票费：</el-col>
        <el-col class="content">
          <label>金额</label><span>{{formData.billingAmount}}</span>
          <label>费率</label><span>1%</span>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-col class="title">税费：</el-col>
        <el-col class="content">
          <label>金额</label><span>{{formData.taxes}}</span>
          <label>费率</label><span>6.34%</span>
        </el-col>
      </el-row>
      <el-row class="list" v-if="formData.contractCollection">
        <el-col class="title">合同收款：</el-col>
        <el-col class="content">
          <el-table :data="formData.contractCollection" stripe style="width: 100%" border>
            <el-table-column prop="arrivalTime" label="到账时间"> </el-table-column>
            <el-table-column prop="arrivalAmount" label="到账金额"> </el-table-column>
            <el-table-column prop="cumulativeAmount" label="累计到账"> </el-table-column>
            <el-table-column prop="icon" label="到账比例">
              <template slot-scope="scope">{{calculation(scope.row.cumulativeAmount, formData.contractAmount)}}</template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-row>

  </basic-container>
</template>
<script>
import { getDataById } from '@/api/mlms/material/datum/contract'
import { dictsMap, infoList } from './option'
import { mapGetters } from 'vuex'
import { downloadFile } from '@/api/common'

function formatDig (num) {
  return num > 9 ? '' + num : '0' + num
}

function formatYear (mill) {
  var y = new Date(mill)
  let raws = [
    y.getFullYear(),
    formatDig(y.getMonth() + 1),
    formatDig(y.getDate()),
  ]
  let format = ['-', '-', '-']
  return String.raw({ raw: raws }, ...format)
}

export default {
  data () {
    return {
      formData: {},
      dictsMap,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          let params = this.$route.params
          if (params.id) {
            this.$router.history.go(-1)
          } else {
            this.$emit('load-page', true)
          }
        },
      },
      infoList,
      contractMoney: [
        { date: '2019-03-22', money: '22,000', const: '22,000', icon: '9.0%' },
      ],
      payList: [
        { waibao: '8000', pingshen: '20000', fuwu: '3000' },
      ],
      formatYear,
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    open (id) {
      getDataById(id).then((res) => {
        let data = res.data.data
        data.signDeptOrgNames = data.signDeptOrgName.name // 签署组织
        // let underTakeDeptNames = ''
        // for (let item of data.underTakeDeptName) {
        //   underTakeDeptNames += item.name + '、'
        // }
        // data.underTakeDeptNames = underTakeDeptNames.slice(0, underTakeDeptNames.length - 1)
        data.companyRealName = data.companyName ? data.companyName.name : ''
        data.signCompanyName = data.signCompanyRealName ? data.signCompanyRealName.name : ''
        data.underTakeDeptNames = ''
        if (data.underTakeDeptName) data.underTakeDeptNames = data.underTakeDeptName.map(m => m.name).join('、')
        data.projectName = data.projectRelation ? data.projectRelation.name : '无'
        console.log('data: ', data)
        let businessType = data.businessType.split(','), list = []
        for (let type of businessType) {
          for (let item of this.dictGroup.prms_business_type) {
            for (let t of item.children) {
              if (t.value == type) {
                list.push(t.label)
              }
            }
          }
        }
        data.businessTypeList = list.toString()
        this.formData = data
      })
    },
    // 下载附件
    downloadFile (obj) {
      downloadFile({
        url: obj.url,
        name: obj.name,
      })
    },
    // 计算百分数
    calculation (son, mom) {
      return `${son / mom * 100}%`
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
.page-hander-title {
  font-size: 20px;
  .sub-title {
    font-size: 12px;
    color: $--color-primary;
  }
}
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
    display: flex;
    .label {
      width: 150px;
      text-align: right;
      display: inline-block;
    }
    .span {
      flex: 1;
    }
    .el-button {
      margin-right: 15px;
    }
  }
  .remark {
    display: flex;
    .remark-title {
      width: 150px;
      text-align: right;
    }
    .remark-content {
      width: calc(100% - 150px);
    }
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
