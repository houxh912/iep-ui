<template>
  <div>
    <basic-container>
      <page-header title="申请投资" :replaceText="replaceText" :backOption="backOption"></page-header>
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
import FirstContent from './FirstContent'
import SecondContent from './SecondContent'
import ThirdContent from './ThirdContent'
import LastContent from './LastContent'
export default {
  components: {
    FirstContent,
    SecondContent,
    ThirdContent,
    LastContent,
  },
  data () {
    return {
      replaceText: () => '（将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。）',
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
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
    },
    handleFirst (form) {
      this.next()
      this.steps[this.current].data = form
    },
    handleSecond () {
      this.next()
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
      this.$router.go(-1)
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