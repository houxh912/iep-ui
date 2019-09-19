<template>
  <div class="wrapper">
    <div class="top">
      <div class="policy-top">
        <el-input class="search-input" v-model="title" placeholder="请输入关键字进行搜索" prefix-icon="el-icon-search" clearable>
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
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
      <el-col :span="18">
        <div class="left">
          <div class="page-top">
            <el-row style="width:100%">
              <el-col :span="7" class="page-header">
                <span class="sub-title">政策解读</span><span>共有{{paginationOption.total}}条政策</span>
              </el-col>
              <el-col :span="17" class="page-header-btn">
                <span class="header-btn">
                  <el-radio-group v-model="pageOption.sort" size="mini" @change="handleChangeSort">
                    <el-radio-button label="time">发文时间</el-radio-button>
                    <el-radio-button label="views">热门</el-radio-button>
                  </el-radio-group>
                </span>
              </el-col>
            </el-row>
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
              <div :class="{'distance-right':item.dispatchList.length>0}"><i class="el-icon-setting" v-if="item.dispatchList.length>0">{{DeptJoint(item.dispatchList)}}</i></div>
              <div :class="{'distance-right':item.publishTime}"><i class="el-icon-time"></i>{{item.publishTime | dateFormat}}</div>
              <div v-if="item.views">浏览次数: {{item.views}}</div>
            </div>
            <div class="tag">
              标签:
              <el-tag type="info" v-for="(item, index) in item.tagList" :key="index">{{item.commonName}}</el-tag>
            </div>
            <!-- <div class="comparison">
                <el-button plain type="danger" size="mini" icon="el-icon-sort">比对</el-button>
              </div> -->
          </div>

          <div class="page-wrapper">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationOption.current" :page-sizes="[10, 20, 30, 40]" :page-size="paginationOption.size" layout="total, sizes, prev, pager, next, jumper" :total="paginationOption.total">
            </el-pagination>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="right">
          <div class="title">推荐政策<span @click="changeData">换一换</span></div>
          <hr style="margin:-1px 0 0">
          <div class="hotPolicy">
            <el-row v-for="(item,index) in policyList" :key="index">
              <el-col :span="1"><i class="el-icon-caret-right"></i></el-col>
              <el-col :span="23">
                <div class="content">{{item.title}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { region } from '../../policyManage/region'
import { dateFormat } from '@/util/date'
import { findByTypeList } from '@/api/govdata/common'
import { getAnalysisCenterPage } from '@/api/govdata/policy_analyzing'
export default {
  mixins: [mixins],
  data () {
    return {
      title: '',
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
      changeOption: {
        limit: 10,
        page: 1,
        views: 1,
      },
      resdata: [],
      policyList: [],
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
    this.hotPolicy()
  },
  methods: {
    /**
     * 拼接发文单位字段
     */
    DeptJoint (item) {
      let data = item
      let datas = data.map(i => i.dispatchName).join(',')
      return datas
    },

    /**
     * 获取层级、适用对象、主题、规模、行业数据
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
     * 获取热门政策
     */
    hotPolicy (option = this.changeOption) {
      getAnalysisCenterPage(option).then(res => {
        this.policyList = res.data.records
        this.pages = res.data.pages
      })
    },

    /**
     * 换一换
     */
    changeData () {
      if (this.changeOption.page + 1 > this.pages) {
        this.changeOption.page = 1
      } else {
        this.changeOption.page++
      }
      this.changeOption = { ...this.changeOption }
      this.hotPolicy()
    },

    /**
     * 获取获取列表数据
     */
    async load () {
      this.isLoadTable = true
      const res = await getAnalysisCenterPage({
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
     * 根据标题去搜索
     */
    search () {
      this.pageOption.title = this.title
      this.load()
    },

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
     * 打开详情页
     */
    handleOpenLink (item) {
      this.$router.push({
        path: `/app/detail/${item.id}`,
        query: {
          type: 'explain',
          id: item.id,
        },
      })
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
.top {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 20px;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .policy-top {
    display: flex;
    margin-left: 18px;
    .search-input {
      width: 350px;
    }
  }
  .button-box {
    margin-top: 10px;
    .card {
      text-align: left;
      padding-top: 8px;
      .titletop {
        text-align: right;
        font-size: 15px;
        font-weight: 700;
        color: #07111b;
        margin: 6px 10px 0 0;
      }
      .el-radio-button--small .el-radio-button__inner {
        padding: 6px 15px;
        font-size: 14px;
      }
    }
  }
  .btn {
    text-align: center;
    border-top: 1px solid #eee;
    margin-top: 10px;
    .collapse-btn {
      margin: 0;
      border-top: none;
      margin-top: -1px;
      border-radius: 0 0 5px 5px;
    }
  }
}
.bottom {
  width: 100%;
  margin: 25px auto 50px auto;
  display: flex;
  flex-direction: row;
  -webkit-box-flex: 1;
  flex: 1;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  .left {
    margin-right: 30px;
    /*  border: 1px solid #ddd; */
    border-radius: 3px;
    .page-top {
      display: flex;
      height: 53px;
      padding-top: 12px;
      border-bottom: solid 1px #e6e6e6;
      .page-header {
        align-items: baseline;
        font-size: 18px;
        color: #222;
        span {
          font-size: 13px;
          margin-left: 16px;
          color: #999;
          font-weight: 400;
        }
        .sub-title {
          display: inline-block;
          margin-left: 0;
          padding: 0 10px;
          font-size: 18px;
          line-height: 40px;
          border-bottom: 2px solid #ba1b21;
          color: #333;
        }
      }
      .page-header-btn {
        text-align: left;
        span {
          float: right;
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
      margin: 20px 0;
      border-top: 1px solid #eee;
      h3 {
        line-height: 30px;
        font-size: 18px;
        color: #333;
        margin-top: 15px;
        &:hover {
          cursor: pointer;
          color: $--menu-color-primary;
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
        .distance-right {
          margin-right: 20px;
        }
        .el-icon-setting:before {
          margin-right: 5px;
        }
        .el-icon-time {
          margin-right: 5px;
        }
      }
      .tag {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
      }
      .comparison {
        text-align: right;
        margin: 0px 10px 20px 10px;
      }
    }

    &:nth-child(1) .text-container {
      border: 0;
    }
    .page-wrapper {
      display: flex;
      justify-content: center;
      margin: 30px auto;
    }
  }
  .right {
    border-left: 1px solid #ebeef5;
    /* border-radius: 3px; */
    /* margin-left: 25px; */
    padding: 0 0 0 30px;
    .title {
      padding: 18px 0 18px;
      font-size: 18px;
      font-weight: 400;
      color: #333;
      span {
        font-size: 14px;
        font-weight: 400;
        color: $--menu-color-primary;
        cursor: pointer;
        float: right;
        &:hover {
          opacity: 0.6;
        }
      }
    }
    .hotPolicy {
      margin: 20px 0;
      .content {
        font-size: 13.3px;
        color: #333;
        margin-bottom: 10px;
        padding-left: 9px;
        cursor: pointer;
        &:hover {
          color: $--menu-color-primary;
        }
      }
    }
  }
}
</style>
<style  scoped>
.search-input >>> .el-input__inner {
  border-radius: 4px 0px 0px 4px;
  border-color: #ccc;
}
.answerSheetTop >>> .el-cascader {
  margin-top: 7px;
  width: 35%;
}
.header-btn >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #ba1b21;
  background: #f8e8e9;
  border-color: #e3a4a6;
}
.istop >>> .el-tag {
  height: 27px;
  line-height: 26px;
}
.tag >>> .el-tag.el-tag--info {
  margin-left: 10px;
  height: 24px !important;
  line-height: 22px !important;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.65);
}
.tag >>> .el-tag:hover {
  opacity: 0.85;
}
.card >>> .el-radio-button--small .el-radio-button__inner {
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #fff;
}
.card >>> .el-radio-button:first-child .el-radio-button__inner {
  border-radius: 6px;
}
.card >>> .el-radio-button__inner {
  border: 0px solid #dcdfe6;
  margin: 1px;
}
.card >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner,
.card >>> .el-radio-button--small .el-radio-button__inner:hover {
  background-color: #fef6f4;
  border: 1px solid #dc8687;
  border-radius: 20px;
  color: #ba1b21;
}
.hotPolicy >>> .el-icon-caret-right {
  margin-left: -4px;
  color: #999;
}
</style>