<template>
  <div>
    <div class='batch-import'>
      <el-container>
        <div class='input-area'>
          <div class='input-title'>
            <iep-button type='text' style='color:black;font-size:16px'>输入区</iep-button>
            <div>
              <iep-button type='text' icon='el-icon-warning' size='medium'
                style='margin-right:10px;color:#999' @click='handleVisible'>格式</iep-button>
              <iep-button type="primary" @click="submit">保存</iep-button>
            </div>
          </div>

          <div class='input-content'>
            <!-- <el-input type="textarea" :autosize="{minRows:23,maxRows:23}" placeholder='请将当前所选题型的所有试题复制到这里'
              v-model="testQuestions">
              <el-scrollbar>
                <slot></slot>
              </el-scrollbar>
            </el-input> -->

            <iep-input-area :autosize='{minRows:24,maxRows:24}' placeholder='请将当前所选题型的所有试题复制到这里'
              :value='testQuestions' @input='editor(arguments[0])'>
            </iep-input-area>

          </div>
        </div>

        <el-aside class="inspection-area" width='50%'>
          <div class='inspection-title'>
            <iep-button type='text' style='color:black;font-size:16px'>检查区</iep-button>
            <span class="error-text" v-show="errorCount>0">共{{errorCount}}处错误，请参照例题修改</span>
          </div>
          <el-scrollbar>
            <div id="inspectionContent">
              <div class='question' v-for="(item,index) in itemBankList" :key="index">
                <p v-if="item.title && item.title.length > 4">
                  <pre><span class="caption">{{index+1}}.</span>{{item.title}}</pre>
                </p>
                <p class='qt_error' v-else>题目：至少5个字符</p>
                <p class='qt_error' v-if="item.titleOptions.length<2 && (value===13 || value===12)">
                  选项（至少两项）</p>
                <ul v-if="value===13">
                  <li v-for="(option,index) in item.titleOptions" :key="index"
                    :class="option.class">
                    <el-radio v-model="item.answer" :label="option.key"> <span
                        class="caption">{{option.key}}.</span>{{option.value}}</el-radio>
                  </li>
                </ul>
                <el-checkbox-group v-model="item.answer" v-if="value===12">
                  <el-checkbox v-for="(option,index) in item.titleOptions" :label="option.key"
                    :key="index" :class="option.class">
                    <span class="caption">{{option.key}}.</span>{{option.value}}
                  </el-checkbox>
                </el-checkbox-group>
                <p v-if="item.answer"><span class="caption">答案：</span>{{item.answer}}</p>
                <p class='qt_error' v-if="!item.answer && value > 10 && value < 20">答案: 缺少答案</p>
                <p v-if="item.analysis"><span class="caption">解析：</span>{{item.analysis}}</p>
                <!-- <p class='qt_error' v-else>解析: 缺少解析</p> -->
                <p v-if="item.tag"><span class="caption">标签：</span>{{item.tag}}</p>
                <p class='qt_error' v-else>标签: 缺少标签</p>
              </div>
            </div>
          </el-scrollbar>
        </el-aside>
      </el-container>
    </div>
    <el-dialog :visible.sync='dialogShow' width="500px" title='例题示范' @close='dialogShow=false'>
      <div class='dialog-body'>
        <div class='accordion batch-cont' v-show='value===13'>
          <div class='accordion-group'>
            <h2>单选题</h2>
            <div id='collapse1' class='b-example accordion-body collapse in'>
              <div class='accordion-inner'>
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、和(1)三种格式。<br />
                  2、选项支持A.和A、两种格式，最多支持 8 个选项。<br />
                  3、答案中请勿加分隔符或空格
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.驾驶人有下列哪种违法行为一次记6分</span><br>
                  <span>A、使用其他车辆行驶证</span><br>
                  <span>B、饮酒后驾驶机动车</span><br>
                  <span>C、车速超过规定时速50%以上</span><br>
                  <span>D、违法占用应急车道行驶</span><br>
                  <span>答案:D</span><br>
                  <span>解析:请仔细阅读交规<span class='exam-notes'>(若无解析本行可不填)</span></span><br>
                  <span>标签:<span>内网水巢</span>、<span>数据基因</span>、<span>个人赋能</span></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class='accordion batch-cont batch-cont-dn' v-show='value===12'>
          <div class='accordion-group'>
            <h2>复选题</h2>
            <div id='collapse2' class='b-example accordion-body collapse in'>
              <div class='accordion-inner'>
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、和(1)三种格式。<br />
                  2、选项支持A.和A、两种格式，最多支持 8 个选项。<br />
                  3、答案中请勿加分隔符或空格
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.驾驶人有下列哪种违法行为一次记6分？</span><br />
                  <span>A、使用其他车辆行驶证</span><br />
                  <span>B、饮酒后驾驶机动车</span><br />
                  <span>C、车速超过规定时速50%以上</span><br />
                  <span>D、违法占用应急车道行驶</span><br />
                  <span>答案:ABCD</span><br />
                  <span>解析:请仔细阅读交规<span class='exam-notes'>(若无解析本行可不填)</span></span><br>
                  <span>标签:<span>内网水巢</span>、<span>数据基因</span>、<span>个人赋能</span></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class='accordion batch-cont batch-cont-dn' v-show='value===11'>
          <div class='accordion-group'>
            <h2>判断题</h2>
            <div id='collapse3' class='b-example accordion-body collapse in'>
              <div class='accordion-inner'>
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、(1）三种格式。<br />
                  2、答案支持正确、错误和对、错两种格式。
                </p>
                <h3>输入范例</h3>
                <p>
                  <span>1.国际象棋起源于英国吗？</span><br />
                  <span>答案:正确</span><br />
                  <span>解析:请仔细阅读交规<span class='exam-notes'>(若无解析本行可不填)</span></span><br>
                  <span>标签:<span>内网水巢</span>、<span>数据基因</span>、<span>个人赋能</span></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class='accordion batch-cont batch-cont-dn' v-show='value === 10 || value === 10000'>
          <div class='accordion-group'>
            <h2>{{value === 10 ? '简答题' : '操作题'}}</h2>
            <div id='collapse4' class='b-example accordion-body collapse in'>
              <div class='accordion-inner'>
                <h3>输入规范</h3>
                <p>
                  1、题号支持1.和1、(1）三种格式。<br />
                  2、支持人工判卷
                </p>
                <h3>输入范例</h3>
                <span>1.请论述全球化对国家政治产生了哪些深刻的影响？</span><br />
                <span>答案:全球化使国家主权受到一定的制约； 全球化对政府的治理提出了更高的要求。</span><br />
                <span>解析:请仔细阅读交规<span class='exam-notes'>(若无解析本行可不填)</span></span><br>
                <span>标签:<span>内网水巢</span>、<span>数据基因</span>、<span>个人赋能</span></span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </el-dialog>
  </div>
</template>
<script>
import { gruber, markArray } from './makedown'
function sortKey (array, key) {
  return array.sort(function (a, b) {
    var x = a[key]
    var y = b[key]
    return ((x < y) ? -1 : (x > y) ? 1 : 0)
  })
}
export default {
  props: ['value'],
  data () {
    return {
      gruber,
      markArray,
      dialogShow: false,
      testQuestions: '',
      itemBankList: [],
      count: 0,
      itemBank: {},
      errorCount: 0,
    }
  },
  methods: {
    // 查看格式
    handleVisible () {
      if (this.value) {
        this.dialogShow = true
      } else {
        this.$message({
          message: '请先选择题型',
          type: 'warning',
        })
      }
    },
    //输入内容
    editor (value) {
      if (this.value) {
        this.toHtml(value)
      } else {
        this.$message({
          message: '请选择试题的分类',
          type: 'warning',
        })
      }

    },

    toHtml (value) {
      this.testQuestions = value
      this.count = 0
      this.itemBankList = []
      this.itemBank = { titleOptions: [] }
      let input = this.toHtmlTree(value)
      this.renderJsonML(input)
    },

    toHtmlTree (input) {
      if (typeof (input) === 'string') {
        let blocks = input instanceof Array ? input : this.splitBlocks(input)
        var tree = []

        for (let i = 0; i < blocks.length; i++) {
          let b = this.processBlock(blocks[i])

          if (!b.length) continue
          tree.push(b)
        }
      }
      return tree
    },


    splitBlocks (input) {
      //将全局的换行/回车符替换为换行符
      input = input.replace(/(\r\n|\n|\r)/g, '\n')
      /**
       * 这里是判断若选项位于同一行，则自动转行，判断依据是选项前有空格且选项后有点或顿号 否则视为同一选项中的内容
       */
      let res = /(\s)+([a-z])([、，,．]|\.)/gi
      input = input.replace(res, '\n$2$3')
      // 两行中间没有空格也会显示成<p></p><p></p>
      let re = /([\s\S]+?)($|\n#|\n(?:\s*\n|$)*)/g,
        blocks = [],
        m
      let line_no = 1
      if ((m = /^(\s*\n)/.exec(input)) != null) {
        line_no += this.countLines(m[0], blocks)
        re.lastIndex = m[0].length
      }
      while ((m = re.exec(input)) !== null) {
        if (m[2] == '\n#') {
          m[2] = '\n'
          re.lastIndex--
        }
        blocks.push(this.mkBlock(m[1], m[2], line_no))
        line_no += this.countLines(m[0], blocks)
      }
      return blocks
    },

    mkBlock (block, trail, line) {
      if (arguments.length == 1) {
        trail = '\n\n'
      }
      let s = new String(block)
      s.trailing = trail
      if (line) {
        s.lineNumber = line
      }
      s = s.substr(0, 1).toUpperCase() + s.substr(1, s.length - 1)
      return s.replace(/^([A-Z]|\d+)([、，,．]|\s)/, '$1.')
    },

    countLines (str) {
      let n = 0, i = -1
      while ((i = str.indexOf('\n', i + 1)) !== -1) n++
      //连续两次或以上换行，视为两道题的分割线
      // if (n>1) blocks.push('-------分割线-------');
      return n
    },

    processBlock (block) {
      let ord = JSON.parse(JSON.stringify(this.markArray))
      for (let i = 0; i < ord.length; i++) {
        let res = this.gruber.block[ord[i]].call(this, block, this.value)
        if (res) {
          return res
        }
      }
    },

    renderJsonML (jsonml) {
      for (let i = 0; i < jsonml.length; i++) {
        var title_reg = new RegExp('title')
        // var error_reg = new RegExp('para')
        //这是无法识别出来的内容，统一视为上一项中的内容
        // for (var j = i; j < jsonml.length - 1; j = i) {//都是检测下一项，所以不用再去对最后一行做判断
        // if (error_reg.test(jsonml[j + 1][0])) {//检测当前项的下一项
        //   console.log('error',jsonml[j + 1][1])
        //   jsonml[i][1] += ('\n' + jsonml[j + 1][1])
        //   jsonml.splice(j + 1, 1)
        // } else {
        //   break
        // }
        // }
        // 题目计数
        if (title_reg.test(jsonml[i][0])) {
          this.count++
        }
        if (this.count > 1) {
          this.itemBankList.push(this.itemBank)
          this.itemBank = { titleOptions: [] }
          this.count = 1
        }
        if (jsonml[i][0].match(/^[A-Z]/)) {
          if (this.countOccurences(this.itemBank.titleOptions, jsonml[i][0]) === 0) {
            this.itemBank.titleOptions.push({ key: jsonml[i][0], value: jsonml[i][1] })
          } else {
            this.itemBank.titleOptions.push({ class: 'qt_error', key: jsonml[i][0], value: jsonml[i][1] })
          }
          sortKey(this.itemBank.titleOptions, 'key')
        } else {
          this.itemBank[jsonml[i][0]] = jsonml[i][1]
        }
      }
      if (this.count === 1) {
        this.itemBankList.push(this.itemBank)
      }
    },

    countOccurences (arr, value) {
      return arr.reduce((a, v) => v.key === value ? a + 1 : a + 0, 0)
    },
    //提交
    submit () {
      this.errorCount = document.getElementById('inspectionContent').getElementsByClassName('qt_error').length
      if (this.errorCount === 0 && this.itemBankList.length > 0) {
        this.$emit('submit-batch', this.itemBankList)
      } else {
        this.$message({
          message: '请检查输入区是否填写正确',
          type: 'warning',
        })
      }
    },
  },
}
</script>

<style lang='scss' scoped>
.batch-import {
  .input-area {
    flex: 1;
    .input-title {
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
    }
  }

  .inspection-area {
    margin-left: 3%;
    .inspection-title {
      margin-bottom: 15px;
      .error-text {
        margin-left: 10px;
        color: #f00;
      }
    }

    #inspectionContent {
      height: 500px;
      .question {
        position: relative;
        margin-bottom: 17px;
        padding: 15px;
        line-height: 22px;
        font-size: 12px;
        color: #494949;
        background-color: #fafafa;
        border: 1px solid #dadada;
        .qt_error {
          padding-left: 10px;
          margin-bottom: 5px;
          color: #fff;
          font-weight: bold;
          background-color: #de7474;
          border-radius: 2px;
          word-wrap: break-word;
          word-break: break-all;
        }
        p {
          font-size: 14px;
          .caption {
            display: inline-block;
            margin-right: 3px;
            font-size: 14px;
            color: #265dc1;
          }
        }
        ul {
          padding: 0px;
          list-style: none;
        }
        .el-checkbox {
          display: block;
        }
        li,
        .el-checkbox {
          margin: 0 0 7px 0;
          padding: 4px;
        }
      }
    }
  }
}

.dialog-body {
  margin: 0;
  padding: 0;
  outline: none;
  font-family: "Microsoft yahei";
  .accordion-group {
    h2 {
      text-align: center;
    }
    .b-example {
      h3 {
        line-height: 30px;
        font-size: 16px;
        color: #6b6b6b;
      }
      .exam-notes {
        color: #f00;
      }
    }
  }
}
</style>


