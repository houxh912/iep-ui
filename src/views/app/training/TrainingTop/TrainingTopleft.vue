<template>
  <div class="training-top-left">
    <el-row>
      <el-col>
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <span class="item"><span>NEW</span></span>
          <div class="con">
            <img :src="img" class="img">
            <div class="text">
              <h3 class="sub-title">
                2019政务大数据、数字政府理论与实践 高级研修班（第四期）
              </h3>
              <div class="classTag">
                <el-tag type="white" v-for="tag in tags" :key="tag.id">{{tag.tag}}</el-tag>
              </div>
              <p class="con-text">党的十八大以来，党中央高度重视以信息化推进国家治理体系和治理能力现代化，强调要加快推动电子政务，打通信息壁垒，构建全流程一体化在线服务平台，助力建设人民满意的服务型政府。2018年6月,构建全流程一体化在线服务平台</p>
              <div class="info">
                <span class="info-con"><i class="iconfont icon-denglu"></i><span>郑爱军、</span><span>王路燕、</span><span>何益挺</span></span>
                <span class="info-con">
                  <i class="icon-font icon-shijian"></i><span>2019年04月02日-04月05日</span>
                </span>
                <span class="info-con">
                  <i class="icon-font icon-place"></i><span>北京•万寿宾馆</span></span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      img: require('../img/zz.jpg'),
      tags:[
        {tag: '数据政府'},
        {tag: '培训班'},
        {tag: '政务大数据'},
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.training-top-left {
  position: relative;
  .con {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .img {
    display: inline-block;
    width: 340px;
    height: 350px;
  }
  .text {
    margin-left: 20px;
    flex: 1;
    .sub-title {
      margin-bottom: 18px;
      font-size: 18px;
    }
    .con-text {
      margin: 20px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      color: #999;
    }
  }
  .classTag {
    .el-tag {
      margin-right: 5px;
      &:hover {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
    }
  }
  .info {
    padding-top: 20px;
    border-top: 1px solid #ebeef5;
    .info-con {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 12px;
      color: #666;
      i {
        margin-right: 8px;
        font-size: 18px;
        color: #999;
      }
    }
  }
}
.item {
  position: absolute;
  top: 0;
  right: 0;
  height: 0;
  width: 0;
  border-style: solid;
  border-color: #cb3737 transparent transparent transparent;
  border-width: 40px 0 60px 50px;
  background: none;
  span {
    position: absolute;
    top: -35px;
    right: 3px;
    color: #fff;
    transform: rotate(37deg);
    font-size: 12px;
  }
}
.training-top-left .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
</style>