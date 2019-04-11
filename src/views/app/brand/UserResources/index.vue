<template>
  <div class="grid-content">
    <el-card class="box-card">
      <div class="news-nav">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户资源" name="first">
            <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
              <span class="name">{{item.name}}</span>
              <span class="datas">{{item.datas}}</span>
              <span class="fr" :class="item.color">{{item.status}}</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="媒体资源" name="second">渠道资源</el-tab-pane>
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
                {name:'国脉电子政务网',color:'red',datas:'总注册：1264，本月：677', status:'帮她加粉'},
                {name:'国脉智慧城市网',color:'red',datas:'总注册：1264，本月：677', status:'帮她加粉'},
                {name:'数邦客',color:'red',datas:'总注册：1264，本月：677', status:'帮她加粉'},
                {name:'蟠桃会',color:'red',datas:'总注册：1264，本月：677', status:'帮她加粉'},
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.piece{
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
        .fr{
            float: right;
            padding: 0 8px;
            line-height: 30px;
            text-align: center;
            margin-right: 20px;
            background-color: #fff;
            color:#bb1a20;
            border: 1px solid #bb1a20;
            border-radius: 3px;
            display: inline-block;
            font-size: 14px;
        }
        .red{
            background-color:#fff; 
        }
        .datas{
            font-size: 14px;
            color: #aaa;
        }
        &:hover {
            color: #cb3737;
        }
    }
    .todyInfo{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        background-color: #eee;
    }
</style>
