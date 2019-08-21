<template>
  <el-card class="top-class" shadow="never">
    <!-- <div class="top-class-list" v-for="item in items" :key="item.id">
      <span class="numTotal">{{item.numTotal}}<span class="num">{{counts[item.numCount]}}</span>个</span>
      <span class="numProjects">{{item.numProjects}} {{counts[item.projectsCount]}} 个</span>
      <span class="numNow" v-if="item.numNow">{{item.numNow}} {{counts[item.nowCount]}} 个</span>
    </div> -->
    <div class="top-class-list" v-for="(item, index) in countList" :key="index">
      <span :class="i === 0 ? 'numTotal' : 'numProjects'" v-for="(t, i) in item" :key="i">
        {{t.name}}<span :class="i === 0 ? 'num' : ''"> {{counts[t.props]}} </span>{{t.unit}}
      </span>
    </div>
  </el-card>
</template>

<script>
import { getProjectChannelCount } from '@/api/app/prms'

export default {
  data () {
    return {
      items: [
        {
          id: '1',
          numTotal: '项目总数',
          numProjects: '已建项目',
          numNow: '在建项目',
          numCount: 'projectTotal',
          projectsCount: 'alreadyProject',
          nowCount: 'constructionProject',
        },
        {
          id: '2',
          numTotal: '项目合同',
          numProjects: '待签项目',
          numCount: 'porjectContract',
          projectsCount: 'stayPorject',
        },
        {
          id: '3',
          numTotal: '项目软件',
          numProjects: '咨询项目',
          numNow: '其它项目',
          numCount: 'porjectSoftware',
          projectsCount: 'consultPorject',
          nowCount: 'otherPorject',
        },
        {
          id: '4',
          numTotal: '国家及项目',
          numProjects: '省级项目',
          numNow: '市区级项目',
          numCount: 'countryPorject',
          projectsCount: 'provincePorject',
          nowCount: 'cityPorject',
        },
        {
          id: '5',
          numTotal: '项目经理',
          numProjects: '技术类',
          numNow: '咨询类',
          numCount: 'porjectManager',
          projectsCount: 'technologyManager',
          nowCount: 'consultManager',
        },
      ],
      countList: [
        [
          {
            name: '项目总数',
            props: 'projectCount',
            unit: '个',
          }, {
            name: '执行项目',
            props: 'performProjectCount',
            unit: '个',
          }, {
            name: '待建项目',
            props: 'intentionPlanProjectCount',
            unit: '个',
          }, {
            name: '完结项目',
            props: 'endProjectCount',
            unit: '个',
          },
        ], [
          {
            name: '项目合同',
            props: 'contractPorject',
            unit: '个',
          }, {
            name: '待签项目',
            props: 'unContractPorject',
            unit: '个',
          },
        ], [
          {
            name: '软件项目',
            props: 'softPorject',
            unit: '个',
          // }, {
          //   name: '咨询项目',
          //   props: 'count',
          //   unit: '个',
          // }, {
          //   name: '其他项目',
          //   props: 'count',
          //   unit: '个',
          },
        ], [
          {
            name: '国家级项目',
            props: 'countryPorject',
            unit: '个',
          }, {
            name: '省级项目',
            props: 'provincePorject',
            unit: '个',
          }, {
            name: '市区级项目',
            props: 'cityAreaPorject',
            unit: '个',
          },
        ], [
          {
            name: '项目经理',
            props: 'porjectManagerCount',
            unit: '个',
          }, {
            name: '产品技术类',
            props: 'proTechManagerCount',
            unit: '个',
          }, {
            name: '咨询类',
            props: 'consultingManagerCount',
            unit: '个',
          }, {
            name: '品牌市场类',
            props: 'brandMarketManagerCount',
            unit: '个',
          }, {
            name: '平台类',
            props: 'platformManagerCount',
            unit: '个',
          },
        ],
      ],
      counts: {},
    }
  },
  created () {
    getProjectChannelCount().then(({ data }) => {
      this.counts = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.top-class {
  margin: 20px auto;
  width: 1200px;
  .top-class-list {
    flex: 1;
    margin: 25px 0;
    padding: 0 50px 0 20px;
    border-right: 1px solid #ddd;
    .numTotal,
    .numProjects,
    .numNow {
      display: block;
      line-height: 28px;
    }
    .numTotal {
      font-size: 16px;
    }
    .num {
      margin: 0 5px;
      font-size: 20px;
    }
    .numProjects{
      font-size: 14px;
    }
    .numNow{
      font-size: 14px; 
    }
    &:last-child {
      border-right: 0;
    }
  }
}
</style>
<style scoped>
.top-class >>> .el-card__body {
  display: flex;
  padding: 0;
  justify-content: space-between;
}
</style>
