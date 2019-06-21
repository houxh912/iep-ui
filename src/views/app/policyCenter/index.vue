<template>
  <div class="wrapper">
    <div class="top">
      <div class="policy-top">
        <div class="top-header"> 国策数据库 <div class="top-desc">一站式政策服务</div>
        </div>
      </div>

      <div class="button-box">
        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">政策层级 : </div>
            </el-col>
            <el-col :span="22">
              <div class="answerSheetTop">
                <el-tag class="choices" type="info" v-for="(item, index) in levels" :key="index" @click="handleSelect(item,{ label: '全部', value: 'all' })" style="margin-right: 10px">{{item.label}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">适用对象 : </div>
            </el-col>
            <el-col :span="22">
              <div class="answerSheetTop">
                <el-tag class="choices" type="info" v-for="(item, idx) in target" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">政策主题 : </div>
            </el-col>
            <el-col :span="22">
              <div class="answerSheetTop">
                <el-tag class="choices" type="info" v-for="(item, idx) in theme" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">适用规模 : </div>
            </el-col>
            <el-col :span="22">
              <div class="answerSheetTop">
                <el-tag class="choices" type="info" v-for="(item, idx) in scale" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
              </div>
            </el-col>
          </el-row>

        </div>

        <el-collapse-transition>
          <template>
            <div class="card" v-show="show">
              <el-row>
                <el-col :span="2">
                  <div class="titletop">适用行业 : </div>
                </el-col>
                <el-col :span="22">
                  <div class="answerSheetTop">
                    <el-tag class="choices" type="info" v-for="(item, idx) in industry" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
                  </div>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="2">
                  <div class="titletop">适用地区 : </div>
                </el-col>
                <el-col :span="22">
                  <div class="answerSheetTop">
                    <el-cascader :options="options" :props="props" v-model="area" ref="region" clearable change-on-select></el-cascader>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-collapse-transition>
      </div>

      <div class="btn">
        <el-button class="collapse-btn" @click="show = !show">
          <i :class="`${show ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}`"></i> {{ show ? '折叠' : '展开' }} </el-button>
      </div>
    </div>

    <div class="bottom">
      <el-row style="width:100%">
        <el-col :span="18">
          <div class="left">
            <div class="page-top">
              <div class="page-header"> 通用政策
                <div class="page-desc">共有311505条政策</div>
                <span>
                  <el-radio-group v-model="pageOption.sort" size="mini">
                    <el-radio-button label="time">发文时间</el-radio-button>
                    <el-radio-button label="views">热门</el-radio-button>
                  </el-radio-group>
                </span>
              </div>
            </div>

            <div class="text-container" v-for="(item, index) in text" :key="index">
              <hr>
              <h3>{{item.title}}</h3>
              <div class="text-des">
                {{item.des}}
              </div>
              <div class="detail">
                <div><i class="el-icon-setting"></i>{{item.danwei}}</div>
                <div style="margin-left:20px"><i class="el-icon-time"></i>{{item.time}}</div>
              </div>
              <div class="tag">
                标签:
                <el-tag type="info" v-for="(item, index) in level" :key="index">{{item.label}}</el-tag>
              </div>
              <div class="comparison">
                <el-button plain type="danger" size="mini" icon="el-icon-sort">比对</el-button>
              </div>
            </div>

            <div class="page-wrapper">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationOption.current" :page-sizes="[10, 20, 30, 40]" :page-size="paginationOption.size" layout="total, sizes, prev, pager, next, jumper" :total="paginationOption.total">
              </el-pagination>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="right">
            rightrightrightrightright
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { region } from './region'
import { findByTypeList } from '@/api/govdata/common'
import { getGeneralCentrePage } from '@/api/govdata/general_policy'
export default {
  mixins: [mixins],
  data () {
    return {
      show: true,
      level: [],      //层级
      levels: [],
      target: [],     //对象
      theme: [],      //主题
      scale: [],      //规模
      industry: [],   //行业
      area: '',              //地区绑定的值
      options: region,
      props: {
        value: 'code',
        label: 'name',
      },
      pageOption: {
        current: 1,
        size: 10,
        sort: '',
      },
      paginationOption: {
        current: 1,
        size: 10,
      },
      text: [
        {
          danwei: '广东省市场监督管理局',
          time: '2018年8月5日',
          title: '关于印发《“互联网+”知识产权保护工作方案》的通知',
          des: ' 为深入贯彻习近平新时代中国特色社会主义思想和党的十九大精神，认真落实党中央、国务院关于加强知识产权保护的决策部署，推进完善执法力量，加大执法力度，把违法成本显著提上去，把法律威慑作用充分发挥出来，创新知识产权监管方式，充分运用“互联网 ”相关技术手段为深入贯彻习近平新时代中国特色社会主义思想和党的十九大精神，认真落实党中央、国务院关于加强知识产权保护的决策部署，推进完善执法力量，加大执法力度，把违法成本显著提上去，把法律威慑作用充分发挥出来，创新知识产权监管方式，充分运用“互联网 ”相关技术手段',
        },
        {
          danwei: '广东省市场监督管理局',
          time: '2018年8月5日',
          title: '关于印发《“互联网+”知识产权保护工作方案》的通知',
          des: ' 为深入贯彻习近平新时代中国特色社会主义思想和党的十九大精神，认真落实党中央、国务院关于加强知识产权保护的决策部署，推进完善执法力量，加大执法力度，把违法成本显著提上去，把法律威慑作用充分发挥出来，创新知识产权监管方式，充分运用“互联网 ”相关技术手段为深入贯彻习近平新时代中国特色社会主义思想和党的十九大精神，认真落实党中央、国务院关于加强知识产权保护的决策部署，推进完善执法力量，加大执法力度，把违法成本显著提上去，把法律威慑作用充分发挥出来，创新知识产权监管方式，充分运用“互联网 ”相关技术手段',
        },
        {
          danwei: '广东省市场监督管理局',
          time: '2018年8月5日',
          title: '关于印发《“互联网+”知识产权保护工作方案》的通知',
          des: ' 为深入贯彻习近平新时代中国特色社会主义思想和党的十九大精神，认真落实党中央、国务院关于加强知识产权保护的决策部署，推进完善执法力量，加大执法力度，把违法成本显著提上去，把法律威慑作用充分发挥出来，创新知识产权监管方式，充分运用“互联网 ”相关技术手段为深入贯彻习近平新时代中国特色社会主义思想和党的十九大精神，认真落实党中央、国务院关于加强知识产权保护的决策部署，推进完善执法力量，加大执法力度，把违法成本显著提上去，把法律威慑作用充分发挥出来，创新知识产权监管方式，充分运用“互联网 ”相关技术手段',
        },
      ],
    }
  },
  computed: {
    // levels () {
    //   return this.level.splice(0, { label: '全部', value: '1' })
    // },
  },
  created () {
    this.load()
    this.loadDict()
  },
  methods: {
    handleSelect (item) {
      console.log('kkk', item)
    },

    /**
     * 获取获取层级、适用对象、主题、规模、行业数据
     */
    loadDict () {
      findByTypeList().then(res => {
        const { data } = res
        this.level = data.POLICY_LEVEL
        this.levels = this.level.splice(0, { label: '全部', value: 'all' })
        this.target = data.DECLARE_TARGET
        this.theme = data.POLICY_THEME
        this.scale = data.POLICY_SCALE
        this.industry = data.POLICY_INDUSTRY
        // const dictGroup = initDictGroup()
        // for (const key in data) {
        //   if (data.hasOwnProperty(key)) {
        //     const element = data[key]
        //     dictGroup[key] = element.map(m => {
        //       return { label: m.label, value: m.value }
        //     })
        //   }
        // }
        // this.$set(this, 'dictGroup', dictGroup)
      })

    },

    /**
     * 获取获取列表数据
     */
    async load (pageOption = this.pageOption) {
      this.isLoadTable = true
      const res = await getGeneralCentrePage({
        ...pageOption,
        ...this.paginationOption,
      })
      const { data } = res
      // this.loadTable(data)
      this.paginationOption.current = data.current
      this.paginationOption.size = data.size
      this.paginationOption.total = data.total
    },

    /**
     * 控制页面数据
     */
    handleSizeChange (val) {
      //pageOption是传给后台的参数，paginationOption是控制页面的参数
      console.log('ddd', val)
      this.paginationOption.size = val
      this.pageOption.current = this.paginationOption.current
      this.pageOption.size = this.paginationOption.size
      this.load()
    },

    /**
     * 当前页的页数发生改变(当前处于第几页)
     */
    handleCurrentChange (val) {
      console.log('777', val)
      // this.paramOption.pages = val //查看主题分页时
      this.paginationOption.current = val
      this.pageOption.current = this.paginationOption.current
      this.pageOption.size = this.paginationOption.size
      this.load()
    },

    /**
     * 排序触发时的回调
     */
    handleChangeSort () {
      this.load()
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #eee;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.top {
  width: 1400px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: #fff;
  padding: 5px 25px;
  margin: 20px auto;
  .policy-top {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    .top-header {
      display: flex;
      align-items: baseline;
      font-size: 30px;
      color: #333;
      font-weight: 600;
      .top-desc {
        font-size: 15px;
        margin-left: 15px;
        color: #555;
        font-weight: 400;
      }
    }
  }
  .button-box {
    margin-top: 10px;
    .card {
      text-align: left;
      padding: 0 18px 0;
      .titletop {
        text-align: right;
        font-size: 15px;
        font-weight: 700;
        color: #07111b;
        margin: 13px 10px 0 0;
      }
      .answerSheetTop {
        // padding-top: 6px;
      }
      // .choices + .choices {
      //   margin: 2px;
      // }
      .choices {
        font-size: 14px;
        color: #2c3e50;
        // background-color: #f1f6fe;
        background-color: #fff;
        border: 0px solid #eee;
        margin: 10px 3px;
      }
    }
  }
  .btn {
    text-align: center;
    border-top: 1px solid #eee;
    margin-top: 20px;
    margin-bottom: 5px;
    .collapse-btn {
      margin: 0;
      border-top: none;
      margin-top: -1px;
      border-radius: 0 0 5px 5px;
    }
  }
}
.bottom {
  width: 1400px;
  margin: 0 auto 50px auto;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1;
  box-sizing: border-box;
  .left {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 3px;
    .page-top {
      display: flex;
      justify-content: space-between;
      margin: 20px 20px -20px 20px;
      padding-bottom: 13px;
      // border-bottom: 1px solid #eee;
      .page-header {
        display: flex;
        align-items: baseline;
        font-size: 22px;
        color: #222;
        .page-desc {
          font-size: 13px;
          margin-left: 16px;
          color: #999;
          font-weight: 400;
        }
        span {
          margin-left: 650px;
        }
      }
    }
    .text-container {
      margin: 0px 20px;
      h3 {
        line-height: 30px;
        font-size: 18px;
        color: #222;
      }
      .text-des {
        font-size: 14px;
        color: #999;
        margin: 5px 0;
        line-height: 26px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .detail {
        display: flex;
        font-size: 14px;
        color: #999;
        margin: 20px 0;
        .el-icon-setting,
        .el-icon-time {
          margin-right: 5px;
        }
      }
      .tag {
        font-size: 13px;
        color: #666;
      }
      .comparison {
        text-align: right;
        margin: 0px 10px 20px 10px;
      }
    }
    .page-wrapper {
      display: flex;
      justify-content: center;
      margin: 30px auto;
    }
  }
  .right {
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 3px;
    height: 500px;
    margin-left: 20px;
  }
}
</style>
<style  scoped>
.answerSheetTop >>> .el-cascader {
  margin-top: 7px;
  width: 35%;
}
.tag >>> .el-tag {
  margin-left: 10px;
  height: 24px !important;
  line-height: 22px !important;
}
</style>


