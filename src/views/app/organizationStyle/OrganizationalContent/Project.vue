<template>
  <div class="project">
    <el-card class="box-card" shadow="never">
      <div class="item" v-for="item in itemList" :key="item.id">
        <i class="iconfont" :class="item.icon"></i>
        <div class="text">
          <span class="name">{{item.name}}</span>
          <span>
            <span class="data">{{item.data}}</span>
            <span class="txt">{{item.text}}</span>
          </span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      itemList: [
        {
          icon: 'icon-renwu',
          name: '项目',
          data: '23',
          text: '（在建 5）',
        },
        {
          icon: 'icon-lianxiren',
          name: '客户',
          data: '116',
          text: '（本月新增 20）',
        },
        {
          icon: 'icon-dangan',
          name: '方案',
          data: '320',
          text: '（本月新增 24）',
        },
        {
          icon: 'icon-dongtai',
          name: '产品',
          data: '8',
          text: '（最新代理 12）',
        },
        {
          icon: 'icon-hetongliebiao',
          name: '资质',
          data: '11',
          text: '（本月新增 20）',
        },
        {
          icon: 'icon-custom',
          name: '合同',
          data: '48',
          text: '（待签 7）',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.project {
  margin: 30px 0;
  i {
    display: inline-block;
    width: 70px;
    height: 70px;
    line-height: 70px;
    font-size: 32px;
    text-align: center;
    border-radius: 50%;
    background-color: #f8f8f8;
    color: #666;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 25px 10px;
    .text {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      margin-left: 18px;
      .name {
        font-size: 16px;
      }
      .data {
        font-size: 24px;
      }
      .txt {
        color: #999;
      }
    }
  }
}
</style>
<style scoped>
.project >>> .el-card__body {
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 2fr) minmax(100px, 2fr) minmax(
      100px,
      2fr
    );
}
</style>
