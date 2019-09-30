<template>
  <div class="wrapper">
    <div class="container">
      <div class="page-header">
        <div class="title">{{resdata.title}}</div>
        <div class="tip">
          <span style="margin-right:20px">发布来源：{{resdata.source}}</span>
          <span style="margin-right:20px">浏览量：{{resdata.views}}</span>
          <span class="link">
            <a :href="resdata.url">原文链接</a>
          </span>
        </div>
        <div class="tag">
          标签:
          <el-tag type="info" v-for="(item, index) in resdata.tagList" :key="index">{{item.commonName}}</el-tag>
        </div>
      </div>

      <div class="detail" v-if="this.$route.query.type == 'general' || this.$route.query.type == 'declare'">
        <div class="detail-box">
          <div class="box">文体：{{resdata.styleName}} </div>
          <div class="box">层级：{{resdata.levelName}}</div>
          <div class="box">适用规模：{{resdata.scaleList}}</div>
        </div>
        <div class="detail-box">
          <div class="box">发文号：{{resdata.issue}}</div>
          <div class="box">发文单位：{{resdata.source}}</div>
          <div class="box">索引号：{{resdata.reference}} </div>
        </div>
        <div class="detail-box">
          <div class="box">发文时间：{{resdata.publishTime |dateFormat}} </div>
          <div class="box">适用行业：{{resdata.industryList}}</div>
          <div class="box">适用对象：{{resdata.targetList}} </div>
        </div>
        <div class="detail-box">
          <div class="box">主题：{{resdata.themeList}}</div>
        </div>
      </div>

      <div class="text">
        <iep-html v-model="resdata.text"></iep-html>
      </div>

      <div class="foot">
        <div class="foot-select" v-if="prvNextList.prev" @click="prv">
          上一篇：{{prvNextList.prev.commonName}}
        </div>
        <div class="foot-select" v-if="prvNextList.next" @click="next">
          下一篇：{{prvNextList.next.commonName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGeneralCenterById } from '@/api/govdata/general_policy'
import { getDeclareCenterById } from '@/api/govdata/declaration_policy'
import { getAnalysisCenterById } from '@/api/govdata/policy_analyzing'
import { getInformationCenterById } from '@/api/govdata/information'
import { preOrNextPolicy } from '@/api/govdata/common'
import { dateFormat } from '@/util/date'
import moment from 'moment'
export default {
  data () {
    return {
      id: this.$route.query.id,     // 取出传入的参数
      type: this.$route.query.type,   // 取出传入的参数
      resdata: {
        themeList: [],
        industryList: [],
        scaleList: [],
        targetList: [],
        text: '',
      },
      prvNextList: {},
    }
  },
  computed: {},
  filters: {
    dateFormat (time) {
      var date = new Date(time)
      return dateFormat(date, 'yyyy年MM月dd日')
    },
  },
  created () {
    this.load()
  },
  methods: {
    /**
     * 公用部分
     */
    common (record) {
      this.resdata = record
      this.resdata.themeList = record.themeList ? record.themeList.map(i => i).join(' , ') : []
      this.resdata.industryList = record.themeList ? record.industryList.map(i => i).join(' , ') : []
      this.resdata.scaleList = record.themeList ? record.scaleList.map(i => i).join(' , ') : []
      this.resdata.targetList = record.themeList ? record.targetList.map(i => i).join(' , ') : []
      this.resdata.text = record.text
    },

    /**
     * 获取详情信息
     */
    load () {
      if (this.$route.query.type == 'general') {
        getGeneralCenterById(this.id).then(res => {
          const record = res.data.data
          this.common(record)
          this.selectPrvOrNext(record)
        })
      }
      if (this.$route.query.type == 'declare') {
        getDeclareCenterById(this.id).then(res => {
          const record = res.data.data
          this.common(record)
          this.selectPrvOrNext(record)
        })
      }
      if (this.$route.query.type == 'explain') {
        getAnalysisCenterById(this.id).then(res => {
          const record = res.data
          this.resdata = record
          this.selectPrvOrNext(record)
        })
      }
      if (this.$route.query.type == 'information') {
        getInformationCenterById(this.id).then(res => {
          const record = res.data.data
          this.resdata = record
          this.selectPrvOrNext(record)
        })
      }
    },

    /**
     * 获取上下篇的信息
     */
    selectPrvOrNext (record) {
      const params = {
        id: this.id,
        mark: this.type,
        publishTime: moment(record.publishTime).format('YYYY-MM-DD'),
      }
      preOrNextPolicy(params).then(res => {
        this.prvNextList = res.data
      })
    },

    /**
     * 点击上一篇
     */
    prv () {
      this.id = this.prvNextList.prev.commonId
      this.load()
    },

    /**
     * 点击下一篇
     */
    next () {
      this.id = this.prvNextList.next.commonId
      this.load()
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 30px 200px;
  padding: 0;
}
.container {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 25px 35px;
  .page-header {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 100%;
    flex: 1 1 100%;
    .title {
      line-height: 1.5;
      font-size: 22px;
      font-weight: 400;
      color: #333;
    }
    .tip {
      margin: 15px auto 10px;
      color: #999;
      font-size: 13px;
      .link {
        cursor: pointer;
        color: #409eff;
        text-decoration: none;
      }
    }
    .tag {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .detail {
    margin: 20px 0;
    padding: 20px 0;
    border: 1px solid #eee;
    border-width: 1px 0;
    background: #f6f6f6;
    .detail-box {
      width: 100%;
      height: 30px;
      display: flex;
      .box {
        width: 30%;
        line-height: 30px;
        font-size: 14px;
        color: #666;
        margin: 0 20px;
        &:nth-child(2n) {
          margin: 0;
          width: 45%;
        }
        &:nth-child(3n) {
          width: 25%;
        }
      }
      &:last-child .box {
        width: 100%;
      }
    }
  }
  .text {
    margin: 20px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .foot {
    .foot-select {
      line-height: 30px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
    }
  }
}
</style>

<style  scoped>
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
</style>