<template>
  <div class="appraise">
    <el-timeline v-for="(appraise,index) in appraiseList" :key="index">
      <el-timeline-item :timestamp="appraise.time" placement="top">
        <i class="shrink el-icon-arrow-down"></i>
        <el-card shadow="never" v-for="(child, index2) in appraise.childList" :key="index2">
          <div class="conList" v-if="isShow">
            <div class="img"><img :src="child.img" alt=""></div>
            <div class="con">
              <h4>
                <span class="name">{{child.name}}</span>
                <span class="department">{{child.department}}</span>
                <span class="subTime">{{child.subTime}}</span>
                <span class="operate">
                  <i class="el-icon-edit" @click="handleEdit"></i>
                  <i class="el-icon-close" @click="handleClose"></i>
                </span>
              </h4>
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :placeholder="child.con" v-model="textarea">
              </el-input>
            </div>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: true,
      textarea: '',
      appraiseList: [
        {
          time: '2019年4月',
          childList: [
            {
              img: require('./img/p01.jpg'),
              name: '何舟杰',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: require('./img/p1.jpg'),
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: require('./img/p02.jpg'),
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
          ],
        },
        {
          time: '2019年3月',
          childList: [
            {
              img: require('./img/p01.jpg'),
              name: '黄舟',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: require('./img/p1.jpg'),
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: require('./img/p02.jpg'),
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleClose () {
    },
    handleEdit () {
    },
  },
}
</script>
<style lang="scss" scoped>
.appraise {
  margin-top: 20px;
  .el-timeline {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    .shrink {
      position: absolute;
      top: 5px;
      left: 70px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .department,
  .subTime {
    margin-left: 5px;
    font-weight: 400;
    color: #999;
  }
  .subTime {
    flex: 2;
  }
  .conList {
    display: flex;
    padding: 20px 0;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #ebeef5;
    .con {
      flex: 2;
      margin-left: 20px;
      h4 {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .input {
    textarea {
      border: 0;
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: #333;
  }
  .operate {
    i {
      font-size: 18px;
      cursor: pointer;
      color: #999;
    }
    .el-icon-edit {
      margin-right: 5px;
      color: #cb3737;
    }
  }
  .img {
    width: 60px;
    height: 60px;
    border: 1px solid #ebeef5;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transition: 0.5s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .el-card {
    border: 0;
  }
}
</style>

<style lang="css" scoped>
.appraise >>> .el-timeline-item__wrapper {
  position: relative;
  padding: 0;
}
.appraise >>> .is-top {
  font-size: 14px;
  cursor: pointer;
}
.appraise >>> .el-timeline-item__tail,
.appraise >>> .el-timeline-item__node {
  display: none;
}
.appraise >>> .el-textarea__inner {
  border: 0;
  padding: 0;
}
.appraise >>> .br1 .el-textarea__inner {
  border: 1px solid #dcdfe6;
}
.appraise >>> .el-card__body {
  padding: 0 20px;
}
</style>
