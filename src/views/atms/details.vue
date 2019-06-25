<template>
  <div>
    <basic-container>
      <div class="details">
      <div class="detail-left">
        <page-header :title="`${form.taskName}`" :backOption="backOption"></page-header>
        <div class="sub">
          <span v-if='!form.parentName'>所属任务：无</span>
          <span v-else>所属任务：{{form.parentName}}</span>
          <span class="opt">
            <span><i class="iconfont icon-xingxing"></i>关注</span>
            <span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="iconfont icon-xitongguanli"></i>任务菜单
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><i class="iconfont icon-Icon-zhuanru"></i>转化为子任务</el-dropdown-item>
                  <el-dropdown-item><i class="iconfont icon-tixing"></i>催办</el-dropdown-item>
                  <el-dropdown-item><i class="iconfont icon-shanchu"></i>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </div>
        <el-form :model="form" ref="form" label-width="100px" class="form form-detail" style="padding-top:20px;">
          <el-form-item label="状态：" class="form-half">
            <iep-dict-detail :value="form.taskStatus" dict-name="atms_task_status"></iep-dict-detail>
          </el-form-item>
          <el-form-item label="优先级：" class="form-half">
            <iep-dict-detail :value="form.priority" dict-name="atms_task_priority"></iep-dict-detail>
          </el-form-item>
          <el-form-item label="协同人：" class="form-half">
            <span v-for="(e,i) in form.executors" :key="i" class="people">
              <img class="img" :src="e.headImg" alt="">
              {{e.realName}}
            </span>
          </el-form-item>
          <el-form-item label="执行人：" class="form-half">
            <span v-for="(a,i) in form.assistants" :key="i" class="people">
              <img class="img" :src="a.headImg" alt="">
              {{a.realName}}
            </span>
          </el-form-item>
          <el-form-item label="起止时间：">
            <span>{{form.startTime | parseToDay}}~{{form.endTime | parseToDay}}</span>
          </el-form-item>
          <el-form-item label="标签：">
            <span v-for="(a,i) in form.tagKeyWords" :key="i" class="sign">{{a}}</span>
          </el-form-item>
          <el-form-item label="备注：">
            <span>{{form.remarks}}</span>
          </el-form-item>
          <el-form-item label="子任务：">
            <span v-if="!form.children">无</span>
            <span v-else>{{form.children}}</span>
          </el-form-item>
          <el-form-item label="附件：">
            <!-- <div v-if="form.attach.length > 0">
              <a-tag v-for="file in form.attach" :key="file.url" @click="handleDownload(file)">
              <a-icon type="paper-clip" />{{file.name}}</a-tag>
            </div> -->
            <span>无附件</span>
          </el-form-item>
          <el-form-item label="关联内容：">
            <el-upload class="upload-demo" action="">
              <i class="button el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <el-card shadow="never" class="person-info">
        <div class="person-info">
          <span class="img"><img :src="form.avatar" alt=""></span>
          <div class="info">
            <span class="info-con"><span class="post">负责人</span><span class="name">{{form.principalName}}</span></span>
            <el-button type="danger" size="mini" plain @click="handleTransfer">转移</el-button>
          </div>
        </div>
        <similar-tasks></similar-tasks>
        <circulation-log :itemList="form.records"></circulation-log>
        <div class="bottom">
          <span>{{handleTitle}}</span>
          <div class="con"></div>
          <div class="btn-con">
            <el-button type="danger" size="mini">发表</el-button>
          </div>
        </div>
      </el-card>
      </div>
    </basic-container>
    <transfer-dialog-form ref="DialogForm" @load-page="loadPage"></transfer-dialog-form>
  </div>
</template>
<script>
import { getAtmsById } from '@/api/atms/index'
import { initForm, rules } from './options.js'
import { downloadFile } from '@/api/common'
import SimilarTasks from './SimilarTasks'
import CirculationLog from './CirculationLog'
import TransferDialogForm from './TransferDialogForm'
export default {
  components: {
    SimilarTasks,
    CirculationLog,
    TransferDialogForm,
  },
  data () {
    return {
      methodName: '舟山市营商环境优化',
      subTitle: '营商环境评估',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },
      form: initForm(),
      rules,
      limit:1,
      id: this.$route.params.id,
      img: '../img/person/p09.jpg',
      post: '负责人',
      name: '潘超巧',
      handleTitle: '@提及他人',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    close () {
      this.$router.history.go(-1)
    },
    handleDownload (file) {
      downloadFile(file)
    },
    loadPage () {
      this.pageLoading = true
      getAtmsById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.pageLoading = false
      })
    },
    handleTransfer (){
      this.$refs['DialogForm'].dialogShow = true
    },
  },
}
</script>
<style lang="scss" scoped>
.details {
  display: grid;
  margin: 20px 0;
  grid-auto-flow: row dense;
  grid-row-gap: 25px;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
.detail-left {
  padding: 0 15px 60px 15px;
  .button {
    padding: 8px;
    border: 1px solid #ddd;
  }
  .sub {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 20px;
    border-bottom: 1px solid #eee;
    align-items: center;
    .opt {
      > span {
        display: flex;
        justify-content: flex-start;
        margin-right: 20px;
        align-items: center;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    i {
      margin-right: 5px;
      font-size: 16px;
    }
  }
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .opt {
    display: flex;
    justify-content: flex-start;
  }
  .form-half {
    span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin-right: 10px;
      }
    }
    .people{
      margin-right: 10px;
      float: left;
    }
  }
  .sign{
    padding: 4px 10px;
    border: 1px solid #eee;
    margin-right: 10px;
  }
}
.person-info {
  display: flex;
  justify-content: flex-start;
  .info {
    .info-con {
      display: block;
      margin-bottom: 10px;
    }
  }
  .img {
    margin-right: 15px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #ebeef5;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .post {
    margin-right: 5px;
    color: #999;
  }
  .name {
    font-size: 18px;
  }
  .el-button--danger.is-plain {
    color: #cb3737;
    background: #f8e8e9;
    border-color: #e3a4a6;
    &:hover {
      background: #cb3737;
      color: #fff;
    }
  }
}
.bottom {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  .con {
    margin: 10px 0;
  }
  .btn-con {
    text-align: right;
    .el-button--danger {
      color: #fff;
      background: #cb3737;
      border-color: #cb3737;
      &:hover {
        color: #cb3737;
        background: #f8e8e9;
        border-color: #e3a4a6;
      }
    }
  }
}
</style>
