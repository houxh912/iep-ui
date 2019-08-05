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
                <el-tag class="choices" type="info" v-for="(item, index) in POLICY_LEVEL" :key="index" style="margin-right: 10px">{{item.label}}</el-tag>
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
                <el-tag class="choices" type="info" v-for="(item, idx) in DECLARE_TARGET" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
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
                <el-tag class="choices" type="info" v-for="(item, idx) in POLICY_THEME" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">适用行业 : </div>
            </el-col>
            <el-col :span="22">
              <div class="answerSheetTop">
                <el-tag class="choices" type="info" v-for="(item, idx) in POLICY_INDUSTRY" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </div>

        <el-collapse-transition>

          <template>
            <div class="card">
              <el-row>
                <el-col :span="2">
                  <div class="titletop">适用规模 : </div>
                </el-col>
                <el-col :span="22">
                  <div class="answerSheetTop">
                    <el-tag class="choices" type="info" v-for="(item, idx) in POLICY_SCALE" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>

          <template>
            <div class="card">
              <el-row>
                <el-col :span="2">
                  <div class="titletop">适用地区 : </div>
                </el-col>
                <el-col :span="22">
                  <div class="answerSheetTop">
                    <el-tag class="choices" type="info" v-for="(item, idx) in POLICY_SCALE" :key="idx" style="margin-right: 10px">{{item.label}}</el-tag>
                  </div>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-collapse-transition>
      </div>

      <div>
        <hr>
        <el-button icon="el-icon-arrow-up" type="danger" plain>折叠</el-button>
      </div>
    </div>

    <div class="bottom">

    </div>
  </div>
</template>

<script>
import { findByTypeList } from '@/api/govdata/common'
export default {
  data () {
    return {
      POLICY_LEVEL: [],      //层级
      DECLARE_TARGET: [],    //对象
      POLICY_THEME: [],      //主题
      POLICY_SCALE: [],      //规模
      POLICY_INDUSTRY: [],   //行业
    }
  },
  computed: {

  },
  created () {
    this.loadDict()
  },
  methods: {

    /**
     * 获取获取层级、适用对象、主题、规模、行业数据
     */
    loadDict () {
      findByTypeList().then(res => {
        const { data } = res
        this.POLICY_LEVEL = data.POLICY_LEVEL
        this.DECLARE_TARGET = data.DECLARE_TARGET
        this.POLICY_THEME = data.POLICY_THEME
        this.POLICY_SCALE = data.POLICY_SCALE
        this.POLICY_INDUSTRY = data.POLICY_INDUSTRY
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
  height: 1000px;
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
  }
  .card {
    text-align: left;
    padding: 0 18px 0;
    .titletop {
      text-align: right;
      font-size: 14px;
      font-weight: 700;
      color: #07111b;
      margin: 20px 20px 0 0;
    }
    .answerSheetTop {
      padding-top: 6px;
    }
    .choices + .choices {
      margin: 2px;
    }
    .choices {
      font-size: 14px;
      color: #2c3e50;
      background-color: #f1f6fe;
      border: 0px solid #eee;
      // margin-right: 2px;
      margin: 10px 3px;
    }
  }
}
.bottom {
  width: 1400px;
  height: 500px;
  border-radius: 3px;
  background-color: #fff;
  margin: 0 auto 50px auto;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1;
  box-sizing: border-box;
}
</style>

