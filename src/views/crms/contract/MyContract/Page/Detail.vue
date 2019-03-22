<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>联系人详情</span>
      </div>
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-row>
          <el-col :span=12>
            <el-form-item label="实际金额：">
              <el-input v-model="formData.shijijine" placeholder="实际金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="回款率：">
              <el-input v-model="formData.huikuanlv" placeholder="回款率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="合同收款">
            <el-table :data="formData.tableData" border>
              <el-table-column prop="daozhangshijian" label="到账时间">
              </el-table-column>
              <el-table-column prop="daozhangjine" label="到账金额">
              </el-table-column>
              <el-table-column prop="leijidaozhang" label="累计到账">
              </el-table-column>
              <el-table-column prop="daozhangbili" label="到账比例">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="集团项目管理费" label-width="120px">
              <el-input v-model="formData.guanlifei"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="费率">
              <el-input v-model="formData.feilv"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="开票率">
              <el-input v-model="formData.kaipiaolv"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="费率">
              <el-input v-model="formData.feilv2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span=12>
            <el-form-item label="税费">
              <el-input v-model="formData.shuifei"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="费率">
              <el-input v-model="formData.feilv3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="项目主要支付">
            <el-table :data="formData.tableData" border>
              <el-table-column prop="daozhangshijian" label="项目外包费用">
              </el-table-column>
              <el-table-column prop="daozhangjine" label="项目评审费用（专家费等）">
              </el-table-column>
              <el-table-column prop="leijidaozhang" label="项目服务费用（中表费用、佣金等）">
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-row>
        <el-form-item>
          <iep-button type="danger">查看项目具体明细</iep-button>
        </el-form-item>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar'
export default {
  components: { FooterToolBar },
  data () {
    return {
      formData: {
        biaoqian: ['标签1号'],
        shijijine: '',
        huikuanlv: '',
        tableData: '',
        guanlifei: '',
        feilv: '',
        kaipiaolv: '',
        feilv2: '',
        shuifei: '',
        feilv3: '',
        list: [
          { name: '材料1', url: 'asd3asf3frfcv7g.xml' },
          { name: '材料2', url: 'asd3asf3frfcv7g.xml' },
        ],
      },
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .form-half {
    width: 50%;
    display: inline-block;
  }
  .edit-card {
    .title {
      font-weight: 600;
    }
  }
}
</style>
