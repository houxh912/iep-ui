<template>
  <div>
    <iep-dialog :dialog-show="dialogShow" :title="`参与投资（当前剩余股权数：${form.remainingShares}）`" width="1000px" @close="loadPage">
      <div class="main">
        <div class="left">
          <el-form :model="form" size="small" ref="form" :rules="rules" label-width="140px">
            <iep-form-item label-name="投资组织" prop="orgId">
              <iep-select disabled v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择向哪个组织投资"></iep-select>
            </iep-form-item>
            <iep-form-item label-name="今日股权单价" prop="tradingPrice">
              <span>{{form.tradingPrice}}（贝）</span>
            </iep-form-item>
            <iep-form-item label-name="股份数量" prop="investmentNumber">
              <iep-input-number v-model="form.investmentNumber" :min="form.minimumBuy" :max="form.remainingShares" :precision="0"></iep-input-number>
            </iep-form-item>
            <iep-form-item label-name="投资金额" prop="totalAmount">
              <iep-input-number disabled v-model="form.totalAmount"></iep-input-number>
            </iep-form-item>
            <iep-form-item label-name="支付方式" prop="investmentMoneyType">
              <el-radio-group v-model="form.investmentMoneyType" disabled>
                <el-radio v-for="(item, idx) in dictsMap.investmentMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
              </el-radio-group>
            </iep-form-item>
            <div class="agree-wrapper">
              <el-checkbox v-model="checked">
              </el-checkbox>
              我已查看
              <el-link type="primary" @click="handleOpen('one')">激励股权认购须知</el-link>
              <iep-divider type="vertical"></iep-divider>
              <el-link type="primary" @click="handleOpen('')">投资风险告知说明</el-link>
            </div>
          </el-form>
          <div class="footer">
            <iep-button type="primary" @click="submitForm()" :disabled="!checked">提交</iep-button>
            <iep-button @click="loadPage">取消</iep-button>
          </div>
        </div>
        <div class="right">
          <el-scrollbar style="height:300px;" v-if="choose=='one'">
            <div style="padding-right:10px;">
              <p style="font-size:16px;text-align: center;color:#333;">股权激励认购说明书</p>
              <p>为了进一步完善公司治理结构，健全公司激励机制，增强公司管理团队和业务骨干对实现公司持续、健康发展的责任感、使命感，确保公司发展目标的实现，有限公司（“本公司”或“公司”）根据有关法律法规及公司章程的规定，特制定股权激励计划，并说明如下：</p>
              <p>一、标的公司介绍</p>
              <p>公司为一家依据中华人民共和国（“中国”）法律注册成立的有限公司，注册资本为人民币。</p>
              <p>二、激励对象</p>
              <p>国脉集团正式员工、非正式员工、外部投资者。</p>
              <p>三、激励形式</p>
              <p>本次激励计划通过采取虚拟股股权授予形式开展，激励对象通过出资即可享有公司根据业绩情况给予的一定比例的拟制分红权（分红权实现形式为由公司发放与虚拟股权收益金额相等的奖励）。且虚拟股没有表决权、转让权和继承权，只有拟制分红权。</p>
              <p>四、激励数量</p>
              <p>员工购买组织虚拟股数量最低和最高数量不设限制。</p>
              <p>五、股权生效</p>
              <p>国脉贝总账户收到国脉贝并发放投资协议确认通知书当天生效，并在国脉集团内网公司页面显示股东姓名。</p>
              <p>七、动态管理</p>
              <p>1.若公司出现：合并、分立、注销等情形或者其他不可抗力导致的公司不能正常经营，本激励计划即行终止。</p>
              <p>2.若激励对象出现：严重违反公司规章制度或涉嫌犯罪；因故意或者重大过失给公司造成重大损失；激励对象离职或被公司解雇；激励对象因重大疾病、身亡、工伤等原因丧失劳动能力，公司将按原始发行股价收回其所有虚拟股。</p>
              <p>八、保密</p>
              <p>确认的股权激励对象应对公司各项机密履行保密义务，包括但不限于如下的方面：技术、设计、客户名单、合同、价格、成本、备忘录、预测和估计、报表、商业计划、商业模式、投资金额、股权配置、公司决议等均不得向股东外的第三人披露。任何激励对象违反本协议保密条款，由公司回收其所持有的所有股权，因此造成的任何损失，由失职人员承担赔偿责任，其他股东保有追求其法律责任的权利。</p>
              <p>九.解释、修改和终止</p>
              <p>7.1.本计划的解释权属于集团董事（会）。</p>
              <p>7.2.公司董事（会）可以随时修改、中止或终止本计划，但准备进行的修改、中止或终止不能实质影响合格认购人员在该修改、中止或终止进行以前已得到的或预期得到的经济利益；且任何修改、中止或终止需提供书面材料。</p>
            </div>
          </el-scrollbar>
          <el-scrollbar style="height:300px;" v-else>
            <div style="padding-right:10px;">
              <p style="font-size:16px;text-align: center;color:#333;">风险告知书</p>
              <p>国脉集团员工：</p>
              <p>感谢您对我们本次股权激励的关注和信任，在您决定入股我们之前，我们请您务必仔细阅读本风险告知书。</p>
              <p>一、投资回报风险</p>
              <p>任何公司的运营都存在盈利或者亏损的可能，因此并不保障公司存续期间为您带来盈利的可能性。公司是否分红，分红比例由公司章程和公司业绩确定，因此请您务必理解投资并不一定带来收益的风险。</p>
              <p>二、法律政策的风险</p>
              <p>由于国家法律、政策的出台或者更改，为股权激励及虚拟股投资带来的重大政策风险，希望您能明白这些不可抗力带来的风险。</p>
              <p style="text-decoration:underline;">本人已经阅读以上所有内容，并愿意承担风险告知书所说明的全部风险。 </p>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </iep-dialog>
    <iep-equity-dialog ref="EquityDialog" @load-page="loadPage" :information="information"></iep-equity-dialog>
  </div>
</template>
<script>
import { initForm, dictsMap, formToDto, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      checked: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
      choose: 'one',
      information: initForm(),
    }
  },
  computed: {
  },
  methods: {
    handleOpen (val) {
      this.choose = val
    },
    loadPage () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      try {
        await this.mixinsValidate()
        try {
          const { data } = await this.formRequestFn(formToDto(this.form))
          if (data.data) {
            this.$message({
              message: `感谢您投资${this.form.orgName}公司。未来，请让我们一起继续携手相伴，披荆斩棘，共闯前路！`,
              type: 'success',
            })
            this.information = data.data
            this.$refs['EquityDialog'].dialogShow = true
            this.loadPage()
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: 'error',
          })
        }
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
  },
  watch: {
    // 'form.totalAmount': function (n) {
    //   this.form.investmentNumber = Math.round( n / this.form.tradingPrice *100)/100
    // },
    'form.investmentNumber': function (n) {
      this.form.totalAmount = this.form.tradingPrice * n
    },
  },
}
</script>
<style lang="scss" scoped>
.agree-wrapper {
  text-align: center;
}
.main {
  display: flex;
}
.left,
.right {
  width: 50%;
  flex-grow: 1;
}
.right {
  border: 1px solid #eee;
  padding: 10px;
}
.footer {
  text-align: center;
  margin-top: 20px;
  > button:first-child {
    margin-right: 10px;
  }
}
p {
  margin-bottom: 10px;
}
</style>
<style scoped>
</style>

