<template>
  <div>
    <basic-container>
      <page-header title="申请提现" :replaceText="replaceText" :backOption="backOption"></page-header>
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
import { mapGetters } from 'vuex'
import FirstContent from './FirstContent'
import SecondContent from './SecondContent'
import ThirdContent from './ThirdContent'
import FourthContent from './FourthContent'
import LastContent from './LastContent'
import { getWithdrawById } from '@/api/fams/withdraw'
const statusMap = {
  '0': 2,
  '1': 3,
  '2': 4,
  '3': 4,
  '4': 4,
}
export default {
  components: {
    FirstContent,
    SecondContent,
    ThirdContent,
    FourthContent,
    LastContent,
  },
  data () {
    return {
      replaceText: () => `（每一笔提现均需提交${this.famsConfig.taxRate * 100}%的税费，税费可用发票抵消。）`,
      backOption: {
        isBack: true,
      },
      current: 0,
      steps: [{
        title: '填写提现信息',
        content: 'FirstContent',
        nextText: '下一步',
        prevText: '',
        data: undefined,
        onData: this.handleFirst,
      }, {
        title: '确认提现信息',
        content: 'SecondContent',
        nextText: '提交',
        prevText: '上一步',
        data: undefined,
        onData: this.handleSecond,
      }, {
        title: '财务审核',
        content: 'ThirdContent',
        nextText: '撤销',
        prevText: '',
        data: undefined,
        onData: this.handleBack,
      }, {
        title: '财务发放',
        content: 'FourthContent',
        nextText: '',
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
    ...mapGetters(['famsConfig']),
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.id) {
        getWithdrawById(this.id).then(({ data }) => {
          this.current = statusMap[data.data.status]
          this.steps[this.current].data = data.data
          // console.log(this.current, this.steps[this.current])
          // debugger
        })
      }
    },
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
  },
}
</script>
<style scoped>
.withdraw-wrapper {
  margin-top: 50px;
  margin-left: 10%;
  margin-right: 10%;
}
</style>