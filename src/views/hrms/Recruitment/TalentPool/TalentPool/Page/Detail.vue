<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="人才详情" :backOption="backOption"></page-header>
      <div class="base-msg">
        <el-row>
          <el-col :span="5">
            <div class="grid-content bg-purple name-con">
              <div class="img zoom"><img id="information-avatar" alt="头像"></div>
              <div class="name-info">
                <span class="name">张三</span>
                <span class="time">1992-02-10</span>
              </div>
            </div>
          </el-col>
          <el-col :span="19">
            <div class="grid-content bg-purple detail">
              <el-form ref="form" :model="form" label-width="100px">
                <el-col :span="8">
                  <el-form-item label="联系电话：">
                    <span>{{form.phone}}</span>
                  </el-form-item>
                  <el-form-item label="政治面貌：">
                    <span>{{form.face}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电子邮箱：">
                    <span>{{form.email}}</span>
                  </el-form-item>
                  <el-form-item label="毕业学校：">
                    <span>{{form.school}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="外部头衔：">
                    <span>{{form.honor}}</span>
                  </el-form-item>
                  <el-form-item label="最高学历：">
                    <span>{{form.education}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="现住地址：">
                    <span>{{form.address}}</span>
                  </el-form-item>
                </el-col>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="review basic-info">
        <el-form ref="form" :model="form" label-width="130px">
          <div class="title"> {{form.review.title}}</div>
          <div class="con">
            <el-form-item :label="item.label+'：'" v-for="(item,index) in form.review.list" :key="index">
              <span>{{item.value}}</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="review basic-info">
        <el-form ref="form" :model="form" label-width="110px">
          <div class="title"> {{form.opinion.title}}</div>
          <div class="con">
            <el-form-item :label="item.label+'：'" v-for="(item,index) in form.opinion.list" :key="index">
              <span>{{item.value}}</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="review basic-info">
        <el-form ref="form" :model="form" label-width="110px">
          <div class="title"> {{form.study.title}}</div>
          <div class="sub-title"> {{form.study.subtitle}}</div>
          <div class="con">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="unit" label="学习教育单位" width="180">
              </el-table-column>
              <el-table-column prop="time" label="起始日期" width="180">
              </el-table-column>
              <el-table-column prop="con" label="学习内容">
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
      <div class="review">
        <div class="prompt"> 抄送人：{{form.sourceName}}</div>
        <div class="prompt color" readonly> 注：（审批通过后，通知抄送人）</div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { handleImg } from '@/util/util'
import PageHeader from '@/components/Page/Header'
export default {
  components: { PageHeader },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: this.handleGoBack,
      },
      form: {
        name: '李颖',
        phone: '13666567728',
        face: '党员',
        address: '浙江省舟山市定海区临城街道邦泰城11幢1206室',
        email: 'ahsffl111@163.com',
        school: '浙江大学',
        honor: '开发工程师',
        education: '本科',
        date: '2019-06-20',
        salary: 3000,
        review: { title: '基础信息', list: [{ label: '身高', value: '160cm' }, { label: '体重', value: '基50kg' }, { label: '民族', value: '汉族' }, { label: '健康', value: '良好' }, { label: '婚姻状况', value: '已婚' }, { label: '生育状态', value: '已育' }, { label: '员工关系', value: '朋友' }, { label: '推荐人', value: '李四' }, { label: '应聘渠道', value: '在线应聘' }, { label: '来源', value: '官网' }, { label: '兴趣爱好', value: '音乐' }, { label: '个人特长及优势', value: '专研技术' }, { label: '荣誉奖励', value: '在线应聘' }, { label: '其他成果', value: '在线应聘' }] },
        opinion: { title: '求职意向', list: [{ label: '应聘岗位', value: 'JAVA开发' }, { label: '期望薪资', value: '6000-10000元' }, { label: '期望工作地点', value: '舟山' }, { label: '到岗日期', value: '2019-05-02' }] },
        study: { title: '学习工作经历', subtitle: '学习情况' },
      },
      tableData: [
        {
          unit: '浙江大学',
          time: '王小虎',
          con: '计算机语言/计算机网络课程',
        },
        {
          unit: '浙江工商学院',
          time: '王二虎',
          con: '计算机语言/计算机网络课程',
        },
      ],
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
  created () {
    handleImg(this.userInfo.avatar, 'information-avatar')
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.base-msg {
  width: 100%;
  color: #606266;
  box-sizing: border-box;
  border-radius: 3px;
  padding: 15px 0 7px 0;
  border: 1px solid #eee;
  box-shadow: 0 0 1px 1px #eee;
  .el-row {
    display: flex;
    align-items: center;
  }
  .el-col-19 {
    border-left: 1px dashed #eee;
  }
  .detail {
    padding: 0 30px;
  }
  .name-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .name-info {
      .name {
        display: block;
        margin-bottom: 10px;
        font-size: 20px;
      }
      .time {
        display: block;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
.basic-container {
  border: none;
}
.basic-info {
  .sub-title {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
  .con {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 25%;
      &:nth-child(13),
      &:nth-child(14) {
        width: 100%;
      }
    }
  }
}
.review {
  border-bottom: 1px solid #eee;
  color: #606266;
  padding: 20px;
  .title {
    padding: 15px 20px;
    font-weight: 600;
  }
  .prompt {
    padding: 0 20px 10px 20px;
  }
  .color {
    color: #ccc;
  }
}
.el-form-item {
  margin: 0;
}
</style>
<style scoped>
.base-msg >>> .el-form-item .el-form-item__label {
  text-align: left;
}
.basic-info >>> .con .el-table th {
  background-color: #fafafa;
}
.basic-info >>> .el-table thead,
.basic-info >>> .el-table tbody {
  border: 1px solid #eee;
}
</style>

