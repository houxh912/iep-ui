<template>
  <basic-container>
    <page-header :title="form.name" :backOption="backOption"></page-header>
    <div class="detail-container">
      <div class="item-title">
        <ul>
          <li><span>接收人：</span><span>{{form.receiverName}}</span></li>
          <li><span>时间：</span><span>{{form.time}}</span></li>
        </ul>
        <el-button-group>
          <el-button icon="iconfont icon-biaoqian" size="mini"></el-button>
          <el-button icon="iconfont icon-shanchu" size="mini"></el-button>
        </el-button-group>
      </div>
      <div class="item-con">
        <div class="paragraph">
          <msg-link :link="form" :ims-path-type="imsPathType"></msg-link>
        </div>
      </div>
    </div>
  </basic-container>
</template>
<script>
import { getSystemMessageById } from '@/api/ims/system_message'
import keyBy from 'lodash/keyBy'
import { initForm } from './options'
import MsgLink from './MsgLink'
import { mapState } from 'vuex'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { MsgLink },
  data () {
    return {
      id: this.$route.params.id,
      backOption: {
        isBack: true,
      },
      pageLoading: true,
      form: initForm(),
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),

    imsPathType () {
      const imsPathType = this.dictGroup['ims_path_type']
      return keyBy(imsPathType, 'value')[this.form.pathType]
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
    loadPage () {
      this.pageLoading = true
      getSystemMessageById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-container {
  ul,
  li,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .item-title {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #fafafa;
    color: #666;
    li {
      margin-bottom: 10px;
    }
    .el-button-group {
      .el-button {
        display: flex;
        align-items: flex-end;
      }
    }
  }
  .item-con {
    padding: 20px;
    border-bottom: 1px solid #d7d7d7;
    color: #666;
    .paragraph {
      margin-bottom: 20px;
      text-indent: 2em;
      line-height: 24px;
      .sub-title {
        display: block;
        text-indent: 2em;
      }
      &:nth-child(1) {
        margin-top: 10px;
      }
    }
  }
  .comment {
    .con {
      display: flex;
      justify-content: space-between;
      .img {
        display: flex;
        flex: 0 0 100px;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          border-radius: 50%;
          padding: 2px;
          width: 40px;
          height: 40px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }
      }
      .name {
        color: #2558a9;
        cursor: pointer;
        &:hover {
          color: #4689f3;
        }
      }
      .text {
        flex: 1;
        .text-bottom {
          display: flex;
          justify-content: space-between;
          p {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
