<template>
  <div class="job">
    <span v-for="(item,index) in tags" :key="index" @click="TagsDetail()">
        {{item.name}}
    </span>
    <span>更多...</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
        tags:[
            {name:'郑爱军'},
            {name:'王玲'},
            {name:'李凯'},
            {name:'肖香芝'},
            {name:'郑鑫宁'},
            {name:'黄成祥'},
            {name:'李东伟'},
            {name:'易华聪'},
            {name:'郑爱军'},
            {name:'王玲'},
            {name:'李凯'},
            {name:'肖香芝'},
            {name:'郑鑫宁'},
            {name:'黄成祥'},
            {name:'李东伟'},
            {name:'易华聪'},
            {name:'郑爱军'},
            {name:'王玲'},
            {name:'李凯'},
            {name:'肖香芝'},
            {name:'郑鑫宁'},
            {name:'黄成祥'},
            {name:'李东伟'},
        ],
    }
  },
    methods: {
        TagsDetail () {
            this.$router.push({
                 path: '/app/tags_detail',
            })
        },
    },
}
</script>
<style scoped lang="scss">
.job{
    span:nth-last-child(1){
      color:#c73e3e;
    }
    span{
        display:inline-block;
        padding: 5px 20px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        color: #666;
        cursor: pointer;
    }
    & span:hover{
        color:#c73e3e;
         border: 1px solid #c73e3e;
    }
}
</style>
