<template>
  <div>
    <basic-container>
      <div class="details">
        <div class="detail-left">
          <iep-page-header :title="`${form.taskName}`" :backOption="backOption">
            <slot>
              <iep-button @click="handleEdit()" :disabled="userInfo.userId!=this.form.creatorId && userInfo.userId!=this.form.principal">编辑</iep-button>
            </slot>
          </iep-page-header>
          <div class="sub">
            <span v-if='!form.parentName'><span class="sub-title">所属任务：</span>无</span>
            <span v-else @click="handleDetail(form.parentId)" style="cursor: pointer;"><span class="sub-title">所属任务：</span>{{form.parentName}}</span>
            <span class="opt">
              <!-- <span><i class="iconfont icon-xingxing"></i>关注</span> -->
              <span>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="iconfont icon-xitongguanli"></i>任务菜单
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :disabled="userInfo.userId!=this.form.creatorId && userInfo.userId!=this.form.principal">
                      <div @click="handleConversion"><i class="iconfont icon-Icon-zhuanru"></i>转化为子任务</div>
                    </el-dropdown-item>
                    <el-dropdown-item disabled><i class="iconfont icon-tixing"></i>催办</el-dropdown-item>
                    <el-dropdown-item :disabled="userInfo.userId!=this.form.creatorId && userInfo.userId!=this.form.principal">
                      <div @click="handleDelete"><i class="iconfont icon-shanchu"></i>删除</div>
                    </el-dropdown-item>
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
              <div v-if="form.assistants.length>0">
                <span v-for="(e,i) in form.assistants" :key="i" class="people" :value="form.assistants.length>0">
                  <iep-img class="img" :src="e.headImg" alt=""></iep-img>
                  <span>{{e.name}}</span>
                </span>
              </div>
              <span v-else>无</span>
            </el-form-item>
            <el-form-item label="执行人：" class="form-half">
              <div v-if="form.executors.length>0">
                <span v-for="(a,i) in form.executors" :key="i" class="people" :value="form.executors.length>0">
                  <iep-img class="img" :src="a.headImg" alt=""></iep-img>
                  <span>{{a.name}}</span>
                </span>
              </div>
              <span v-else>无</span>
            </el-form-item>
            <el-form-item label="起止时间：" class="form-half">
              <span>{{form.startTime | parseToDay}}~{{form.endTime | parseToDay}}</span>
            </el-form-item>
            <el-form-item label="完成时间：" class="form-half">
              <span v-if="form.completeTime">{{form.completeTime | parseToDay}}</span>
              <span v-else>未完成</span>
            </el-form-item>
            <el-form-item label="标签：">
              <div v-if="form.tagKeyWords.length>0"><span v-for="(a,i) in form.tagKeyWords" :key="i" class="sign" @click="tagDetail(a)">{{a}}</span></div>
              <span v-else>无</span>
            </el-form-item>
            <el-form-item label="备注：">
              <iep-div-detail :value="form.remarks"></iep-div-detail>
            </el-form-item>
            <el-form-item label="子任务：">
              <div v-if="form.children.length>0"><span v-for="(item,index) in form.children" :key="index" style="display:block;cursor: pointer;" @click="handleDetail(item.id)">{{item.name}}</span></div>
              <span v-else>无</span>
            </el-form-item>
            <el-form-item label="附件：">
              <div v-if="form.annexList.length>0">
                <a-tag v-for="file in form.annexList" :key="file.url" @click="handleDownload(file)">
                  <a-icon type="paper-clip" />{{file.name}}</a-tag>
              </div>
              <span v-else>无附件</span>
            </el-form-item>
            <div v-for="(item, index) in relatedFormList" :key="index">
              <el-form-item :label="`${item.name}：`" v-if="form[item.list].length > 0">
                <ul class="relevance-list">
                  <li class="item" v-for="t in form[item.list]" :key="t.id">{{t.name}}</li>
                </ul>
              </el-form-item>
            </div>
            <el-form-item label="关联项目：" v-if="form.projectList.length > 0">
              <span v-for="project in form.projectList" :key="project.id" :value="form.projectList.length>0">{{project.name}}</span>
            </el-form-item>
          </el-form>
        </div>
        <el-card shadow="never" class="person-info">
          <div class="person-info">
            <span class="img">
              <iep-img :src="form.avatar" alt=""></iep-img>
            </span>
            <div class="info">
              <span class="info-con"><span class="post">负责人</span><span class="name">{{form.principalName}}</span></span>
              <el-button type="danger" size="mini" plain @click="handleTransfer">转移</el-button>
            </div>
          </div>
          <similar-tasks :dataList="form.similarTasks.slice(0,4)" @click="handleDetail"></similar-tasks>
          <circulation-log :itemList="form.records.slice(0,8)"></circulation-log>
          <!-- <div class="bottom">
          <span>{{handleTitle}}</span>
          <div class="con"></div>
          <div class="btn-con">
            <el-button type="danger" size="mini">发表</el-button>
          </div>
        </div> -->
        </el-card>
      </div>
    </basic-container>
    <transfer-dialog-form ref="TransferDialogForm" @load-page="loadPage"></transfer-dialog-form>
    <conversion-dialog-form ref="ConversionDialogForm" @load-page="loadPage"></conversion-dialog-form>
  </div>
</template>
<script>
import { getAtmsById, deleteAtmsById } from '@/api/atms/index'
import { initForm, rules, relatedFormList } from './options.js'
import { downloadFile } from '@/api/common'
import SimilarTasks from './SimilarTasks'
import CirculationLog from './CirculationLog'
import TransferDialogForm from './TransferDialogForm'
import ConversionDialogForm from './ConversionDialogForm'
import mixins from '@/mixins/mixins'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  components: {
    SimilarTasks,
    CirculationLog,
    TransferDialogForm,
    ConversionDialogForm,
  },
  beforeRouteUpdate (to, from, next) {
    // console.log(to, from)
    this.$nextTick(() => {
      this.loadPage()
    })
    next()
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
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
      limit: 1,
      img: '../img/person/p09.jpg',
      post: '负责人',
      name: '潘超巧',
      handleTitle: '@提及他人',
      relatedFormList,
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    id () {
      return +this.$route.params.id
    },
  },
  methods: {
    close () {
      this.$router.history.go(-1)
    },
    handleDownload (file) {
      downloadFile(file)
    },
    loadPage () {
      getAtmsById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
    handleTransfer () {
      this.$refs['TransferDialogForm'].dialogShow = true
    },
    handleConversion () {
      this.$refs['ConversionDialogForm'].dialogShow = true
    },
    handleEdit () {
      this.$router.push(`/atms/edit/${this.id}`)
    },
    handleDelete () {
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteAtmsById(this.id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: '移除成功!',
            })
            this.$router.push({ path: '/atms/my_tasks' })
          } else {
            this.$message({
              type: 'info',
              message: `移除失败，${res.data.msg}`,
            })
          }
          this.loadPage()
        })
      })
    },
    tagDetail (row) {
      this.$openTagDetail(row)
    },
    handleDetail (row) {
      this.$router.push({
        path: `/atms/details/${row}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.details {
  display: grid;
  grid-auto-flow: row dense;
  grid-column-gap: 20px;
  grid-template-columns: minmax(100px, 5fr) minmax(100px, 2fr);
}
.el-dropdown-link {
  i {
    color: #999;
  }
}
.detail-left {
  .button {
    padding: 8px;
    border: 1px solid #ddd;
  }
  .sub {
    display: flex;
    justify-content: space-between;
    padding: 0 0 15px;
    border-bottom: 1px solid #eee;
    align-items: center;
    .sub-title {
      color: #999;
    }
    .opt {
      > span {
        display: flex;
        justify-content: flex-start;
        margin-right: 20px;
        align-items: center;
        cursor: pointer;
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
    vertical-align: top;
    span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      iep-img {
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .people {
      margin-right: 15px;
      margin-bottom: 10px;
      float: left;
      display: flex;
      > span {
        margin-left: 6px;
      }
    }
  }
  .sign {
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
    iep-img {
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
.relevance-list {
  padding: 0;
  .item {
    list-style: none;
    height: 28px;
    i {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
<style scoped>
.details >>> .el-image__inner {
  border-radius: 50%;
  margin-right: 5px;
}
.details >>> .el-card__body {
  width: 100%;
}
.img >>> .image-slot {
  border-radius: 50%;
}
</style>

