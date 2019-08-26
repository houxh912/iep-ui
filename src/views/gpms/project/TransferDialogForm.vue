<template>
  <iep-dialog :dialog-show="dialogShow" :title="`变更${methodName}`" width="600px" @close="loadPage">
    <el-form :model="form" ref="form" :rules="rules" class="form-detail" size="small" label-width="160px">
      <el-form-item label="项目经理：" v-if="form.pubilsh==false||form.pubilsh==''">
        <iep-contact-select v-model="form.projectManagerList" :is-show-contact-btn="false"></iep-contact-select>
      </el-form-item>
      <el-form-item label="将项目移至项目公海：">
        <el-checkbox v-model="form.pubilsh">是</el-checkbox>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">确定</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initTransferForm, rules } from './Total/const'
import { statusCancel } from '@/api/gpms/fas'
import { transferManagerList } from '@/api/gpms/index'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      methodName: '项目指导',
      formRequestFn: () => { },
      form: initTransferForm(),
      rules,
      ids:[],
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initTransferForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      let ids=this.form.projectManagerList.id
      // this.form.pubilsh==true ? ids=0 : ids
      const obj = {
        projectId:this.ids,
        ids:ids,
      }
      if(this.form.pubilsh==true){
        this.$confirm('项目移入公海后，将不能在我的项目中进行管理。是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          statusCancel(this.ids).then(() => {
            this.$message.success('移入公海成功！')
            this.loadPage()
          })
        })
      }
      else{
        this.$confirm('项目移交后，将不能在我的项目中进行管理。是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          transferManagerList(obj).then(({ data }) => {
            if (data.data) {
              this.$message.success('移交成功')
              this.loadPage()
            } else {
              this.$message(data.msg)
            }
          })
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
