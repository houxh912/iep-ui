<template>
  <div class="grid-content">
    <iepAppTabCard :title="title">
      <div class="tenLinkOne" v-for="(item,index) in tenLinksOne" :key="index">
        <i :class="item.icon"></i>
        <p v-text="item.title"></p>
        <p class="des" v-text="item.des"></p>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '国脉一统十',
      tenLinksOne: [
        { icon: 'el-icon-document', 'title': '宣传册5个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': 'ppt4个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': 'VI体系13个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': '简介14个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': '宣传片13个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': '短期材料15个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': '频台广告34个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': '商业资料14个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': '大事记22个', des: '内涵非常广泛' },
        { icon: 'el-icon-tickets', 'title': '会议培训26个', des: '内涵非常广泛' },
      ],
    }
  },
}
</script>
<style scoped lang='scss'>
.grid-content {
  grid-column-start: 1;
  grid-column-end: 3;
  .tenLinkOne {
    width: 20%;
    height: 120px;
    display: inline-block;
    margin: 15px 0;
    text-align: center;
    i {
      font-size: 38px;
    }
    p {
      font-size: 14px;
      color: #000;
      margin-bottom: 0;
    }
    .des {
      color: #aaa;
      margin-bottom: 15px;
    }
  }
}
.title {
  font-size: 18px;
  color: #000;
  margin-bottom: 5px;
  line-height: 1.4;
}
</style>
