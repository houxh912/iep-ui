<template>
  <div class="events">
    <i class="el-icon-time"></i>
    <span class="line"></span>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="events.time" :name="index" class="item" v-for="(events,index) in eventsList" :key="index">
        <el-timeline>
          <el-timeline-item v-for="activity in events.activities" :key="activity.id" :icon="activity.icon" :type="activity.type" :color="activity.color" :size="activity.size" :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeNames: [0, 1, 2],
      eventsList: [
        {
          time: '2016年',
          activities: [{
            content: '受国务院办公厅政府信息与政务公开办中国政府网运行中心委托，为全国政务服务总门户提供智库支撑。',
            timestamp: '',
          }, {
            content: '青海国脉互联信息科技有限公司、浙江蟠桃会网络技术有限公司相继注册成立；数邦客平台（www.databanker.cn）正式上线。',
            timestamp: '',
          }, {
            content: '国脉互联获“2016年智慧城市规划与实践奖”，国脉海洋、蟠桃会、中船通作为“互联网+“领域代表参展第三届世界互联网大会•互联网之光博览会。',
            timestamp: '',
          }, {
            content: '中船通中标浙江省海洋渔业船舶交易服务中心“海洋装备电商平台开发建设采购项目”。',
            timestamp: '',
          }, {
            content: '正式改组成立“国脉集团”，包括国脉互联（及十余个分支机构）、国脉海洋、浙江蟠桃会、佛山司马钱、舟山中船通等。',
            timestamp: '',
          }],
        },
        {
          time: '2017年',
          activities: [{
            content: '首倡“数据治理”“数据基因”等前沿理念，率先自主研发“数据基因”、“水巢-数据智能门户DIPS”两大核心软件，获市场、业内专家广泛认可，正式跻身国内政务大数据领域领军企业，入围中国政务大数据企业30强。',
            timestamp: '',
          }, {
            content: '成功中标多个百千万级项目，包括“浙江省数据资源管理服务平台建设项目——公共数据目录系统项目”（助力“最多跑一次”）、海南“省长工程”——“海南省政务信息资源共享采集云项目”等。',
            timestamp: '',
          }, {
            content: '主持贵州省数字政府顶层设计与三年行动计划，参与广东省数字政府规划顶层设计与建设规划。',
            timestamp: '',
          }, {
            content: '国脉互联凭借13年信息化领域的成绩和贡献，获 “信息化影响中国•2017年行业领军企业奖”和“信息化影响中国•2017年行业贡献企业奖”。',
            timestamp: '',
          }, {
            content: '2017年国脉以“智绘城市 数造未来”为主题的1+6年会成为业界年会，成功邀请来自全国1200位政府、机构和企业代表，国脉推出了系列报告，成为数据治理时代的政务创新风向标。',
            timestamp: '',
          }],
        },
        {
          time: '2018年',
          activities: [{
            content: '成功中标《眉山大数据产业发展规划》项目。',
            timestamp: '',
          }, {
            content: '数据基因正式进入中华人民共和国公安部，助力公安部信息化发展。',
            timestamp: '',
          }, {
            content: '国脉智慧产业城正式建成，是舟山海洋科学城海洋大数据产业园重要组成部分、舟山智慧城市的示范基地、中国大数据基因研发中心、国家信息化专家重点工程实验室。舟山海洋电子信息产业服务综合实验室挂牌。',
            timestamp: '',
          }],
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.events {
  position: relative;
  margin: 20px 80px;
  .item {
    position: relative;
  }
  .line {
    position: absolute;
    top: 10px;
    left: 84px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: #ddd;
    z-index: 1;
  }
  .el-icon-time {
    position: absolute;
    top: 10px;
    left: 68px;
    font-size: 32px;
    color: #ddd;
    background: #fff;
    z-index: 2;
  }
}
</style>
<style scoped>
.events >>> .el-timeline-item__node {
  border: 1px solid #ddd;
  border-radius: 50%;
  z-index: 3;
}
.events >>> .el-timeline {
  margin-left: 40px;
}
.events >>> .el-timeline-item__timestamp {
  position: absolute;
  top: 4px;
  left: -40px;
  margin: 0;
}
.events >>> .el-collapse-item__arrow {
  margin: 0 auto 0 8px;
}
.events >>> .el-collapse-item__header,
.events >>> .el-collapse,
.events >>> .el-collapse-item__wrap {
  border: 0;
}
.events >>> .el-collapse-item__wrap {
  overflow: inherit;
}
.events >>> .el-timeline-item:hover .el-timeline-item__content {
  color: #cb3737;
  transition: all 0.5s;
}
.events >>> .el-timeline-item:hover .el-timeline-item__node {
  border-color: #cb3737;
  background-color: #fff;
  transition: all 0.5s;
}
.events >>> .el-timeline-item:hover ::before {
  background-color: #cb3737;
}
.events >>> .el-timeline-item__node {
  position: relative;
  top: 17px;
  left: -3px;
  width: 15px;
  height: 15px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
}
.events >>> .el-timeline-item__node:before {
  position: absolute;
  content: "";
  top: 4px;
  left: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #e4e7ed;
}
.events >>> .el-timeline-item__tail {
  border-width: 1px;
}
</style>
