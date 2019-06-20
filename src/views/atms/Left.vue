<template>
  <div class="detail-left iep-page-form">
    <page-header :title="`${methodName}`" :backOption="backOption"></page-header>
    <div class="sub">
      <span>所属任务：{{subTitle}}</span>
      <span class="opt">
        <span><i class="iconfont icon-xingxing"></i>关注<span><i class="iconfont icon-xitongguanli"></i>任务菜单</span></span>
      </span>
    </div>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" class="form form-detail" v-for="(item,index) in itemList" :key="index">
      <el-form-item label="状态：" class="form-half">
        <span>{{item.state}}</span>
      </el-form-item>
      <el-form-item label="优先级：" class="form-half">
        <span>{{item.priority}}</span>
      </el-form-item>
      <el-form-item label="协同人：" class="form-half">
        <span>
          <img class="img" :src="item.img1" alt="">
          {{item.executor}}
        </span>
      </el-form-item>
      <el-form-item label="执行人：" class="form-half">
        <span>
          <img class="img" :src="item.img1" alt="">
          {{item.synergist}}
        </span>
      </el-form-item>
      <el-form-item label="起止时间：">
        <span>{{item.startEndTime}}</span>
      </el-form-item>
      <iep-form-item prop="learningTag" label-name="标签" tip="请输入不少于3个标签">
        <iep-tag v-model="item.learningTag"></iep-tag>
      </iep-form-item>
      <el-form-item label="备注：">
        <span>{{item.remarks}}</span>
      </el-form-item>
      <el-form-item label="子任务：" prop="subtasks">
        <el-upload class="upload-demo" action="">
          <i class="button el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="附件：" prop="enclosure">
        <el-input v-model="item.enclosure"></el-input>
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
      formData: initForm(),
      rules,
      itemList: [
        {
          state: '未完成',
          priority: '普通',
          synergist: '钟乙乔',
          img1: '../img/person/p120.jpg',
          executor: '何益挺',
          img2: '../img/person/p012.jpg',
          startEndTime: '2018-12-13~2019-02-17',
          remarks: '当前阶段完成后，及时与相关部门对接，务必加快项目进程',
        },
      ],
    }
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