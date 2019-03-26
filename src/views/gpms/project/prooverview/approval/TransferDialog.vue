<template>
  <div class="dial">
    <el-dialog
      title="立项申请"
      :visible.sync="dialogVisibles"
      width="35%"
      :before-close="handleClose"
      class="opss"
    >
      <p class="tipes">"立项申请"审批规则：项目预算小于等于100万的项目由班长审批，项目预算大于100万的项目由项目执行与质量委员会审批。</p>
      <!-- 表单 -->
      <el-row>
        <el-col :span="7">
          <p class="RIGH">编号：</p>
          <p class="RIGH">项目名称：</p>
          <p class="RIGH">项目预算（万元）：</p>
        </el-col>
        <el-col :span="17">
          <p class="padl">{{rows.manay}}</p>
          <p class="padl">{{rows.name}}</p>
          <p class="padl">{{rows.ProjectBudget}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="4">
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="审批人：" prop="issuename">
              <template v-if="rows.ProjectBudget<=100">
                <el-select v-model="form.issuename" placeholder="请选择审批人">
                  <el-option v-for="(item,index) in smalls" :key="index" :label='item.user' :value="index"></el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select v-model="form.issuename" placeholder="请选择审批人">
                  <el-option v-for="(item,index) in big" :key="index" :label='item.user' :value="index"></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="lastC">
        <div class="toptip">
          <el-tooltip class="item" effect="dark" content="抄送后，抄送人会收到项目立项信息" placement="top">
            <i class="el-icon-picture"></i>
          </el-tooltip>

        </div>
        <div class="font">
          抄送人:
        </div>
        <div class="name" v-if="name.num !== 0">
          {{name.names}}
        </div>
        <div class="add" @click="addName">
          +
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="6" :offset="4">
            <el-button type="info" @click="Submission">提交</el-button>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button @click="handleClose">取消</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins:[mixins],
    name: 'index',
  data () {
    return {
      // 显示隐藏副本
      dialogVisibles:this.dialogVisible,
        name:{
            arr:[],
            names:'',
            num:0,
        },
      form: {
        issuename:'',
      },
      rules:{
        issuename:[
          { required: true, message: '请选择活动区域', trigger: 'change' },
        ],
      },
      big:[
        {user:'王玲'},
        {user:'郑鑫宁'},
        {user:'张慧'},
        {user:'王路燕'},
        {user:'袁慧君'},
        {user:'陈乐燕'},
        {user:'陈一萍'},
        {user:'俞雷'},
        {user:'张明智'},
      ],
      smalls:[
        {user:'杨冰之'},
        {user:'郑爱军'},
        {user:'李凯'},
        {user:'赵蕊'},
        {user:'郑鑫宁'},
        {user:'黄成祥'},
        {user:'张金星'},
        {user:'叶徐'},
        {user:'黄磊'},
        {user:'谢海艳'},
        {user:'阳和军'},
        {user:'王虎'},
        {user:'董颖'},
        {user:'蒋艳琼'},
        {user:'罗艳琴'},
        {user:'王路燕'},
        {user:'刘佳'},
        {user:'孙泽红'},
        {user:'张幸瑾'},
        {user:'欧阳美艳'},
        {user:'周勤'},
        {user:'王凯'},
        {user:'田景熙'},
      ],
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Object,
      default: () => {
          return {}
      },
    },
  },
  watch: {
    dialogVisible (val) {
      this.dialogVisibles = val
    },
  },
  created (){
  },
  methods:{
    handleClose (){
      this.$emit('listClose',this.dialogVisibles=false)
      // console.log(this.rows)
      this.$refs['form'].resetFields()
    },
      addName (){
          this.name.arr.push('林胜阳')
          this.name.num = 1
          this.name.names = this.name.arr.join('、')
      },
    Submission (){
      this.$refs['form'].validate((valid) => {
          if (valid) {
              //审批人 -> form.issuename  抄送人 -> name.arr
            this.$message.success('转交成功')
            this.$refs['form'].resetFields()
            this.$emit('listClose',this.dialogVisibles=false)
          } else {
            this.$message.error('请选择审批人')
          }
        })
    },
  },
  computed:{},
}
</script>

<style lang="scss">
  .lastC{
    width: 68%;
    margin: 0 auto 20px;
    overflow: hidden;
    &>div{
      float: left;
    }
    .font{
      line-height: 40px;
      margin: 0 25px 0 1px;
    }
    .toptip{
      margin-left: 5px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding-top: 10px;
    }
    .name{
      border: 1px solid #ccc;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      margin-right:5px ;
      padding: 0 8px;
    }
    .add{
      line-height: 38px;
      width: 40px;
      height: 38px;
      border: 1px solid #ccc;
      background: #ccc;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      text-align: center;
      font-size: 30px;
      cursor: pointer;
    }
  }
.dial .el-dialog .el-dialog__header {
  border-bottom: 1px solid gray;
  font-weight: bold;
  padding-top: 17px;
}
.tipes{
  font-size:12px;
  padding:10px;
  margin:0 20px 15px 20px;
  background-color: #EBF5FF;
  border-radius:4px;
  line-height: 20px;
}
.RIGH{
  text-align: right;
}
.padl{
  padding-left:9px;
}
.dial .el-dialog__body{
  padding: 0;
}
</style>