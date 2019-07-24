<template>
  <div class="project-pk">
    <iep-page-header title="项目PK" :backOption="backOption"></iep-page-header>
    <div class="header">
      <span></span>
    </div>
    <div class="contianBox">
      <div class="title">
        <div class="data">基本信息资源</div>
      </div>
      <div class="counter">
        <div class="left">
          <span>项目标签</span>
          <span>项目阶段</span>
          <span>项目等级</span>
          <span>客户名称</span>
          <span>项目经理</span>
          <span>项目督导</span>
          <span>市场经理</span>
          <span>执行项目经理</span>
          <span>项目成员</span>
          <span>相关资源</span>
          <span>相关产品</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
      </div>
      <div class="title">
        <div class="data">基本信息资源</div>
      </div>
      <div class="counter">
        <div class="left">
          <span>项目签约周期</span>
          <span>项目总周期</span>
          <span>项目成本（元）</span>
          <span>项目金额（元）</span>
          <span>项目利润率</span>
          <span>项目收款率</span>
          <span>收款时间</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
        <div class="right">
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
          <span>收拾收拾收拾收拾</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getProjectPKList } from '@/api/prms/project_pk'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.history.go(-1)
        },
      },
      formData: {},
      idList: [],
    }
  },
  created () {
    this.id = this.$route.params.id
    this.idList = [this.id]
    this.loadPage()
  },
  methods: {
    loadPage () {
      // getProjectPKList(this.idList).then(({ data }) => {
      //   this.formData = data.data
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
.project-pk {
  width: 1200px;
  padding: 20px 0;
  margin: auto;
  .contianBox {
    white-space: nowrap;
    overflow-x: auto;
    .title {
      background-color: #f5f5f5;
      border-radius: 5px;
      .data {
        font-size: 16px;
        padding: 10px 20px;
      }
    }
    .counter {
      .left {
        width: 150px;
        display: inline-block;
        > span {
          width: 100%;
          display: block;
          text-align: left;
          padding-left: 30px;
          height: 46px;
          line-height: 46px;
          border-bottom: 1px solid #eee;
        }
      }
      .right {
        width: 33%;
        display: inline-block;
        > span {
          width: 100%;
          display: block;
          text-align: left;
          padding-left: 30px;
          height: 46px;
          line-height: 46px;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}
</style>
<style scoped>
/* .project-pk >>> .el-form-item__content {
  display: flex;
} */
</style>

