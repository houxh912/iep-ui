<template>
  <div class="space">
    <div class="spaceHeader">
      <el-col :span="8">
        <div class="title">
          Q{{questionData.orderNumber}}:{{questionData.title}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chartBtns">
          <el-button v-if="['2','4','6','7','8','9'].indexOf(questionData.type) == -1" size="small" :type="status == 1 ? 'primary' : 'default'" @click="changeStatus(1)">饼图</el-button>
          <el-button v-if="['2','4','6','7','8','9'].indexOf(questionData.type) == -1" size="small" :type="status == 2 ? 'primary' : 'default'" @click="changeStatus(2)">圆形图</el-button>
          <el-button v-if="['6','7','9'].indexOf(questionData.type) == -1" size="small" :type="status == 3 ? 'primary' : 'default'" @click="changeStatus(3)">柱形图</el-button>
          <el-button v-if="['6','7','9'].indexOf(questionData.type) == -1" size="small" :type="status == 4 ? 'primary' : 'default'" @click="changeStatus(4)">条形图</el-button>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="handle">
          <el-select v-model="value" placeholder="请选择题目" @change="changeData">
            <el-option
              v-for="item in menuList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </div>
    <div class="spaceContainer">
      <div class="export">
        <el-button size="small" v-if="['6','7','9'].indexOf(questionData.type) == -1" @click="downLoad">导出图片</el-button>
      </div>
      <div style="height:400px" v-if="['6','7','9'].indexOf(questionData.type) == -1">
        <pie ref="pie" v-if="status == 1" :data="questionData"></pie>
        <ring ref="ring" v-if="status == 2" :data="questionData"></ring>
        <column ref="column" v-if="status == 3" :data="questionData"></column>
        <linear ref="linear" v-if="status == 4" :data="questionData"></linear>
      </div>
      <div v-if="questionData.type == '6'">
        <div class="flexTable">
          <div class="flexbox">
            <div class='boxItem'>答案</div>
            <div v-for="item in questionData.data[0].value" :key='item'>
              <div class='boxItem' v-if="item">
                {{item}}
              </div>
            </div>
          </div>
        </div>
        <div class="flexAnswer">
        参与人数：{{questionData.total}}人
        </div>
      </div>
      <div v-else-if="questionData.type == '7'">
        <div class="flexTable">
          <div class="flexbox" v-for="(item,index) in questionData.data" :key="index">
            <div class='boxItem'>{{item.name}}</div>
            <div v-for="item2 in item.value" :key='item2'>
              <div class='boxItem' v-if="item2">
                {{item2}}
              </div>
            </div>
          </div>
        </div>
        <div class="flexAnswer">
        参与人数：{{questionData.total}}人
        </div>
      </div>
      <div v-else-if="questionData.type == '8'">
        <div class="flexTable">
          <div class="flexbox">
            <div class='boxItem'>选项</div>
            <div class='boxItem' v-for="item in questionData.data" :key="item">
              {{item.name}}
            </div>
          </div>
          <div class="flexbox">
            <div class='boxItem'>1分</div>
            <div v-for="item in questionData.data" :key="item">
              <div class='boxItem' v-if="item">
                {{item.value["1"]}}
              </div>
            </div>
          </div>
          <div class="flexbox">
            <div class='boxItem'>2分</div>
            <div v-for="item in questionData.data" :key="item">
              <div class='boxItem' v-if="item">
                {{item.value["2"]}}
              </div>
            </div>
          </div>
          <div class="flexbox">
            <div class='boxItem'>3分</div>
            <div v-for="item in questionData.data" :key="item">
              <div class='boxItem' v-if="item">
                {{item.value["3"]}}
              </div>
            </div>
          </div>
          <div class="flexbox">
            <div class='boxItem'>4分</div>
            <div v-for="item in questionData.data" :key="item">
              <div class='boxItem' v-if="item">
                {{item.value["4"]}}
              </div>
            </div>
          </div>
          <div class="flexbox">
            <div class='boxItem'>5分</div>
            <div v-for="item in questionData.data" :key="item">
              <div class='boxItem' v-if="item">
                {{item.value["5"]}}
              </div>
            </div>
          </div>
        </div>
        <div class="flexAnswer">
        参与人数：{{questionData.total}}人
        </div>
      </div>
      <div v-else-if="questionData.type == '9'">
        <div class="flexTable">
          <div class="flexbox">
            <div v-for="item in questionData.data[0].value" :key="item">
              <div class='boxItem' v-if="item">
                {{item.value.name}}
                  <i class="curp el-icon-download" @click="downLoadFile(item.value.url)"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="flexAnswer">
        参与人数：{{questionData.total}}人
        </div>
      </div>
      <div class="table" v-else>
        <div class="row" v-for="(item,index) in questionData.data" :key="index">
          <el-col :span="12">
            <div class="left">
              {{item.name}}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right">
              {{item.value}}
            </div>
          </el-col>
        </div>
        <div class="answer">
        参与人数：{{questionData.total}}人
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pie from './charts/pie'
import ring from './charts/ring'
import column from './charts/column'
import linear from './charts/linear'
export default {
  components: {pie, ring, column, linear},
  data () {
    return {
      status: 1,
      value: '',
      questionData: {
        data:[],
      },
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    menuList: {
      type: Array,
      default: () => [],
    },
    question: {
      type: Object,
      default: () => {},
    },
  },
  mounted () {
    // console.log("接受的数据asd ",this.menuList)
  },
  computed: {

  },
  watch: {
    'question': {
      handler (val) {
        // console.log("改变了",val.title,this.menuList)
        let arr = []
        this.menuList.map(item=>{
          arr.push(item.value)
        })
        arr.indexOf(val.questionId) > -1 ? this.value = val.questionId : ''
        this.questionData = val
        // console.log(val)
        this.status = ['2','4','8','9'].indexOf(val.type) == -1 ? 1 : 3
        console.log('aaaa',this.questionData)
      },
    },
  },
  methods: {
    //改变图形
    changeStatus (val){
      this.status = val
    },
    changeData () {
      this.$emit('changeData',this.value)
    },
    downLoadFile (url) {
      var image = url
      var $a = document.createElement('a')
      $a.setAttribute('href', image)
      $a.setAttribute('download','阿萨大萨达所')
      $a.click()
      // console.log(url)
     //  fetch(url).then(res => res.blob()).then((blob) => {
     //   const a = document.createElement('a')
     //   a.style.display = 'none'
     //   a.href = URL.createObjectURL(blob)
     //   a.download = "name"
     //   document.body.appendChild(a)
     //   a.click()
     //   document.body.removeChild(a)
     // })
    },
    downLoad () {
      // console.log("下载",this.refs)
      // this.$refs['aaa'].downLoad()
      switch (this.status) {
        case 1:
          this.$refs['pie'].downLoad()
          break
        case 2:
          this.$refs['ring'].downLoad()
          break
        case 3:
          this.$refs['column'].downLoad()
          break
        case 4:
          this.$refs['linear'].downLoad()
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  .curp{
    cursor: pointer;
    float: right;
    margin-right: 10px;
  }
  .space{
    margin: 0 20px 20px 20px;
    border: 1px solid #99ccff;
    .spaceHeader{
      height: 50px;
      background: #E7F6EF;
      .title{
        font-size: 17px;
        line-height: 50px;
        margin: 0 15px;
      }
      .chartBtns{
        margin: 9px;
      }
      .handle{
        margin: 3px;
        float: right;
      }
    }
    .spaceContainer{

      .export{
        text-align: right;
        padding: 15px 10px;
      }
      .flexTable{
        display: flex;
        margin: 20px 40px;
        border-top: 1px solid #99ccff;
        border-left: 1px solid #99ccff;
        .flexbox{
          flex: 1;
          border-right: 1px solid #99ccff;
          // border-bottom: 1px solid #99ccff;
          .boxItem{
            border-bottom: 1px solid #99ccff;
            padding: 5px;
          }
        }
      }
      .flexAnswer{
        margin: -20px 40px 40px 40px;
        border: 1px solid #99ccff;
        border-top: none;
        padding: 5px;
      }
      .table{
        margin: 20px 40px;
        border: 1px solid #99ccff;
        .left{
          border-right: 1px solid #99ccff;
          border-bottom: 1px solid #99ccff;
          padding: 5px;
        }
        .right{
          border-bottom: 1px solid #99ccff;
          padding: 5px;
        }
        .answer{
          padding: 5px;
        }
      }

    }
  }
</style>
