<template>
  <div class="grid-content">
    <el-card class="box-card">
      <div class="news-nav">
        <el-tabs v-model="activeName">
          <el-tab-pane label="联络员排名" name="first">
            <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
              <span class="name">{{item.name}}</span>
              <span class="num">{{item.num}}</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="品牌达人" name="second">品牌达人</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
     data () {
        return {
            activeName: 'first',
            leaderBoardList: [
                {name:'赵某某',num:88},
                {name:'首谋',num:88},
                {name:'楼晓燕',num:88},
                {name:'红某某',num:88},
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.piece{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-bottom: 8px;
        height: 30px;
        cursor: pointer;
        .name{
            display: inline-block;
            width: 30%;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .num{
            vertical-align: 5px;
        }
        &:hover {
            color: #cb3737;
        }
    }
</style>
