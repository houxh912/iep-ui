<template>
  <div>
    <basic-container>
      <iep-page-header title="申请投资" :backOption="backOption"></iep-page-header>
      <div class="withdraw-wrapper">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <keep-alive>
          <component :is="steps[current].content" :data="steps[current].data" @on-data="steps[current].onData" @prev="prev"></component>
        </keep-alive>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { statusMap } from './options'
import FirstContent from './FirstContent'
import SecondContent from './SecondContent'
import ThirdContent from './ThirdContent'
import LastContent from './LastContent'
import { getInvestmentById } from '@/api/fams/investment'
export default {
  components: {
    FirstContent,
    SecondContent,
    ThirdContent,
    LastContent,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      current: 0,
      steps: [{
        title: '填写投资信息',
        content: 'FirstContent',
        nextText: '下一步',
        prevText: '',
        data: undefined,
        onData: this.handleFirst,
      }, {
        title: '确认投资信息',
        content: 'SecondContent',
        nextText: '下一步',
        prevText: '上一步',
        data: undefined,
        onData: this.handleSecond,
      }, {
        title: '财务委员会审核',
        content: 'ThirdContent',
        nextText: '撤销',
        prevText: '',
        data: undefined,
        onData: this.handleBack,
      }, {
        title: '完成',
        content: 'LastContent',
        nextText: '',
        prevText: '',
        data: undefined,
        onData: this.handleBack,
      }],
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleFirst (form) {
      this.next()
      this.steps[this.current].data = form
    },
    handleSecond (form) {
      this.next()
      this.steps[this.current].data = form
    },
    handleBack () {
      this.$router.history.go(-1)
    },
    next () {
      this.current++
    },
    prev () {
      this.current--
    },
    back () {
      this.$router.history.go(-1)
    },
    loadPage () {
      if (this.id) {
        getInvestmentById(this.id).then(({ data }) => {
          this.current = statusMap[data.data.status]
          this.steps[this.current].data = data.data
        })
      }
    },
  },
}
</script>
<style scoped>
.withdraw-wrapper {
  margin-top: 50px;
  margin-left: 10%;
  margin-right: 10%;
}
.withdraw-wrapper >>> .steps-content{
  padding-top: 20px;
}
</style>