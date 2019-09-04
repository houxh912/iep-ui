<template>
  <basic-container class="thoughts">
    <headTpl class="fillin" @load-page="search"></headTpl>

    <div class="timeline">
      <el-col class="search">
        <div class="item">
          <el-date-picker v-model="searchData.createTime" value-format="yyyy-MM-dd 23:59:59" type="date" placeholder="选择日期" size="small" :picker-options="pickerOptions"></el-date-picker>
        </div>
        <iep-button @click="search">搜索</iep-button>
      </el-col>
      <el-col>
        <time-line :list="list" ref="timeline" @getMore="getMore" @getUpMore="getUpMore">
          <template #content="{row, index, today}">
            <div class="content">
              <div class="left">
                <pre>{{row.content}}</pre>
                <div class="img-list">
                  <iep-img class="img" v-for="(item, imgIndex) in row.images" :key="imgIndex" :src="item" fit="cover" :preview-src-list="dealImage(row.images, imgIndex)"></iep-img>
                </div>
              </div>
              <div class="right">
                <i class="el-icon-delete" @click="handleDelete(row, index)"></i>
                <i class="icon-suoding" v-if="row.status == 1"></i>
              </div>
            </div>
          </template>
        </time-line>
      </el-col>
    </div>
  </basic-container>
</template>

<script>
import TimeLine from './timeline'
import { thoughtsCreate, getThoughtsPage, thoughtsDelete } from '@/api/cpms/thoughts'
import { mapGetters } from 'vuex'
import { addBellBalanceRuleByNumber } from '@/api/fams/balance_rule'
import headTpl from '@/views/app/thoughtList/library/form'

function initFormData () {
  return {
    content: '',
    status: 0, // 0开放、1不开放
    images: [],
    tags: [],
  }
}

export default {
  name: 'thoughts',
  components: { TimeLine, headTpl },
  computed: {
    ...mapGetters(['userInfo']),
  },
  data () {
    return {
      activeIndex: [0],
      formData: initFormData(),
      createValidate: false,
      searchData: {
        createTime: '',
      },
      loadState: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
      },
      list: [],
      params: {
        current: 1,
        size: 10,
      },
    }
  },
  methods: {
    submit () {
      let fn = () => {
        this.loadState = false
        this.params.current = 1
        this.list = []
        this.loadPage()
        this.formData = initFormData()
      }
      if (this.formData.content == '') {
        this.createValidate = true
        return
      }
      this.createValidate = false
      this.loadState = true
      thoughtsCreate(this.formData).then(() => {
        // 判断是否公开，不公开(1)的说说没有奖励
        if (this.formData.status === 1) {
          this.$message.success('恭喜您发表了一篇说说，继续努力')
          fn()
        } else {
          addBellBalanceRuleByNumber('SHUOSHUO').then(({data}) => {
            this.$message.success(`恭喜您发表了一篇说说，${data.msg}，继续努力`)
            fn()
          })
        }
      }).catch(() => {
        this.$message.error('网络出现问题，请稍后重试！')
        this.loadState = false
      })
    },
    // 获取更多
    getMore () {
      ++this.params.current
      this.loadPage()
    },
    // 向上取更多
    getUpMore () {
      
    },
    // 展开
    activeChange (val) {
      this.activeIndex = [val[val.length - 1]]
      this.$refs['timeline'].active = this.activeIndex[0]
      this.dailyState = 'detail'
      this.updateValidate = ''
    },
    search () {
      this.list = []
      this.params.current = 1
      this.loadPage()
    },
    loadPage () {
      getThoughtsPage(Object.assign({}, this.params, this.searchData)).then(({data}) => {
        if (data.data.records.length == 0) {
          this.$message.info('暂无更多数据')
          return
        }
        this.list = this.list.concat(data.data.records)
      })
    },
    handleDelete (row, index) {
      this.$confirm('是否删除此条数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        thoughtsDelete([row.thoughtsId]).then(() => {
          // 判断删除的是第几页的数据，重新开始获取
          let page = parseInt(index / this.params.size)
          this.list = this.list.splice(0, page*10)
          this.params.current = page+1
          this.loadPage()
          this.$message.success('删除成功')
        })
      })
    },
    dealImage (data, index) {
      let list = []
      list = data.slice(index).concat(data.slice(0, index))
      return list
    },
  },
  created () {
    this.params.id = this.userInfo.userId
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.thoughts {
  margin-right: 16%;
  .fillin {
    padding: 10px 0 20px;
    border-bottom: 1px solid #ddd;
    .footer {
      margin-top: 20px;
      display: flex;
      div {
        width: 50%;
      }
      .state {
        text-align: left;
        p {
          display: inline;
          font-size: 14px;
          line-height: 20px;
        }
      }
      .button {
        text-align: right;
        .error {
          display: inline-block;
          font-size: 12px;
          color: red;
          margin-right: 10px;
        }
      }
    }
  }
  .timeline {
    padding: 20px 0 0;
    .search {
      margin-bottom: 20px;
      .item {
        display: inline-block;
        width: 220px;
        margin-right: 15px;
      }
    }
    .writing {
      color: #e47e33;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 5px 20px 20px;
      .left {
        width: calc(100% - 50px);
        .img-list {
          display: flex;
          flex-wrap: wrap;
          .img {
            width: 200px;
            height: 200px;
            margin: 0 15px 15px 0;
            cursor: pointer;
          }
        }
      }
      .right {
        text-align: right;
        padding-right: 4px;
        width: 30px;
        i {
          cursor: pointer;
          font-size: 18px;
        }
        .suoding {
          color: #f44;
        }
        // .weisuoding {
        //   color: #989898;
        // }
      }
      .footer {
        width: 100%;
        margin-top: 20px;
        .error {
          display: inline-block;
          font-size: 12px;
          color: red;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
