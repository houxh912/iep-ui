<template>
  <div>
    <div class="contianBox">
      <el-row class="title">
        <el-col :span="24" class="data">审批信息</el-col>
      </el-row>
      <el-row class="topBot">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="12" class="item" v-for="(item, index) in infoList" :key="index">
              <el-form-item :label="item.label">{{infoData[item.value]}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="footer">
          <iep-button type="danger" @click="sumbit">提交</iep-button>
        </div>
      </el-row>
    </div>
    <!--下方盒子-->
    <div class="contianBox">
      <el-row class="title">
        <el-col :span="20" class="data">立项信息</el-col>
        <el-col class="edit"><i class="icon-bianji"></i></el-col>
      </el-row>
      <el-row class="topBot">
        <el-form label-width="150px">
          <el-row>
            <el-col :span="12" class="item" v-for="(item, index) in setUpList" :key="index">
              <el-form-item :label="item.label" v-if="item.type === 'tag'">
                <el-tag type='info' v-for="(item, index) in setUpData[item.value]" :key="index">{{item}}</el-tag>
              </el-form-item>
              <el-form-item :label="item.label" v-else>{{setUpData[item.value]}}</el-form-item>
            </el-col>
          </el-row>
        </el-form>
        
      </el-row>
    </div>
    <!-- 立项申请 -->
    <transfer-dialog ref="form"></transfer-dialog>
  </div>
</template>

<script>
import TransferDialog from './TransferDialog'

export default {
  components: { TransferDialog },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    infoData () {
      return this.form
    },
  },
  data () {
    return {
      infoList: [
        { value: 'status', label: '审批状态：' },
        { value: 'names', label: '申请人：' },
        { value: 'appMan', label: '审批人：' },
        { value: 'time', label: '申请时间：' },
        { value: 'appTime', label: '审批时间：' },
        { value: 'through', label: '指导建议：' },
        { value: 'notThrough', label: '审批不通过理由：' },
      ],
      setUpList: [
        { value: 'bianhao', label: '编号：' },
        { value: 'xiangmuleixing', label: '项目名称：' },
        { value: 'leixing', label: '项目类型：' },
        { value: 'yewuleixing', label: '业务类型：' },
        { value: 'kehu', label: '相关客户：' },
        { value: 'zhidaoren', label: '项目预算（万元）：' },
        { value: 'biaoqian', label: '项目标签：', type: 'tag' },
        { value: 'guanlianchanping', label: '是否关联产品：' },
        { value: 'xiangguanchanping', label: '相关产品：', type: 'tag' },
        { value: 'chenjiebumen', label: '承接部门：' },
        { value: 'hezuobumen', label: '合作部门：' },
        { value: 'jituanwaibu', label: '集团外部合作伙伴：' },
        { value: 'faburen', label: '发布人：' },
        { value: 'fabushijian', label: '发布时间：' },
      ],
      setUpData: {
        bianhao: 'GM20190001',
        xiangmuleixing: '佛山市智慧城市顶层设计规划编制',
        leixing: '外部项目',
        yewuleixing: '咨询-规划',
        kehu: '佛山市经济和信息化局',
        yusuan: '30',
        jingli: '殷亚增',
        zhidaoren: '王五',
        biaoqian: ['互联网+政府服务', '顶层规划'],
        guanlianchanping: '是',
        xiangguanchanping: ['数据基因'],
        chenjiebumen: '佛山司马钱信息技术有限公司',
        hezuobumen: '国脉海洋信息发展有限公司',
        jituanwaibu: '南光文化创意产业有限公司',
        faburen: '殷亚增',
        fabushijian: '2019-02-22',
      },
      rows:{
        id: 1270253,
        name:'佛山市智慧城市顶层设计规划编制',
        budget:'立项申请',
        manay:'GM20190001',
        stage:'待审批',
        issue:'杨晓凤',
        issuename:'张三',
        ProjectBudget:'30',
      },
      dialogStatus:'',
      dialogVisible:false,
    }
  },
  methods:{
    sumbit () {
      this.$refs['form'].open(this.form)
    },
    listClose (val){
      // console.log(val)
      this.dialogVisible = val
    },
  },
}
</script>

<style lang="scss" scoped>
  .contianBox {
    .title {
      background-color: #f5f5f5;
      border-radius: 5px;
      .data {
        padding: 10px 15px;
      }
      .edit {
        float: right;
        right: 0;
        width: 30px;
        line-height: 40px;
        cursor: pointer;
      }
    }
    .topBot {
      margin: 20px 0 30px;
    }
    .item {
      height: 30px;
      margin-bottom: 10px;
    }
    .footer {
      margin: 20px 0 0 60px;
    }
  }
</style>