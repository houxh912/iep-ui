<template>
  <div class="project-pk">
    <iep-page-header title="项目PK" :backOption="backOption"></iep-page-header>
    <div class="contianBox">
      <div class="header">
        <span v-for="(item,index) in formData" :key="index">
          <div v-if="item.projectName!=''">{{item.projectName}}</div>
          <iep-button v-else style="font-size:18px;color:#999;vertical-align: text-top;" @click="add()">+</iep-button>
        </span>
      </div>
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
          <!-- <span>相关资源</span>
          <span>相关产品</span> -->
        </div>
        <div class="right" v-for="(item,index) in formData" :key="index">
          <span>
            <span type='info' v-for="(tag, index) in item.projectTagList" :key="index">{{tag}}</span>
          </span>
          <span>
            <span v-if="item.projectStage==0"> </span>
            <span v-else-if="item.projectStage==1">初步意向</span>
            <span v-else-if="item.projectStage==2">方案提交</span>
            <span v-else-if="item.projectStage==3">正在执行</span>
            <span v-else>项目完结</span>
          </span>
          <span>
            <span v-if="item.projectLevel==0"> </span>
            <span v-else-if="item.projectLevel==1">重要项目</span>
            <span v-else-if="item.projectLevel==2">中级项目</span>
            <span v-else>一般项目</span>
          </span>
          <span>{{item.relatedClientName}}</span>
          <span>{{item.projectManagerName}}</span>
          <span>
            <span v-if="item.projectMentorList.length==0"> </span>
            <span v-for="a in item.projectMentorList" :key="a.id" class="people">{{a.name}}</span>
          </span>
          <span>
            <span v-if="item.mktManagerList.length==0"> </span>
            <span v-for="a in item.mktManagerList" :key="a.id" class="people">{{a.name}}</span>
          </span>
          <span>
            <span v-if="item.projectHandlesList.length==0"> </span>
            <span v-for="a in item.projectHandlesList" :key="a.id" class="people">{{a.name}}</span>
          </span>
          <span>
            <span v-if="item.membersList.length==0"> </span>
            <span v-for="a in item.membersList" :key="a.id" class="people">{{a.name}}</span>
          </span>
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
      </div>
    </div>
    <add-dialog ref="addDialog" @load-page="loadPage"></add-dialog>
  </div>
</template>

<script>
import { getProjectPKList } from '@/api/app/prms/project_pk'
import { initForm } from './option'
import addDialog from './addDialog'

export default {
  components: { addDialog },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.history.go(-1)
        },
      },
      formData: [initForm(), initForm(), initForm()],
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    idList () {
      return this.$route.query.ids
    },
  },
  methods: {
    loadPage () {
      getProjectPKList({ ids: this.idList }).then(({ data }) => {
        this.formData = [data.data[0], data.data.length > 1 ? data.data[1] : initForm(), data.data.length == 3 ? data.data[2] : initForm()]
      })
    },
    add () {
      this.$refs['addDialog'].idList = this.idList
      this.$refs['addDialog'].dialogShow = true
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
    .header {
      font-size: 16px;
      height: 100px;
      line-height: 100px;
      > span {
        width: 50%;
        display: inline-block;
        text-align: center;
      }
    }
    .title {
      width: 160%;
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
        vertical-align: top;
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
        width: 49%;
        display: inline-block;
        vertical-align: top;
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

