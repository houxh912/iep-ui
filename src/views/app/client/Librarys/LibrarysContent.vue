<template>
  <div class="librarys-content">
    <div class="librarys-item" v-for="(item,index) in librarys" :key="index">
      <div class="title">
        <span class="type">{{item.type}}</span>
        <h4 class="title-name">{{item.title}}</h4>
        <i :class="item.icon"></i>
      </div>
      <div class="links">
        <span>{{links.link}} {{num[0]}} / </span>
        <span>{{links.Journal}} {{num[1]}} / </span>
        <span>{{links.programme}} {{num[2]}} / </span>
        <span>{{links.contract}} {{num[3]}} / </span>
        <span>{{links.information}} {{num[4]}} / </span>
        <span>{{links.project}} {{num[5]}}</span>
      </div>
      <div class="lib-info">
        <span>合作项目：{{item.cooperation}}</span>
        <span>相关产品：{{item.product}}</span>
        <span>项目合作伙伴：{{item.partner}}</span>
      </div>
      <div class="lib-bottom">
        <span>咨询/事项</span>
        <span>负责人：{{item.name}}</span>
        <span><i class="icon-shijian"></i>{{item.time}}</span>
        <div class="tag">
            <span v-for='(item,index) in tags' :key="index">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num:[3,3,2,1,5,2],
      tags:['重新创业','浙江创业女杰','浙商'],
      librarys: [
        {
          type:'省级',
          title:'厦门市信息中心标准规划部',
          icon:'icon-shoucang1',
          cooperation:'浙江省重大项目管理建设项目（合同金额：20W）|浙江省重大项目管理建设项目（合同金额：20W）',
          product:'海南省政务信息资源目录管理系统',partner:'腾讯人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）',
          name:'李凯',
          time:'2019-03-13',
        },
        {
          type:'省级',
          title:'厦门市信息中心标准规划部',
          icon:'icon-shoucang1',
          cooperation:'浙江省重大项目管理建设项目（合同金额：20W）|浙江省重大项目管理建设项目（合同金额：20W）',
          product:'海南省政务信息资源目录管理系统',partner:'腾讯人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）',
          name:'李凯',
          time:'2019-03-13',
        },
        {
          type:'省级',
          title:'厦门市信息中心标准规划部',
          icon:'icon-shoucang1',
          cooperation:'浙江省重大项目管理建设项目（合同金额：20W）|浙江省重大项目管理建设项目（合同金额：20W）',
          product:'海南省政务信息资源目录管理系统',partner:'腾讯人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）',
          name:'李凯',
          time:'2019-03-13',
        },
        {
          type:'省级',
          title:'厦门市信息中心标准规划部',
          icon:'icon-shoucang1',
          cooperation:'浙江省重大项目管理建设项目（合同金额：20W）|浙江省重大项目管理建设项目（合同金额：20W）',
          product:'海南省政务信息资源目录管理系统',partner:'腾讯人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）| 百度人工智能（市场经理：何益挺）',
          name:'李凯',
          time:'2019-03-13',
        },
      ],
      links: {link:'联系人',Journal:'拜访日志',programme:'方案',contract:'合同',information:'资讯',project:'合作项目'},
    }
  },
}
</script>
<style scoped lang="scss">
.librarys-item{
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.title{
  .title-name{
    display:inline-block;
    font-size: 16px;
    color:#333;
    margin-right: 10px;
  }
  .type{
    margin-right: 10px;
    padding: 0 5px;
    font-size: 14px;
    color: #BA1B21;
    border: 1px solid #BA1B21;
    border-radius: 3px;
  }
  i{
    color: #BA1B21;
    vertical-align: baseline; 
  }
}
.links{
  margin-bottom: 10px;
  padding-left: 8px;
  font-size: 14px;
  color: #999;
}
.lib-info{
  padding:10px 20px;
  margin-bottom:10px;
  background-color: #fafafa;
  span{
    display: block;
    font-size: 14px;
    color:#666;
    line-height: 28px;
  }
}
.lib-bottom{
  &>span{
    margin-right:15px;
    color: #999;
    font-size: 12px;
    i{
      margin-right:5px;
      font-size: 18px!important;
      vertical-align: -1px;
    }
  }
  .tag{
    display:inline-block;
    font-size: 12px;
    span{
      margin-right: 8px;
      border: 1px solid #ccc;
      padding: 5px 8px;
      border-radius: 3px;
      color:#999;
      &:hover{
        background-color: #fef6f4;
        border: 1px solid #dc8687;
        color: #dc8687;
        cursor: pointer;
      }
    }
  }
}
</style>
