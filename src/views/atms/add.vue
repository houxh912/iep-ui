<template>
  <div class="abs iep-page-form">
    <page-header :title="`${methodName}任务`" :backOption="backOption"></page-header>
    <el-form
      :model="formData"
      :rules="rules"
      ref="form"
      label-width="200px"
      class="form form-detail"
    >
      <el-row>
        <el-col>
          <el-form-item label="任务名称：" prop="tasktName">
            <el-input v-model="formData.tasktName" placeholder="请填写任务名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>  
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属任务：" prop="ownTask">
            <iep-dict-select v-model="formData.ownTask" dict-name="prms_project_level"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>  
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态：" prop="status">
            <iep-dict-select v-model="formData.status" placeholder="未完成" dict-name="prms_project_level"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row>  
      <el-row>
        <el-col :span="12">
          <el-form-item label="优先级：" prop="priority">
            <iep-dict-select v-model="formData.priority" placeholder="普通" dict-name="prms_project_level"></iep-dict-select>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <el-form-item label="协同人：" prop="synergist">
            <el-input v-model="formData.synergist"></el-input>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <el-form-item label="执行人：" prop="executor">
            <el-input v-model="formData.executor"></el-input>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <el-form-item label="起止时间：" prop="implementRangeTime">
            <iep-date-picker v-model="formData.implementRangeTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </iep-date-picker>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <el-form-item label="标签：" prop="sign">
            <el-input v-model="formData.sign"></el-input>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col>
          <el-form-item label="备注：" prop="remarks">
            <el-input v-model="formData.remarks"  type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <el-form-item label="子任务：" prop="subtasks">
            <el-upload
              class="upload-demo"
              action="">
              <i class="button el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col>
          <el-form-item label="附件：" prop="enclosure">
            <el-input v-model="formData.enclosure"></el-input>
          </el-form-item>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <el-form-item label="关联内容：" prop="subtasks">
            <el-upload
              class="upload-demo"
              action="">
              <i class="button el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row> 
    </el-form>
    <footer-tool-bar>
      <iep-button type="primary">保存</iep-button>
      <iep-button>取消</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import { initForm,rules } from './options.js'
export default {
  data () {
    return {
      methodName: '新增',
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.close()
        },
      },
      formData: initForm(),
      rules,
    }
  },
}
</script>

<style scoped lang="scss">
.abs {
  padding: 15px 15px 60px 15px;
  .button{
    padding: 8px;
    border: 1px solid #ddd;
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