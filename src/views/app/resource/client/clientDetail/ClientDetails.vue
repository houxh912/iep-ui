<template>
  <div class="client-details">
    <div class="client-top">
      <p>{{title}}</p>
      <span>市场经理：{{name[0]}}</span>
      <span>协助人：{{name[1]}}</span>
    </div>
    <customer></customer>
  </div>
</template>
<script>
import Customer from './Customer'
export default {
  components:{
    Customer,
  },
  data () {
    return {
      title: '厦门市信息中心标准规划部',
      name:['李凯','胡浩'], 
    }
  },
}
</script>
<style lang="scss" scoped>
.client-top{
  margin-bottom: 15px;
  p{
    color:#333;
    font-size: 18px;
    margin-bottom: 8px;
  }
  span{
    margin-right: 10px;
    font-size: 14px;
  }
}
</style>

