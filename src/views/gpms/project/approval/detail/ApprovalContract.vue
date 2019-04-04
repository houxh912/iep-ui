<template>
  <div class="addDias">
    <el-row class="bods">
      <div class="contractBox">
        <div class="contractBoxTop">
          <p class="tits">项目经理授权书 <span class="number">编号：<span class="initstit">{{form.serialNo}}</span></span></p>
          <p class="pls"><span class="prs">{{form.applicantName}}</span><strong>先生/女士：</strong></p>
          <p class="indents">现任命你为 <span class="prs">{{form.projectName}}</span>项目的项目经理，全权负责该项目的项目管理工作，同时授子相关的签字和审批权限。你的工作职责包括:</p>
          <p class="pls">1、管理客户关系和管控项目实施全过程，获取客户的满意和信任；</p>
          <p class="pls">2、管理项目团队，使之高效而又愉快地工作，并获得最满意的工作体验；</p>
          <p class="pls">3、按照规定的需求、进度、成本和质量预期完成项目的交付任务。</p>
          <p class="pls">4、完成领导交力的其他工作。</p>
          <!-- <p class="indents">此任命自 <span class="prs">{{form.one}}</span> 年 <span class="prs">{{form.two}}</span> 月 <span class="prs">{{form.three}}</span>日发布之日起生效，
          至&nbsp;<span class="prs">{{form.one}}</span> 年 <span class="prs">{{form.two}}</span> 月 <span class="prs">{{form.three}}</span>日项目结项之日起失效。
          </p> -->
          <p class="indents">此任命自 <span class="prs"> 2019 </span> 年 <span class="prs"> 2 </span> 月 <span class="prs"> 14 </span>日发布之日起生效，
          至&nbsp;<span class="prs"> 2022 </span> 年 <span class="prs"> 6 </span> 月 <span class="prs"> 28 </span>日项目结项之日起失效。
          </p>
          <p class="pls">本授权书一式三份，项目执行与质量委员会、部门及本人各执一份。</p>
          <p class="pls">被授权人无转乘托权，特此委托。</p>
          <p class="texright">授权单位：{{form.approverName}}</p>
          <p class="texright">被授权人：<span class="prs">{{form.applicantName}}</span>日期：<span class="prs">{{form.approvalTime}}</span></p>
        </div>
        <p class="indents pasaml">我已经认真阅读了并完全理解了任命书中的内容，并承诺对工作职责中所规定的内容全责。</p>
        <p class="pasaml"><strong>项目经理信息：</strong></p>
        <p class="pls">
          <span>姓名：</span>
          <!-- <span>{{form.name}}</span> -->
          <span> 张三 </span>
          <span class="pls">性别：</span>
          <!-- <span>{{form.sex}}</span> -->
          <span> 男 </span>
          <span class="pls">年龄：</span>
          <!-- <span>{{form.age}}</span> -->
          <span> 20 </span>
        </p>
        <p class="pls">身份证号码：<span> 330901169920391031 </span></p>
        <p class="pls">联系电话：<span> 15168077822 </span></p>
        <p class="pls">通讯地址：<span> 浙江省舟山市定海区临城街道海洋科学城国脉海洋 </span></p>
        <p class="pls">邮 编：<span> 316000 </span></p>
      </div>
    </el-row>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins:[mixins],
  props: {
    form: {
      type: Object,
      default: () => {},
    },
  },
  data () {
    return {
    }
  },
}
</script>


<style lang="scss" scoped>
  .addDias {
    width: 100%;
    background-color: #fff;
    .bods {
      box-sizing: border-box;
      padding: 10px 20px;
      // 合同
      .contractBox {
        width: 750px;
        border: 1px solid #ddd;
        margin: 0 auto;
        box-sizing: border-box;
        p {
          line-height: 40px;
        }
        .pls{
          padding-left: 35px;
        }
        .indents{
          text-indent: 2em;
        }
        .texright{
          text-align: right;
          font-weight: bold;
        }
        .pasaml{
          padding-left: 10px;
        }
        .contractBoxTop {
          border-bottom: 1px solid #ddd;
          width: 100%;
          padding: 10px;
          box-sizing: border-box;
          .tits{
            font-weight: bold;
            text-align: center;
            font-size: 30px;
            margin: 0;
            .number{
              float: right;
              margin-right: 10px;
              font-size: 16px;
              line-height: 45px;
            }
            .initstit{
              font-size: 14px;
            }
          }
          .prs{
            padding: 0 25px;
            text-align: center;
            min-width: 100px;
            border-bottom: 1px solid gray;
          }
        }
      }
    }
  }
</style>
<style>
.Guidances .el-message-box__header{
  background-color: #F2F2F2;
  font-weight: bold;
}
.Guidances .el-message-box__content{
  border-bottom: 1px solid #f8f8f8;
  margin-bottom: 10px;
}
.Guidances .florighcancel{
  float: right;
  margin-left: 15px;
}
</style>