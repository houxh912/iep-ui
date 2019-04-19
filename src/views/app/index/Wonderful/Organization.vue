<template>
  <div class="Organization">
    <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
      <div class="img"><img :src="item.img" class="img"></div>
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wonderfulList: [
        { name: '国脉先锋队', img: require('../img/国脉先锋队.jpg') },
        { name: '国脉集团研发中心', img: require('../img/国脉集团研发中心.jpg') },
        { name: '佛山司马钱信息技术有限公司', img: require('../img/佛山司马钱信息技术有限公司.jpg') },
      ],
    }
  },
}
</script>


