<template>
  <div class="organize">

    <div class="search">
      <div class="item">
        <el-date-picker v-model="searchData.date" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </div>
      <div class="item">
        <el-input v-model="searchData.title" placeholder="请输入关键词" size="small"></el-input>
      </div>
      <iep-button @click="search">搜索</iep-button>
    </div>
    <div class="content">
      <div class="timeline">
        <time-line :list="list" ref="timeline" @actively="actively"></time-line>
      </div>
      <div class="form">
        <weekly-form ref="dislog" v-if="contentType==='week'"></weekly-form>
        <monthly-form ref="dislog" v-else></monthly-form>
      </div>
    </div>
      
  </div>
</template>

<script>
import TimeLine from './timeline'
import weeklyForm from './weekly'
import monthlyForm from './monthly'
export default {
  name: 'organize',
  components: { TimeLine, weeklyForm, monthlyForm },
  data () {
    return {
      activeIndex: [],
      list: [
        { year: '2019年' },
        { date: '1月',
          children: [
            { title: '第一周', subTit: '01-04 ~ 01-10', content: '个人周报' },
            { title: '第二周', subTit: '01-11 ~ 01-17', content: '个人周报' },
            { title: '第三周', subTit: '01-18 ~ 01-24', content: '个人周报' },
            { title: '第四周', subTit: '01-25 ~ 02-02', content: '个人周报' },
          ],
        }, { date: '2月', 
          children: [
            { title: '第五周', subTit: '02-04 ~ 02-10', content: '个人周报' },
            { title: '第六周', subTit: '02-11 ~ 02-17', content: '个人周报' },
            { title: '第七周', subTit: '02-18 ~ 02-24', content: '个人周报' },
            { title: '第八周', subTit: '02-25 ~ 03-02', content: '个人周报' },
          ],
        },
      ],
      formData: '',
      validate: false,
      searchData: {
        date: '',
        title: '',
      },
      contentType: 'weekly',
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
    actively (index, type) {
      this.contentType = type
      this.$nextTick(() => {
        this.$refs['dislog'].dislogState = 'detail'
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.organize {
  padding: 20px 0 0;
  .search {
    margin-bottom: 20px;
    .item {
      display: inline-block;
      width: 150px;
      margin-right: 15px;
    }
  }
  .content {
    display: flex;
    .timeline {
      width: 180px;
    }
    .form {
      flex: 1;
    }
  }
}
</style>
