<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}`" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="评选名称" prop="selectionName">
        <el-input v-model="form.selectionName"></el-input>
      </el-form-item>
      <el-form-item label="关联指标" prop="targetId">
        <el-select v-model="form.targetId" size="small" clearable>
          <el-option v-for="(item, index) in targetlist" :key="index" :label="item.targetName" :value="item.targetId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优先级" prop="priority">
        <el-input v-model="form.priority"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简述">
        <el-input v-model="form.describes"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getTargetlist, getGloriousById } from '@/api/hrms/event_selection'
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
// import { mapGetters } from 'vuex'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
      id: '',
      targetlist: [],
    }
  },
  // },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
      getTargetlist().then(({ data }) => {
        this.targetlist = data.data
      })
    },
    loadTypeList () {
      getGloriousById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
      })
    },
    async submitForm () {
      const { data } = await this.formRequestFn({ id: this.id, ...this.form })
      if (data.data) {
        this.$message.success('操作成功')
        this.loadPage()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>