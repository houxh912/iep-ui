<template>
  <el-dialog title="新增" :visible.sync="dialogFormVisible">
    <el-form :model="form" size="small">
      <el-form-item label="线下公司：" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入线下公司名称"></el-input>
      </el-form-item>
      <el-form-item label="户头所属公司：" :label-width="formLabelWidth">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
      <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      form: initForm(),
    }
  },
}
</script>
