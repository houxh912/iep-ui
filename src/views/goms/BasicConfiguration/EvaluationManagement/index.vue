<template>
  <div class="appraise">
    <basic-container>
      <page-header title="评价管理"></page-header>
      <el-collapse v-model="activeNames" @change="activeChange">
        <el-timeline v-for="(appraise,index) in appraiseList" :key="index">
          <el-collapse-item :title="appraise.time" :name="index">
            <el-card shadow="never" v-for="(child, index2) in appraise.childList" :key="index2">
              <div class="conList">
                <div class="img"><iep-img :src="child.img" alt=""></iep-img></div>
                <div class="con">
                  <h4>
                    <span class="name">{{child.name}}</span>
                    <span class="department">{{child.department}}</span>
                    <span class="subTime">{{child.subTime}}</span>
                    <span class="operate">
                      <i class="el-icon-edit" @click="update(index,index2, child.con)"></i>
                      <i class="icon-shanchu1 close" @click="handleClose"></i>
                    </span>
                  </h4>
                  <div class="fillin" v-if="updateIndex2 == index2 && updateIndex == index">
                    <el-input type="textarea" rows=5 v-model="updateData" placeholder="" maxlength="300"></el-input>
                    <div class="footer">
                      <iep-button type="primary" @click="submit()">保存</iep-button>
                      <div class="error" v-if="updateValidate">日报内容不能为空</div>
                    </div>
                  </div>
                  <div v-else>{{child.con}}</div>
                </div>
              </div>
            </el-card>
          </el-collapse-item>
        </el-timeline>
      </el-collapse>
    </basic-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeNames: [0, 1],
      dailyState: 'detail',
      updateIndex:-1,
      updateIndex2:-1,
      updateData:'',
      updateValidate: false,
      textarea: '',
      appraiseList: [
        {
          time: '2019年4月',
          childList: [
            {
              img: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png',
              name: '何益挺',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: '//183.131.134.242:10060/upload/iep/201905/6057ea69-63e7-4d1e-8510-11f0db4823c4_25e933aa-0b77-48fe-a2f8-a893be7278ee_20181218194521_ixb20x5efq.jpg',
              name: '丁斌',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '121可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: '//183.131.134.242:10060/upload/iep/201905/5cbd2176-0ef8-4636-9e0b-e1761a5802c2_自己.jpg',
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '11可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
          ],
        },
        {
          time: '2019年3月',
          childList: [
            {
              img: '//183.131.134.242:10060/upload/iep/201904/e29cedd1-efba-4082-a966-151153b77f28_5D559C5D-76D2-40A8-9150-B5D0D87DAE31.png',
              name: '何益挺',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '122可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: '//183.131.134.242:10060/upload/iep/201905/6057ea69-63e7-4d1e-8510-11f0db4823c4_25e933aa-0b77-48fe-a2f8-a893be7278ee_20181218194521_ixb20x5efq.jpg',
              name: '丁斌',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '2可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
            {
              img: '//183.131.134.242:10060/upload/iep/201905/5cbd2176-0ef8-4636-9e0b-e1761a5802c2_自己.jpg',
              name: '何已',
              department: '（研发中心）',
              subTime: '2019-04-12 13:25',
              con: '1可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等可改变按钮的颜色和大小及鼠标经过效果、样式等等',
            },
          ],
        },
      ],
    }
  },
  methods: {
    activeChange () {
      this.dailyState = 'detail'
      this.updateValidate = ''
    },
    handleClose () {
    },
    // 编辑
    update (index, index2, data) {
      this.$nextTick(() => {
        this.updateIndex = index
        this.updateIndex2 = index2
        this.updateData = data
        this.dailyState='更新'
      })
    },
    submit () {

    },
  },
}
</script>
<style lang="scss" scoped>
.appraise {
  .el-timeline {
    display: flex;
    flex-direction: column;
    padding-left: 0;
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
      .fillin {
        padding: 10px 0 20px;
        .footer {
          margin: 20px auto 0;
          .error {
            display: inline-block;
            font-size: 12px;
            color: red;
            margin-left: 10px;
          }
        }
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
.appraise >>> .br1 .el-textarea__inner {
  border: 1px solid #dcdfe6;
}
.appraise >>> .el-card__body {
  padding: 0 20px;
}
.appraise >>> .el-collapse {
  border: 0;
}
.appraise >>> .el-collapse-item__arrow {
  margin: 0 8px 0 8px;
}
</style>
