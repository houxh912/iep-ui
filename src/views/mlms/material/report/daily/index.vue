<template>
  <div class="daily">

    <div class="fillin">
      <el-input type="textarea" rows=5 v-model="formData"></el-input>
      <div class="footer">
        <iep-button type="danger" @click="submit">保存</iep-button>
        <div class="error" v-if="validate">日报内容不能为空</div>
      </div>
    </div>

    <div class="timeline">
      <el-col class="search">
        <div class="item">
          <el-date-picker v-model="searchData.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
        </div>
        <div class="item">
          <el-input v-model="searchData.title" placeholder="请输入关键词" size="small"></el-input>
        </div>
        <iep-button @click="search">搜索</iep-button>
      </el-col>
      <el-col>
        <time-line :list="list" ref="timeline">
          <template #content="{row, index}">
            <el-collapse v-model="activeIndex" @change="activeChange">
              <el-collapse-item :title="row.title" :name="index">
                <pre>{{row.content}}</pre>
              </el-collapse-item>
            </el-collapse>
          </template>
        </time-line>
      </el-col>
    </div>
      
  </div>
</template>

<script>
import TimeLine from './timeline'
export default {
  name: 'daily',
  components: { TimeLine },
  data () {
    return {
      activeIndex: [],
      list: [
        { month: '2019年2月' },
        { date: '27日', title: '2019-02-27日报', content: '1、资源平台前端开发' },
        { date: '28日', title: '2019-02-28日报', content: '1、资源平台前端开发' },
        { month: '2019年3月' },
        { date: '1日', title: '2019-03-1日报', content: '1、资源平台前端开发' },
      ],
      formData: '',
      validate: false,
      searchData: {
        date: '',
        title: '',
      },
    }
  },
  methods: {
    activeChange (val) {
      this.activeIndex = [val[val.length-1]]
      this.$refs['timeline'].active = this.activeIndex[0]
    },
    submit () {
      if (this.formData === '') {
        this.validate = true
        return
      }
      console.log('this.formData: ', this.formData)
      this.validate = false
      this.list.push(
        { date: '15', title: '2019-02-15日报', content: this.formData }
      )
    },
    search () {},
  },
}
</script>

<style lang="scss" scoped>
.daily {
  .fillin {
    padding: 10px 0 20px;
    border-bottom: 1px solid #ddd;
    .footer {
      margin-top: 20px;
      .error {
        display: inline-block;
        font-size: 12px;
        color: red;
        margin-left: 10px;
      }
    }
  }
  .timeline {
    padding: 20px 0 0;
    .search {
      margin-bottom: 20px;
      .item {
        display: inline-block;
        width: 150px;
        margin-right: 15px;
      }
    }
  }
}
</style>
