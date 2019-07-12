<template>
  <div>
    <basic-container>
      <page-header title="定制管理" :backOption="backOption"></page-header>
      <operation-container>
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">
            <div class="title1">定制信息</div>
            <div class="con-item">
              <span class="title2">提交人：</span>
              <iep-div-detail class="content" :value="form.creatorName"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">提交时间：</span>
              <iep-div-detail class="content" :value="form.createTime"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">定制产品名称：</span>
              <iep-div-detail class="content" :value="form.customName"></iep-div-detail>
            </div>
            <div class="con-item">
              <span class="title2">产品说明：</span>
              <iep-div-detail class="content" :value="form.synopsis"></iep-div-detail>
            </div>
          </div>
        </div>
      </div>
      <custom-form></custom-form>
      <FooterToolBar>
        <iep-button type="primary">通过</iep-button>
        <iep-button>不通过</iep-button>
      </FooterToolBar>
    </basic-container>
  </div>
</template>
<script>
function initForm () {
  return {
    creatorName: '',
    createTime: '',
    customName: '',
    synopsis: '',
  }
}
import mixins from '@/mixins/mixins'
import CustomForm from '../Components/CustomForm'
import { getListById } from '@/api/app/cpms/custom_product'

export default {
  mixins: [mixins],
  components: {
    CustomForm,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      await getListById(this.id).then((data) => {
        // const { creatorName, createTime, customName,synopsis } = data.data.data
        this.form = this.$mergeByFirst(initForm(), data.data.data)
      })
    },
  },
}
</script>

<style scoped lang='scss'>
.container {
  padding: 0 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  .con-item {
    margin-bottom: 15px;
    .title {
      font-size: 16px;
      color: #333;
    }
    .title1 {
      margin-bottom: 15px;
    }
    .title2 {
      display: inline-block;
      margin-right: 8px;
      width: 100px;
      text-align: right;
      font-size: 14px;
      color: #999;
    }
    .content {
      display: inline-block;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 14px;
      color: #999;
      vertical-align: -4px;
    }
  }
}
</style>
