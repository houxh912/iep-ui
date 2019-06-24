<template>
  <div class="detail-left iep-page-form">
    <page-header :title="`${form.taskName}`" :backOption="backOption"></page-header>
    <div class="sub">
      <span>所属任务：{{ownTask}}</span>
      <span class="opt">
        <span><i class="iconfont icon-xingxing"></i>关注<span><i class="iconfont icon-xitongguanli"></i>任务菜单</span></span>
      </span>
    </div>
    <el-form :model="form" ref="form" label-width="200px" class="form form-detail">
      <el-form-item label="状态：" class="form-half">
        <span>{{form.taskStatus}}</span>
      </el-form-item>
      <el-form-item label="优先级：" class="form-half">
        <span>{{form.priority}}</span>
      </el-form-item>
      <el-form-item label="协同人：" class="form-half">
        <span>
          <img class="img" :src="form.img" alt="">
          {{form.executor.users}}
        </span>
      </el-form-item>
      <el-form-item label="执行人：" class="form-half">
        <span>
          <img class="img" :src="form.img" alt="">
          {{form.synergist.users}}
        </span>
      </el-form-item>
      <el-form-item label="起止时间：">
        <span>{{form.implementRangeTime}}</span>
      </el-form-item>
      <iep-form-item prop="sign" label-name="标签" tip="请输入不少于3个标签">
        <iep-tag v-model="form.sign"></iep-tag>
      </iep-form-item>
      <el-form-item label="备注：">
        <span>{{form.remarks}}</span>
      </el-form-item>
      <el-form-item label="子任务：" prop="subtasks">
        <el-upload class="upload-demo" action="">
          <i class="button el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="附件：" prop="attach">
        <iep-upload v-model="form.attach" :limit="limit"></iep-upload>
      </el-form-item>
      <el-form-item label="关联内容：" prop="subtasks">
        <el-upload class="upload-demo" action="">
          <i class="button el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAtmsById } from '@/api/atms/index'
import { initForm, rules } from './options.js'
export default {
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
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    close () {
      this.$router.history.go(-1)
    },
    loadPage () {
      this.pageLoading = true
      getAtmsById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>

<style scoped lang="scss">
.detail-left {
  padding: 0 15px 60px 15px;
  .button {
    padding: 8px;
    border: 1px solid #ddd;
  }
  .sub {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
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
  .form-half {
    span {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin-right: 10px;
      }
    }
  }
}
</style>