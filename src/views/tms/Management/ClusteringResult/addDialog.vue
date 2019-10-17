<template>
  <iep-dialog :title="`${methodName}中心词`" :dialog-show="dialogShow" width="500" @close="close()">
    <el-form ref="form" :model="form" size="small" label-width="120px">
      <iep-form-item label-name="中心词">
        <tms-select v-model="form.CentralWord" :disabled="methodName=='编辑'"></tms-select>
      </iep-form-item>
      <iep-form-item label-name="卫星词">
        <tms-tag-select v-model="form.SatelliteWord" :value="editSatelliteWord"></tms-tag-select>
        <!-- <tms-select v-model="form.SatelliteWord" :AddOption="AddOption"  @relation-change="handleSatelliteWordChange"></tms-select> -->
      </iep-form-item>
      <div class="word-list">
        <span v-for="(item,index) in SatelliteWordList" :key="index" :class="form.SatelliteWord.map(m=>m.id).includes(item.commonId)?'active':''" @click="changeWord(item)">{{item.commonName}}</span>
        <div style="text-align: center;margin: 20px 0;">
          <el-pagination background layout="prev, pager, next, total" :total="params.total" :page-size="params.size" @current-change="currentChange"></el-pagination>
        </div>
      </div>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="save">保 存</iep-button>
      <iep-button @click="dialogShow = false">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import TmsSelect from '@/views/tms/Select/TmsSelect.vue'
import TmsTagSelect from '@/views/tms/Components/TmsTagSelect.vue'
import { getResultFreePage } from '@/api/tms/management'
export default {
  components: { TmsSelect, TmsTagSelect },
  data () {
    return {
      dialogShow: false,
      form: {
        CentralWord: '',
        SatelliteWord: [],
      },
      SatelliteWordList: [],
      params: {
        current: 1,
        size: 20,
        total: 0,
      },
      AddOption: [],
      methodName: '新增',
      formRequestFn: () => { },
      editSatelliteWord: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.loading = true
      getResultFreePage(Object.assign({}, this.paramForm, this.params)).then(({ data }) => {
        this.SatelliteWordList = data.data.records

        this.params.total = data.data.total
        this.loading = false
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    changeWord (item) {
      if (this.form.SatelliteWord.map(m => m.id).includes(item.commonId)) {
        const wordIndex = this.form.SatelliteWord.map(m => m.id).indexOf(item.commonId)
        this.form.SatelliteWord.splice(wordIndex, 1)
      }
      else {
        this.form.SatelliteWord.push({
          id: item.commonId,
          name: item.commonName,
        })
      }
    },
    save () {
      this.form.SatelliteWord = this.form.SatelliteWord.map(m => m.id)
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.formRequestFn(this.form.CentralWord, this.form.SatelliteWord).then(res => {
            if (res.data.data === true) {
              this.$message({
                type: 'success',
                message: `${this.methodName}成功!`,
              })
              this.close()
            } else {
              this.$message({
                type: 'info',
                message: `${this.methodName}失败,${res.data.msg}`,
              })
            }
          })
        } else {
          return false
        }
      })
    },
    handleSatelliteWordChange (value) {
      console.log(value)
      // this.form.projectId = v && v.id
      // this.form.projectName = v && v.name
      // this.form.serialNo = v && v.serialNo
      // this.form.protocolName = value && value.name
    },
    close () {
      this.form = {
        CentralWord: '',
        SatelliteWord: [],
      },
        this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>
<style lang="scss" scoped>
.word-list {
  > span {
    border: 1px solid rgb(233, 233, 233);
    border-radius: 2px;
    display: inline-block;
    margin: 10px 5px;
    padding: 2px 20px;
    cursor: pointer;
  }

  .active {
    border: 1px solid #e15256;
    position: relative;
    &::before {
      content: "\2713";
      z-index: 2;
      font-size: 8px;
      color: #fff;
      position: absolute;
      right: -1px;
      bottom: -3px;
    }
    &::after {
      content: " ";
      position: absolute;
      right: -2px;
      color: #fff;
      bottom: -7px;
      font-size: 0;
      border-width: 10px;
      border-color: #e15256;
      border-left-width: 0;
      border-style: dashed;
      transform: rotate(225deg);
      border-top-color: transparent;
      border-bottom-color: transparent;
    }
  }
}
</style>
