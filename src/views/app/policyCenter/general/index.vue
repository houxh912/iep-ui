<template>
  <div class="wrapper">
    <div class="top">
      <div class="policy-top">
        <div class="top-header"> 国策数据库 <div class="top-desc">一站式政策服务</div>
        </div>
      </div>

      <div class="button-box" :model="searchForm">
        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">政策层级 : </div>
            </el-col>
            <el-col :span="22">
              <el-radio-group size="small" v-model="searchForm.level">
                <el-radio-button v-for="item in level" :key="item.value" :label="item.label" :value="item.value" @change.native="handleSelectLevel(item)">
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">适用对象 : </div>
            </el-col>
            <el-col :span="22">
              <el-radio-group size="small" v-model="searchForm.target">
                <el-radio-button v-for="item in target" :key="item.value" :label="item.label" :value="item.value" @change.native="handleSelectTarget (item)">
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">政策主题 : </div>
            </el-col>
            <el-col :span="22">
              <el-radio-group size="small" v-model="searchForm.theme">
                <el-radio-button v-for="item in theme" :key="item.value" :label="item.label" :value="item.value" @change.native="handleSelectTheme (item)">
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>

        <div class="card">
          <el-row>
            <el-col :span="2">
              <div class="titletop">适用规模 : </div>
            </el-col>
            <el-col :span="22">
              <el-radio-group size="small" v-model="searchForm.scale">
                <el-radio-button v-for="item in scale" :key="item.value" :label="item.label" :value="item.value" @change.native="handleSelectScale (item)">
                </el-radio-button>
              </el-radio-group>
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
                  <el-radio-group size="small" v-model="searchForm.industry">
                    <el-radio-button v-for="item in industry" :key="item.value" :label="item.label" :value="item.value" @change.native="handleSelectIndustry (item)">
                    </el-radio-button>
                  </el-radio-group>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="2">
                  <div class="titletop">适用地区 : </div>
                </el-col>
                <el-col :span="22">
                  <div class="answerSheetTop">
                    <el-cascader :options="options" :props="props" v-model="searchForm.regionList" ref="region" clearable change-on-select @visible-change="handleVisibleChange($event)"></el-cascader>
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
                <div class="page-desc">共有{{paginationOption.total}}条政策</div>
                <span>
                  <el-radio-group v-model="pageOption.sort" size="mini" @change="handleChangeSort">
                    <el-radio-button label="time">发文时间</el-radio-button>
                    <el-radio-button label="views">热门</el-radio-button>
                  </el-radio-group>
                </span>
              </div>
            </div>

            <div class="tip" v-if="paginationOption.total == 0">暂无数据</div>

            <div class="text-container" v-for="(item, index) in resdata" :key="index">
              <h3 @click="handleOpenLink(item)">
                <span class="istop" v-if="item.isTop === 1">
                  <el-tag>置顶</el-tag>
                </span>
                {{item.title}}
              </h3>
              <div class="text-des">
                {{item.summary}}
              </div>
              <div class="detail">
                <div><i class="el-icon-setting" v-for="(item, index) in item.dispatchList" :key="index">{{item.dispatchName}}</i></div>
                <div style="margin-left:20px"><i class="el-icon-time"></i>{{item.publishTime | dateFormat}}</div>
              </div>
              <div class="tag">
                标签:
                <el-tag type="info" v-for="(item, index) in item.tagList" :key="index">{{item.commonName}}</el-tag>
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
          <el-row class="right shang">
            <div class="title">热门标签<span>换一换</span></div>
            <hr style="margin:-5px 20px">
            <div class="hotTag">
              <el-tag type="info" v-for="(item, index) in hotTagList" :key="index">{{item.name}}</el-tag>
            </div>
          </el-row>

          <el-row class="right xia">
            <div class="title">热门政策<span>换一换</span></div>
            <hr style="margin:-5px 20px">
            <div class="hotPolicy">
              <el-row v-for="(item,index) in textList" :key="index">
                <el-col :span="1"><i class="el-icon-caret-right"></i></el-col>
                <el-col :span="23">
                  <div class="content">{{item.title}}</div>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { region } from '../region'
import { dateFormat } from '@/util/date'
import { findByTypeList } from '@/api/govdata/common'
import { getGeneralCenterPage } from '@/api/govdata/general_policy'
export default {
  mixins: [mixins],
  data () {
    return {
      show: false,
      level: [],      //层级
      target: [],     //对象
      theme: [],      //主题
      scale: [],      //规模
      industry: [],   //行业
      options: region,
      props: {
        value: 'code',
        label: 'name',
      },
      searchForm: {
        level: '全部',
        target: '全部',
        theme: '全部',
        scale: '全部',
        industry: '全部',
      },
      pageOption: {
        page: 1,
        limit: 10,
        level: '',
        target: '',
        theme: '',
        scale: '',
        industry: '',
        region: [],
        sort: 'time',
      },
      paginationOption: {
        current: 1,
        size: 0,
        total: 0,
      },
      //   changeOption: {
      //     limit: 10,
      //     page: 1,
      //     views: 1,
      //   },
      resdata: [],
      hotTagList: [
        { tagId: 1, name: '云南省' },
        { tagId: 2, name: '实施方案' },
        { tagId: 3, name: '国脉' },
        { tagId: 4, name: '资产证券化' },
        { tagId: 5, name: 'PPP项目' },
        { tagId: 6, name: '责任清单' },
        { tagId: 7, name: '知识产权' },
        { tagId: 8, name: '农业领域' },
        { tagId: 9, name: '综合信息平台' },
        { tagId: 10, name: '专家库管理' },
      ],
      textList: [
        { textId: 1, title: '深圳市商务局关于印发《深圳市中央外经贸发展专项资金服务贸易创新发展资金实施细则》的通知' },
        { textId: 2, title: '河南省人民政府办公厅关于加快推进5G网络建设发展的通知' },
        { textId: 3, title: '深圳市商务局关于印发《深圳市中央外经贸发展专项资金服务贸易创新发展资金实施细则》的通知' },
        { textId: 4, title: '河南省人民政府办公厅关于加快推进5G网络建设发展的通知' },
        { textId: 5, title: '深圳市商务局关于印发《深圳市中央外经贸发展专项资金服务贸易创新发展资金实施细则》的通知' },
        { textId: 6, title: '河南省人民政府办公厅关于加快推进5G网络建设发展的通知' },
        { textId: 7, title: '深圳市商务局关于印发《深圳市中央外经贸发展专项资金服务贸易创新发展资金实施细则》的通知' },
        { textId: 8, title: '河南省人民政府办公厅关于加快推进5G网络建设发展的通知' },
        { textId: 9, title: '深圳市商务局关于印发《深圳市中央外经贸发展专项资金服务贸易创新发展资金实施细则》的通知' },
        { textId: 10, title: '河南省人民政府办公厅关于加快推进5G网络建设发展的通知' },
      ],
    }
  },
  computed: {

  },
  filters: {
    dateFormat (time) {
      var date = new Date(time)
      return dateFormat(date, 'yyyy年MM月dd日')
    },
  },
  created () {
    this.load()
    this.loadDict()
  },
  methods: {
    /**
     * 获取获取层级、适用对象、主题、规模、行业数据
     */
    loadDict () {
      findByTypeList().then(res => {
        const { data } = res
        this.level = data.POLICY_LEVEL
        this.target = data.DECLARE_TARGET
        this.theme = data.POLICY_THEME
        this.scale = data.POLICY_SCALE
        this.industry = data.POLICY_INDUSTRY

        this.level.unshift({ label: '全部', value: null })
        this.target.unshift({ label: '全部', value: null })
        this.theme.unshift({ label: '全部', value: null })
        this.scale.unshift({ label: '全部', value: null })
        this.industry.unshift({ label: '全部', value: null })
      })

    },

    /**
     * 获取获取列表数据
     */
    async load () {
      this.isLoadTable = true
      const res = await getGeneralCenterPage({
        ...this.pageOption,
        ...this.paginationOption,
      })
      const { data } = res
      this.paginationOption.current = data.current
      this.paginationOption.size = data.size
      this.paginationOption.total = data.total
      this.resdata = data.records
    },

    /**
     * 获取热门标签列表数据
     */
    // tagList (option = this.changeOption) {
    //   getTagPage({ ...option }).then(res => {
    //     this.mockTagList = res.data.records
    //     this.pages = res.data.pages
    //   })
    // },

    /**
     * 点击层级字典按钮
     */
    handleSelectLevel (item) {
      this.pageOption.level = item.value
      this.load()
    },

    /**
     * 点击对象字典按钮
     */
    handleSelectTarget (item) {
      this.pageOption.target = item.value
      this.load()
    },

    /**
     * 点击主题字典按钮
     */
    handleSelectTheme (item) {
      this.pageOption.theme = item.value
      this.load()
    },

    /**
     * 点击规模字典按钮
     */
    handleSelectScale (item) {
      this.pageOption.scale = item.value
      this.load()
    },

    /**
     * 点击行业字典按钮
     */
    handleSelectIndustry (item) {
      this.pageOption.industry = item.value
      this.load()
    },

    /**
     * 点击地区字典按钮
     */
    handleVisibleChange (callback) {
      const { regionList } = this.searchForm
      // 当关闭级联选择框时触发
      if (!callback) {
        this.pageOption.region = regionList ? regionList.join(',') : []
        this.load()
      }
    },

    /**
     * 打开原文链接
     */
    handleOpenLink (item) {
       this.$router.push({
          path: `policyCenter/general/general_detail/${item.id}`,
        })
        console.log('item',item.id)
    },

    /**
     * 控制页面数据(10条/页)
     */
    handleSizeChange (val) {
      this.paginationOption.size = val
      this.pageOption.page = this.paginationOption.current
      this.pageOption.limit = this.paginationOption.size
      this.load()
    },

    /**
     * 控制去到第几页
     */
    handleCurrentChange (val) {
      this.paginationOption.current = val
      this.pageOption.page = this.paginationOption.current
      this.pageOption.limit = this.paginationOption.size
      this.load()
    },

    /**
     * 排序触发时的回调
     */
    handleChangeSort (val) {
      this.pageOption.sort = val
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
      padding: 8px 18px 0;
      .titletop {
        text-align: right;
        font-size: 15px;
        font-weight: 700;
        color: #07111b;
        margin: 6px 10px 0 0;
      }
      .el-radio-button--small .el-radio-button__inner {
        padding: 10px 15px;
        font-size: 14px;
      }
      // .choices {
      //   font-size: 14px;
      //   color: #2c3e50;
      //   background-color: #f1f6fe;
      //   // background-color: #fff;
      //   border: 0px solid #eee;
      //   margin: 10px 5px;
      // }
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
    .tip {
      text-align: center;
      padding: 10px 0;
      font-size: 40px;
      color: #eee;
    }
    .text-container {
      margin: 20px 20px;
      border-top: 1px solid #eee;
      h3 {
        line-height: 30px;
        font-size: 18px;
        color: #222;
        margin-top: 15px;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .text-des {
        font-size: 14px;
        color: #999;
        padding-right: 6px;
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
        .el-icon-setting:before {
          margin-right: 5px;
        }
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
    margin-left: 20px;
  }
  .shang {
    .title {
      margin: 20px;
      font-size: 16px;
      font-weight: 700;
      color: #2c3e50;
      span {
        font-size: 14px;
        font-weight: 300;
        color: #4ea4eb;
        cursor: pointer;
        padding-left: 179px;
      }
    }
    .hotTag {
      margin: 20px;
      .el-tag:hover {
        color: #4ea4eb;
        border-color: #4ea4eb;
      }
    }
  }
  .xia {
    margin-top: 20px;
    .title {
      margin: 20px;
      font-size: 16px;
      font-weight: 700;
      color: #2c3e50;
      span {
        font-size: 14px;
        font-weight: 300;
        color: #4ea4eb;
        cursor: pointer;
        padding-left: 179px;
      }
    }
    .hotPolicy {
      margin: 20px;
      .content {
        margin-bottom: 10px;
        padding-left: 9px;
        &:hover {
          color: #4ea4eb;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
<style  scoped>
.answerSheetTop >>> .el-cascader {
  margin-top: 7px;
  width: 35%;
}
.istop >>> .el-tag {
  height: 27px;
  line-height: 26px;
}
.tag >>> .el-tag {
  margin-left: 10px;
  height: 24px !important;
  line-height: 22px !important;
}
.card >>> .el-radio-button--small .el-radio-button__inner {
  font-size: 14px;
  border-radius: 6px;
}
.card >>> .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 6px;
}
.card >>> .el-radio-button__inner {
  border: 0px solid #dcdfe6;
  margin: 3px;
}
.card >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #ba1b21;
  font-weight: 700;
  background-color: #f1f6fe;
  -webkit-box-shadow: -1px 0 0 0 #f1f6fe;
}
.hotTag >>> .el-tag {
  font-size: 13px;
  background-color: #fff;
  color: #777;
  height: 30px;
  line-height: 30px;
  border-radius: 22px;
  margin: 5px 10px 5px 0px;
  padding: 0px 14px;
  cursor: pointer;
}
.hotPolicy >>> .el-icon-caret-right {
  margin-left: -4px;
  color: #4ea4eb;
}
</style>