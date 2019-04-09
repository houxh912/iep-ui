<template>
  <div class="leaderBoard">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
        </div>
        <div>
            <div class="leaderBoardList">
                <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
                    <span class="count" :class="item.color">{{index+1}}</span>
                    <span class="name">{{item.name}}</span>
                    <span class="grade">{{item.grade}}</span>
                </div>
            </div>
        </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
        title:'贡献排行',
        leaderBoardList: [
            {name:'张小燕',grade:'222',color:'red'},
            {name:'张小燕',grade:'222',color:'red'},
            {name:'张小燕',grade:'222',color:'red'},
            {name:'张小燕',grade:'222',color:''},
            {name:'张小燕',grade:'222',color:''},
            {name:'张小燕',grade:'222',color:''},
            {name:'张小燕',grade:'222',color:''},
            {name:'张小燕',grade:'222',color:''},
            {name:'张小燕',grade:'222',color:''},
            {name:'张小燕',grade:'222',color:''},
        ],
    }
  },
}
</script>
<style lang="scss" scoped>
.leaderBoard{
    .piece{
        cursor: pointer;
        .name{
            height: 30px;
            line-height: 30px;
        }
        .count{
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            margin-right: 20px;
            background-color: #ccc;
            color:#fff;
            display: inline-block;
        }
        .red{
            background-color:#bb1a20; 
        }
        .grade{
            float: right;
            color: #bb1a20;
        }
        &:hover {
            color: #cb3737;
        }
    }
}
</style>
