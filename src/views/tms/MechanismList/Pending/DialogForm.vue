<template>
  <iep-dialog :dialog-show="dialogShow" title="认证申请" width="800px" @close="loadPage">
    <div class="container">
      <div class="con-item">
        <div class="box">
          <div class="title">机构名称：</div>
          <iep-div-detail class="content" :value="form.orgName"></iep-div-detail>
        </div>
        <div class="box">
          <div class="title">机构简称：</div>
          <iep-div-detail :value="form.orgAbrName" class="content"></iep-div-detail>
        </div>
      </div>
      <div class="con-item">
        <div class="box">
          <div class="title">社会信用代码：</div>
          <iep-div-detail class="content" :value="form.creditCode"></iep-div-detail>
        </div>
        <div class="box">
          <div class="title">机构分类：</div>
          <iep-div-detail :value="form.type===0?'暂无':dictsMap.type[form.type]" class="content"></iep-div-detail>
        </div>
      </div>
      <div class="con-item">
        <div class="box">
          <div class="title">机构层级：</div>
          <iep-div-detail class="content" :value="form.level"></iep-div-detail>
        </div>
        <div class="box">
          <div class="title">行业：</div>
          <iep-div-detail :value="dictGroup['POLICY_INDUSTRY'][form.line]?dictGroup['POLICY_INDUSTRY'][form.line].label:'暂无'" class="content"></iep-div-detail>
        </div>
      </div>
      <div class="con-item">
        <div class="box">
          <div class="title">机构官网：</div>
          <iep-div-detail class="content" :value="form.orgUrl"></iep-div-detail>
        </div>
        <div class="box">
          <div class="title">联系人：</div>
          <iep-div-detail :value="form.link" class="content"></iep-div-detail>
        </div>
      </div>
      <div class="con-item">
        <div class="box">
          <div class="title">联系电话：</div>
          <iep-div-detail class="content" :value="form.phone"></iep-div-detail>
        </div>
        <div class="box">
          <div class="title">传真：</div>
          <iep-div-detail :value="form.fax" class="content"></iep-div-detail>
        </div>
      </div>
      <div class="con-item">
        <div class="box">
          <div class="title">邮箱：</div>
          <iep-div-detail class="content" :value="form.email"></iep-div-detail>
        </div>
        <div class="box">
          <div class="title">机构住址：</div>
          <iep-div-detail :value="form.address" class="content"></iep-div-detail>
        </div>
      </div>
      <div class="con-item">
        <div class="title">机构简介：</div>
        <iep-div-detail class="content" :value="form.introduction"></iep-div-detail>
      </div>
      <div class="con-item">
        <div class="title">营业执照：</div>
        <iep-img :src="form.license" class="avatar"></iep-img>
      </div>
      <div class="con-item">
        <div class="title">LOGO：</div>
        <iep-img :src="form.logo" class="avatar"></iep-img>
      </div>
    </div>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="handlePass">认证通过</iep-button>
        <iep-button @click="handleReject">驳回</iep-button>
        <iep-button @click="loadPage">返回</iep-button>
      </operation-wrapper>
    </template>

  </iep-dialog>
</template>
<script>
import { initForm, rules, dictsMap } from '../options'
import { applyPass, applyReject } from '@/api/crms/organization_list'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      dialogShow: false,
      form: initForm(),
      rules,
      dictsMap,
    }
  },
  computed: {
    ...mapGetters([
      'dictGroup',
    ]),
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.$emit('load-page')
      this.dialogShow = false
    },
    handlePass () {
      applyPass([this.form.orgId]).then(res => {
        if (res.data) {
          this.$message({
            type: 'success',
            message: '认证成功!',
          })
        } else {
          this.$message({
            type: 'info',
            message: `认证失败，${res.msg}`,
          })
        }
        this.loadPage()
      })
    },
    handleReject () {
      applyReject([this.form.orgId]).then(res => {
        if (res.data) {
          this.$message({
            type: 'success',
            message: '驳回成功!',
          })
        } else {
          this.$message({
            type: 'info',
            message: `驳回失败，${res.msg}`,
          })
        }
        this.loadPage()
      })
    },
  },
}
</script>
<style scoped lang='scss'>
.container {
  padding: 0 10px;
  .con-item {
    display: flex;
    margin-bottom: 18px;
    .box {
      width: 50%;
      & > div {
        display: inline-block;
      }
    }
    .title {
      width: 120px;
      margin-bottom: 10px;
      font-size: 15px;
      color: #333;
    }
    .content {
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 14px;
      color: #999;
      vertical-align: -4px;
    }
  }
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>