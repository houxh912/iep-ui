<template>
  <div>
    <basic-container>
      <div class="box">
        <operation-container class="clearmagin">
          <template slot="left">
            <p class="sixsix">我的推荐</p>
          </template>
        </operation-container>
        <el-row>
          <el-col :span="24" class="padLeft">
            <el-radio-group v-model="radio1" class="groupBottom">
              <span>我的项目是哪种类型：</span>
              <el-radio class="rads" :label="1">不限</el-radio>
              <el-radio class="rads" :label="2">咨询类</el-radio>
              <el-radio class="rads" :label="3">产品类</el-radio>
              <el-radio class="rads" :label="4">数据类</el-radio>
              <el-radio class="rads" :label="5">外包类</el-radio>
              <el-radio class="rads" :label="6">会议培训类</el-radio>
              <el-radio class="rads" :label="7">平台类</el-radio>
              <el-radio class="rads" :label="8">技术服务类</el-radio>
              <el-radio class="rads" :label="9">其他类</el-radio>
            </el-radio-group>
            <el-radio-group v-model="radio2" class="groupBottom">
              <span>我的项目有多少预算：</span>
              <el-radio class="rads" :label="1">不限</el-radio>
              <el-radio class="rads" :label="2">50万以下</el-radio>
              <el-radio class="rads" :label="3">50万（含）-100万（不含）以下</el-radio>
              <el-radio class="rads" :label="4">100万（含）-500万（不含）以下</el-radio>
              <el-radio class="rads" :label="5">500万（含）-1000万（不含）以下</el-radio>
              <el-radio class="rads" :label="6">1000万以上</el-radio>
            </el-radio-group>
            <!-- 标签组件 -->
            <el-col :span="24">
              <span>我的项目有什么标签：</span>
              <el-tag
                      :key="tag"
                      v-for="tag in dynamicTags"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)"
              >{{tag}}</el-tag>
              <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-col>
          </el-col>
        </el-row>
        <el-row class="Firsttable" :gutter="20" style="margin:10px 0 0;">
          <el-col class="padclear" :span="12" style="padding:0;">
            <div class="firstbox">
              <p class="borbom sixsix">推荐学习的部门</p>
              <div style="width:100%;height:240px;overflow:auto;">
                <div class="Studys">
                  <el-row>
                    <el-col class="mbs">
                      <p class="sixsix">上海国脉互联知政信息咨询有限公司</p>
                      <el-col class="smallfont" :span='24'>
                        <el-col :span='4' class="mb">班长：张三</el-col>
                        <el-col :span='20'>
                          部门标签：
                          <el-button class="btns">数据基因</el-button>
                          <el-button class="btns">营商环境</el-button>
                          <el-button class="btns">规划咨询</el-button>
                          <el-button class="btns">DIPS</el-button>
                          <el-button class="btns">产品设计</el-button>
                          <el-button class="btns">规划与咨询</el-button>
                        </el-col>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
                <div class="Studys">
                  <el-row>
                    <el-col class="mbs">
                      <p class="sixsix">上海国脉互联知政信息咨询有限公司</p>
                      <el-col class="smallfont" :span='24'>
                        <el-col :span='4' class="mb">班长：张三</el-col>
                        <el-col :span='20'>
                          部门标签：
                          <el-button class="btns">数据基因</el-button>
                          <el-button class="btns">营商环境</el-button>
                          <el-button class="btns">规划咨询</el-button>
                          <el-button class="btns">DIPS</el-button>
                          <el-button class="btns">产品设计</el-button>
                          <el-button class="btns">规划与咨询</el-button>
                        </el-col>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
                <div class="Studys">
                  <el-row>
                    <el-col class="mbs">
                      <p class="sixsix">上海国脉互联知政信息咨询有限公司</p>
                      <el-col class="smallfont" :span='24'>
                        <el-col :span='4' class="mb">班长：张三</el-col>
                        <el-col :span='20'>
                          部门标签：
                          <el-button class="btns">数据基因</el-button>
                          <el-button class="btns">营商环境</el-button>
                          <el-button class="btns">规划咨询</el-button>
                          <el-button class="btns">DIPS</el-button>
                          <el-button class="btns">产品设计</el-button>
                          <el-button class="btns">规划与咨询</el-button>
                        </el-col>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-col>
          <el-col class="padclear" :span="12" style="padding-right:0;">
            <div class="firstbox" style="padding-bottom:3px;">
              <p class="borboms sixsix">推荐请教的国脉人</p>
              <div class="Recommend" style="width:100%;height:240px;overflow:auto;">
                <el-row :gutter="20">
                  <el-col :span="12" class="clemr" v-for="(item,index) in boss" :key="index">
                    <!-- https://ioa.govmade.com/uploads/2/image/public/201812/20181228133004_x5eaosqf7y.png -->
                    <img class="imgs" :src="item.url" alt="未加载">
                    <div class="offdiv">
                      <p class="bigfon sixsix">{{item.name}}</p>
                      <p class="coles">{{item.company}}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 推荐参考项目 -->
        <el-row class="Secondtab">
          <el-col class="SecondtBox" :span="24">
            <p class="borbomes">推荐参考的项目</p>
            <div class="Reference">
              <el-row>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetit" :span="12">
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfonts" :span='24'>
                    <el-col :span='5' class="mbs">项目阶段：项目立项</el-col>
                    <el-col :span='19'>
                      项目标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="Secondtab">
          <el-col class="SecondtBox" :span='24'>
            <p class="borbomes">
              推荐参考的材料
              <span class="padL sixsix">
                <span class="postit" :class="{'grays':index==isgrays}" @click='handlebtnclick(index)' v-for="(item,index) in bt" :key='index'>{{item.name}}</span>
              </span>
            </p>
            <el-row class="posbox" style="padding-top:0;">
              <!-- <el-col :span='3'>
                <el-button class="postit" :class="{'grays':index==isgrays}" @click='handlebtnclick(index)' v-for="(item,index) in bt" :key='index'>{{item.name}}</el-button>
              </el-col> -->
              <el-col class="posmenu" :span='23'>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
                <el-col class="Referencetits" :span='12'>
                  <p class="sixsix">2018年度无锡市年度网站群考核评测及调研项目</p>
                  <el-col class="smallfontss" :span='24'>
                    <el-col :span='5' class="mbss">上传者：张三</el-col>
                    <el-col :span='19'>
                      材料标签：
                      <el-button class="btns">数据基因</el-button>
                      <el-button class="btns">互联网+政务服务</el-button>
                      <el-button class="btns">数据服务</el-button>
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      radio1: 1,
      radio2: 1,
      // 标签组件
      dynamicTags: ['互联网+政务服务'],
      inputVisible: false,
      inputValue: '',
      bt:[
        {name:'方案'},
        {name:'报告 · 清单'},
        {name:'制度 · 规范 · 领导讲话'},
        {name:'说明书 · 白皮书 · 模板'},
        {name:'招投标 · 专利 · 软著'},
        {name:'培训材料'},
      ],
      isgrays:0,
      boss:[
        {
          id:1,
          url:'https://ioa.govmade.com/uploads/2/image/public/201806/20180613132622_36g2wcsum1.jpg',
          name:'杨冰之',
          company:'北京国脉互联信息顾问有限公司',
        },
        {
          id:2,
          url:'https://ioa.govmade.com/uploads/2/image/public/201806/20180613132726_f73x92rxqx.jpg',
          name:'郑爱军',
          company:'北京仓颉数源网络有限公司',
        },
        {
          id:3,
          url:'https://ioa.govmade.com/uploads/2/image/public/201807/20180711133414_5p2xxp0oft.png',
          name:'李凯',
          company:'北京区业务一部',
        },
        {
          id:4,
          url:'https://ioa.govmade.com/uploads/2/image/public/201806/20180613133008_elbcrpj4uh.jpg',
          name:'黄磊',
          company:'北京仓颉数源网络有限公司',
        },
        {
          id:5,
          url:'https://ioa.govmade.com/uploads/2/image/public/201807/20180713091722_f1hj7qt0to.png',
          name:'谢海燕',
          company:'北京国脉互联信息顾问有限公司',
        },
        {
          id:6,
          url:'https://ioa.govmade.com/uploads/2/image/public/201804/20180412223734_afni46vbiw.jpg',
          name:'王路燕',
          company:'北京国脉互联信息顾问有限公司',
        },
        {
          id:6,
          url:'https://ioa.govmade.com/uploads/2/image/public/201812/20181217181100_rj5ie4iop1.jpg',
          name:'刘佳',
          company:'北京国脉互联信息顾问有限公司',
        },
      ],
    }
  },
  created () {},
  methods: {
    // 标签组件
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 按钮点击
    handlebtnclick (index){
      this.isgrays = index
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background-color: #fff;
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
  .el-row{
    margin-top: 10px;
  }
  .clearmagin {
    margin: auto 0;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
    p {
      font-size: 18px;
      color: #404040;
    }
  }
  .padLeft {
    padding-left: 25px;
    color: #717276;
  }
  .groupBottom {
    margin-bottom: 30px;
  }
  .groupBottom span {
    font-size: 14px;
    
  }
}
// 标签组件
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.Firsttable{
  padding: 0 15px 10px 15px;
  box-sizing: border-box;
  .firstbox{
    border: 1px solid #f6f6f6;
    padding: 0 0 5px 0;
    overflow: hidden;
    height: 300px;
    .borbom{
      padding: 13px;
      margin: 0 auto;
      border-bottom: 1px solid #f6f6f6;
      font-size: 16px;
      position: relative;
      width: 92%;
      padding-left: 0;
      color: #444444;
    }
    
    .borboms{
      padding: 13px;
      margin: 0 auto;
      border-bottom: 1px solid #f6f6f6;
      font-size: 16px;
      position: relative;
      width: 92%;
      padding-left: 0;
      color: #444444;
    }
    .Recommend{
      width: 100%;
      padding: 14px 20px 0 20px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      // background-color: yellow;
      .clemr{
        margin-bottom: 18px;
      }
      p{
        margin: 0;
      }
      .imgs{
        width: 53px;
        height: 53px;
        display: inline-block;
        border-radius: 30px;
      }
      .offdiv{
        display: inline-block;
        vertical-align: top;
        font-size: 11px;
        padding-left: 10px;
        line-height: 25px;
        padding-top: 2px;
        .bigfon{
          font-size: 18px;
        }
      }
    }
    .Studys{
      width: 100%;
      // background-color: yellow;
      padding: 10px 10px 0 25px;
      box-sizing: border-box;
      .mbs{
        margin-bottom: 0;
      }
      p{
        margin: 0;
      }
      .smallfont{
        font-size: 12px;
        padding-top: 5px;
        margin-bottom: 0;
        color: #B8B8B8;
        .mb{
          margin: 0;
          line-height: 23px;
        }
      }
    }
  }
}
.Secondtab{
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
  .SecondtBox{
    border: 1px solid #f6f6f6;
    position: relative;
    padding-bottom: 10px; 
    .borbomes{
      padding: 15px;
      margin: 0 auto;
      border-bottom: 1px solid #f6f6f6;
      font-size: 16px;
      position: relative;
      width: 96%;
      padding-left: 0;
    }
    .Reference{
      width: 100%;
      .Referencetit{
        padding: 10px 0 0 25px;
        box-sizing: border-box;
        p{
          margin: 0;
        }
        .smallfonts{
          font-size: 12px;
          padding-top: 5px;
          margin-bottom: 0;
          color: #B8B8B8;
        }
        .mbs{
          margin: 0;
          line-height: 23px;
        }
      }
    }
  }
}
.btns{
  padding: 5px;
  margin: 0 0 0 5px;
  font-size: 12px;
  color: #B8B8B8;
}
.posbox{
  padding: 10px 10px 5px 10px;
}
.postit{
  cursor: pointer;
}
.postit::after{
  content: ' / '
}
.posmenu{
  // border: 1px solid #ccc;
  height: 325px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  // padding-right: 15px;
}
.mbss{
  margin: 0;
  line-height: 23px;
}
.smallfontss{
  font-size: 12px;
  padding-top: 5px;
  margin-bottom: 0;
  color: #B8B8B8;
}
.Referencetits{
  padding: 10px 0 0 20px;
  box-sizing: border-box;
}
.Referencetits p{
  margin: 0;
}
.grays{
  // background-color: #E4E4E4;
  color:#BA1B21;
}
.sixsix{
  color: #717276;
}
.padL{
  padding-left: 30px;
}
.coles{
  color: #B8B8B8;
}
.rads{
  color: #717276;
}
</style>


