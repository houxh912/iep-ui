<template>
  <div class="mainContainer">
    <el-row>
      <el-col :span="1">
        <div class="number">
          {{data.orderNumber = index+1 ? index+1 : ""}}
        </div>
      </el-col>
      <el-col :span="13">
        <single-election v-if="data.type == '1'" :data="data"></single-election>
        <multiple-election v-if="data.type == '2'" :data="data"></multiple-election>
        <img-select v-if="data.type == '3'" :data="data"></img-select>
        <multiple-img-select v-if="data.type == '4'" :data="data"></multiple-img-select>
        <select-election v-if="data.type == '5'" :data="data"></select-election>
        <fill-blank v-if="data.type == '6'" :data="data"></fill-blank>
        <multiple-fill-blank v-if="data.type == '7'" :data="data"></multiple-fill-blank>
        <scoring v-if="data.type == '8'" :data="data"></scoring>
        <file-upload v-if="data.type == '9'" :data="data"></file-upload>
        <remarks v-if="data.type == '10'" :data="data"></remarks>
        <concluding v-if="data.type == '11'" :data="data"></concluding>
      </el-col>
      <el-col :span="10" style="color: #909399;">
        <el-button class="selfBtn" v-if="data.type == '1' || data.type == '2' || data.type == '3' || data.type == '4' || data.type == '5'" type="text" @click="logic(index)"><i class="iconfont icon-xitongshezhi1"></i>逻辑配置</el-button>
        <el-button class="selfBtn" v-if="data.type != '11'" type="text" @click="copyData(index)"><i class="iconfont icon-cz-yinyongsj"></i>复制</el-button>
        <el-button class="selfBtn" v-if="data.type != '11'" type="text" @click="deleteData(index)"><i class="iconfont icon-shanchu"></i>删除</el-button>
        <!-- <el-button class="selfBtn" v-if="data.type != '11' && star && data.isGrade == '1'" type="text" @click="scoreStar(index)"><i class="iconfont icon-pingfen"></i>自动评分</el-button> -->
        <el-button class="selfBtn" v-if="data.type != '10' && data.type != '11'" type="text" @click="()=>this.$set(this.data,'isRequire',this.data.isRequire == '1' ? '2' : '1')">
          是否必填
          <el-checkbox v-model="data.isRequire" true-label="1" false-label="2"></el-checkbox>
        </el-button>
        <el-button class="selfBtn" v-if="data.type != '10' && data.type != '11'" type="text" @click="()=>this.$set(this.data,'isShow',this.data.isShow == '1' ? '2' : '1')">
          是否显示
          <el-checkbox v-model="data.isShow" true-label="1" false-label="2"></el-checkbox>
        </el-button>
        <!-- <el-button class="selfBtn" v-if="(data.type == '1' || data.type == '2' || data.type == '3' || data.type == '4' || data.type == '5') && star" type="text" @click="()=>this.$set(this.data,'isGrade',this.data.isGrade == '1' ? '2' : '1')">
          是否评分
          <el-checkbox v-model="data.isGrade" true-label="1" false-label="2"></el-checkbox>
        </el-button> -->
        <div>
          {{data.logic.type == 'jump' ? '跳转逻辑：' : (data.logic.type == 'display' ? '显示逻辑：' : '')}}
          <div v-if="data.logic.type == 'jump'">
            <div v-for="item in data.logic.logic" :key="item">
              选择：{{item.source}} 时跳转到：{{item.target}}
            </div>
          </div>
          <div v-if="data.logic.type == 'display'">
            <div v-for="item in data.logic.logic" :key="item">
              选择：{{item.source}} 时显示：{{item.target}}
            </div>
          </div>
          <div v-else>
          </div>
        </div>
        <div style="margin:10px 0" v-if="data.isGrade == '1'">
          评分 -- 关联指标： {{indexName}}
          <div>
            <div v-for="item in data.optionList" :key="item">
              <div>选择：{{item.name}} 时得到 {{item.grade ? item.grade : 0}}分</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <logic-dialog :list="list" :data="data" @setLogic="setLogic" ref="logicDialog">
    </logic-dialog>
  </div>
</template>


<script>
/*eslint-diable*/
import singleElection from './singleElection'
import multipleElection from './multipleElection'
import imgSelect from './imgSelect'
import multipleImgSelect from './multipleImgSelect'
import selectElection from './select'
import fillBlank from './fillBlank'
import multipleFillBlank from './multipleFillBlank'
import scoring from './scoring'
import fileUpload from './fileUpload'
import remarks from './remarks'
import concluding from './concluding'
import logicDialog from '../logicDialog'
import { getIndexById } from '@/api/evaluate/question'
export default {
  components: { singleElection, multipleElection, imgSelect, multipleImgSelect, selectElection, fillBlank, multipleFillBlank, scoring, fileUpload, remarks, concluding, logicDialog },
  props: {
    data: {
      type: Object,
      default: () => { },
    },
    index: {
      type: Number,
      default: 1,
    },
    list: {
      type: Array,
      default: () => [],
    },
    star: {
      type: Boolean,
      default: () => false,
    },
    projectId: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      currentIndex: null,
      indexName: '',
    }
  },
  watch: {
    'data.evaluateId': {
      deep: true,
      handler: function (val) {
        if (val) {
          getIndexById(val).then(({ data }) => {
            this.indexName = data.data.indexName
          })
        }
      },
    },
  },
  computed: {

  },
  created () {
    if (this.data.evaluateId) {
      getIndexById(this.data.evaluateId).then(({ data }) => {
        this.indexName = data.data.indexName
      })
    }
    // // console.log('aaaaaa',this.index)
  },
  methods: {
    copyData (index) {
      this.$emit('handleCopy', index)
    },
    deleteData (index) {
      this.$emit('handleDelete', index)
    },
    logic (index) {
      this.currentIndex = index
      // console.log(this.index,"嘻嘻嘻嘻")
      this.$refs['logicDialog'].open()
    },
    scoreStar () {
    },
    setLogic (data) {
      this.$set(this.list[this.currentIndex], 'logic', data)
      // console.log("接受到的数据",this.currentIndex,data)
    },
  },
}
</script>
<style lang="scss" scoped>
.mainContainer {
  margin: 5px 10px;
  border-bottom: 1px solid #dcdfe6;
  .number {
    color: #909399;
    width: 30px;
    height: 30px;
    line-height: 30px;
    float: right;
    background: #f2f6fc;
    text-align: center;
    border-radius: 50%;
    margin: 10px;
    font-weight: 600;
  }
  .selfBtn {
    color: #909399;
    > .el-checkbox__inner {
      &:after {
        border-color: #909399;
      }
    }
    > .el-checkbox__inner {
      background-color: #fff;
      border-color: #dcdfe6;
    }
  }
}
</style>
<style scoped>
.rightSpace {
  width: 100%;
  border: 1px solid #dcdfe6;
  margin: 5px 0px;
}
.rightSpace .number {
  padding: 5px 8px;
  display: inline-block;
  border: 1px solid #dcdfe6;
  margin: 5px;
}
.title {
  margin: 5px;
}
.title span {
  margin: 0px 10px 0 0;
}
.nameForSpan {
  display: inline-block;
  width: 20%;
  margin: 0 !important;
}
.title h3 {
  font-size: 18px;
}
</style>
