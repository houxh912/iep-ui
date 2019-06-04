<template>
  <div class="fraction">
    <div class="item" v-for="fraction in fractionList" :key="fraction.id">
      <span class="num">{{fraction.num}}</span>
      <span class="title">
        <span>{{fraction.title}}</span>
        <span>{{fraction.progress}}<i class="icon" :class="fraction.icon"></i></span>
      </span>
      <el-progress :text-inside="true" :stroke-width="8" :percentage="fraction.percentage" status="success"></el-progress>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fractionList: [
        {
          num: '275',
          title: '2019年合同总数',
          progress: '48%',
          icon: 'el-icon-top',
          percentage: '48',
        },
        {
          num: '21,789,475',
          title: '2019年合同金额',
          progress: '35%',
          icon: 'el-icon-bottom',
          percentage: '35',
        },
        {
          num: '275',
          title: '2019年收款金额',
          progress: '20%',
          icon: 'el-icon-top',
          percentage: '20',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.fraction {
  margin-top: 50px;
  .item {
    display: flex;
    margin-bottom: 35px;
    flex-direction: column;
    .num {
      font-size: 24px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      .icon {
        font-size: 18px;
        color: #d66368;
      }
    }
  }
}
</style>
<style scoped>
.fraction >>> .el-progress-bar__innerText {
  display: none;
}
</style>
