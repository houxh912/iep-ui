<template>
  <el-card class="account-wrapper" shadow="never" :body-style="bodyStyle">
    <div class="user-simple-box">
      <iep-img class="user-avatar" :src="userInfo.avatar"></iep-img>
      <div class="user-code">{{form.staffId}}</div>
      <div>
        <el-progress :percentage="form.integrity" color="#68C769"></el-progress>
      </div>
    </div>
    <div class="user-detail-box">
      <div class="user-welcome-box">
        <span class="user-text">{{timeFix}}，{{form.name}}</span>
        <iep-identity-mark v-for="item in form.identityMarks" :key="item.value" :icon="item.icon" :title="item.label"></iep-identity-mark>
        <span class="welcome-text">{{welcome}}</span>
      </div>
      <div class="user-position-box">
        <iep-div-detail class="position-item title-label" :value="form.title"></iep-div-detail>
        <iep-div-detail class="position-item job-label" :value="form.job"></iep-div-detail>
      </div>
      <div class="user-operation-box">
        <span class="inline task">
          <i class="icon-qian icon padding"></i>
          <span>完成每日工作，领国脉贝
            <i class="el-icon-d-arrow-right"></i>
          </span>
        </span>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getIndex } from '@/api/wel/index'
import { timeFix, welcome } from '@/util/text'
import { mapGetters } from 'vuex'
const initIndexForm = () => {
  return {
    name: '', //名字
    staffId: '', //工号
    identityMarks: [],
    job: '', //职位
    title: '',//职称
    tagNum: 10,//标签
    materialNum: 10,//材料
    credit: 10,//信用
    integrity: 0, // 资料完善度
  }
}
export default {
  data () {
    return {
      timeFix: timeFix(),
      welcome: welcome(),
      form: initIndexForm(),
      bodyStyle: {
        display: 'flex',
        padding: '0',
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.loading = true
      getIndex().then(({ data }) => {
        this.form = this.$mergeByFirst(initIndexForm(), data.data)
        this.loading = false
        this.$emit('on-finish')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.account-wrapper {
  margin: 20px;
  margin-bottom: 0;
}
.user-simple-box {
  border-right: 2px dotted #eee;
  padding: 20px;
  flex: 0 0 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-detail-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  .user-welcome-box {
    .user-title {
      font-size: 16px;
    }
    .welcome-text {
      margin-left: 10px;
      font-size: 16px;
      color: #cb3737;
    }
  }
  .user-operation-box {
    .inline {
      display: inline-block;
      .padding {
        padding-right: 5px;
        font-size: 18px;
      }
    }
    .task {
      cursor: pointer;
      background: #f9eae7;
      padding: 3px 10px;
      font-size: 14px;
      border-radius: 3px;
      color: #666;
      > .icon {
        font-size: 20px;
        color: #ffbc01;
      }
      &:focus,
      &:hover {
        opacity: 0.6;
        outline: none;
      }
    }
  }
}
.user-avatar {
  width: 90px;
  height: 90px;
  > img {
    border-radius: 50%;
  }
}
.position-item {
  display: inline;
  &.title-label {
    color: #7a7a7a;
  }
  &.job-label {
    margin-left: 10px;
    padding: 3px 12px;
    border-radius: 40px;
    border: 1px solid #eee;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    background-color: #f5f7fa;
    color: #333;
  }
}
</style>
