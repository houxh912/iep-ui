<template>
  <iep-dialog :dialog-show="dialogShow" title="定制产品" width="500px" @close="dialogShow=false">
    <el-form :model="form" :rules="rules" label-width="120px" size="small" class="form-detail">
      <el-form-item label="产品定制名称：" prop="customName">
        <el-input v-model="form.customName" placeholder="请输入产品定制名称"></el-input>
      </el-form-item>
      <el-form-item label="产品说明：">
        <el-input v-model="form.synopsis" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { putCustomProdect } from '@/api/app/cpms/custom_product'
import { columnsMap, initSearchForm, rules } from './options'
import mixins from '@/mixins/mixins'
// import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      rules,
      form: initSearchForm(),
      ids: [],
      dialogShow: false,
    }
  },
  // },
  methods: {
    init () {
      this.dialogShow = false
      this.form = initSearchForm()
    },
    //防止点击频率过快，导致加载两条
    debounce (fn, wait) {
      let timeout = null
      return function () {
        if (timeout !== null) clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
      }
    },
    async submitForm () {
      this.debounce(putCustomProdect({ customModules: this.ids, ...this.form }).then(({ data }) => {
        if (data.data) {
          this.$message.success('提交成功')
          this.init()
          this.$emit('load-page')
        } else {
          this.$message(data.msg)
        }
      }), 1000)
    },
  },
}
</script>