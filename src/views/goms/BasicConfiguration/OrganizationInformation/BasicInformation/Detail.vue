<template>
  <div>
    <basic-container>
      <iep-button style="float:right" @click="handleEdit">编辑</iep-button>
      <div class="org-detail-wrapper">
        <div class="content">
          <div class="top">
            <div class="img-wrapper">
              <iep-img :src="form.logo" slot="cover"></iep-img>
            </div>
            <div class="info-wrapper">
              <div class="title">{{form.name}}</div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">创建人：</label>
                  <span class="value">{{form.creatorName}}</span>
                </div>
                <div class="form-item-wrapper">
                  <label for="">成立时间：</label>
                  <span class="value">{{form.establishTime}}</span>
                </div>
              </div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">联系方式：</label>
                  <span class="value">{{form.contactMethod}}</span>
                </div>
              </div>
              <div class="col">
                <div class="form-item-wrapper">
                  <label for="">联系地址：</label>
                  <span class="value">{{form.address}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- <iep-divider dashed /> -->
          <div class="bottom">
            <div class="title">
              组织标签
            </div>
            <div class="tag-wrapper">
              <div class="tag-item">
                我能：<iep-tag-detail class="tag" :value="form.abilityTag"></iep-tag-detail>
              </div>
              <div class="tag-item">
                我要：<iep-tag-detail class="tag" :value="form.projectTag"></iep-tag-detail>
              </div>
              <div>
                我想：<iep-tag-detail class="tag" :value="form.learningTag"></iep-tag-detail>
              </div>
            </div>
          </div>
          <!-- <iep-divider dashed /> -->
          <div class="bottom">
            <div class="title">
              组织简介
            </div>
            <pre class="con-wrapper">{{form.intro}}</pre>
          </div>
          <!-- <iep-divider dashed /> -->
          <div class="bottom">
            <div class="title">
              组织架构
            </div>
            <div class="con-wrapper">
              <iep-html v-model="form.structure"></iep-html>
            </div>
          </div>
          <!--  <iep-divider dashed /> -->
          <div class="bottom">
            <div class="title">
              核心优势
            </div>
            <div class="con-wrapper">
              <pre>{{form.coreAdvantage}}</pre>
            </div>
          </div>
        </div>
        <!-- <iep-divider /> -->
        <div class="content"></div>
        <div class="content"></div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getOrgBySelf, putOrg } from '@/api/goms/org'
import { initForm } from './options'
export default {
  data () {
    return {
      form: initForm(),
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleEdit () {
      this.$emit('onEdit', {
        formRequestFn: putOrg,
        row: this.form,
      })
    },
    loadPage () {
      getOrgBySelf(this.orgId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.tag-wrapper,
.con-wrapper {
  margin-left: 30px;
}
.org-detail-wrapper {
  .content {
    margin-bottom: 20px;
    .top {
      display: flex;
      align-items: center;
      .img-wrapper {
        margin-right: 15px;
        width: 220px;
        height: 150px;
        border: 1px solid #eee;
        padding: 5px;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .info-wrapper {
        padding: 5px;
        .title {
          margin-bottom: 10px;
          font-size: 18px;
        }
        .col {
          display: flex;
          font-size: 14px;
          .form-item-wrapper {
            padding: 5px 0;
            margin-right: 10px;
          }
        }
      }
    }
    .bottom {
      margin-top: 35px;
      .title {
        font-size: 16px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
<style scoped>
.tag >>> span {
  position: relative;
  padding: 0 10px;
}
.tag >>> .ant-tag {
  border: 0;
  margin: 0;
  margin-bottom: 5px;
  background: none;
}
.tag >>> span:before {
  position: absolute;
  content: "";
  top: 10px;
  right: -7px;
  width: 15px;
  height: 1px;
  background-color: #aaa;
  transform: rotate(125deg);
  -o-transform: rotate(125deg);
  -moz-transform: rotate(125deg);
  -webkit-transform: rotate(125deg);
}
.tag >>> span:last-child::before {
  background-color: #fff;
}
</style>
